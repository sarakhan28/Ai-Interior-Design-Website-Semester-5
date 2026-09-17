import { createParser } from "eventsource-parser";
import { flushSync } from "react-dom";

type ImageEventPayload =
  | { type: "image_generation.partial_image"; b64_json: string; partial_image_index: number }
  | { type: "image_generation.completed"; b64_json: string }
  | { type: "error"; error: { message: string } };

/**
 * POSTs a JSON body to a streaming image endpoint and calls onFrame for every
 * frame the model renders (blurred previews first, then the final image).
 */
export async function streamImage(
  endpoint: string,
  payload: Record<string, unknown>,
  onFrame: (dataUrl: string, isFinal: boolean) => void,
): Promise<void> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok || !res.body) {
    throw new Error((await res.text().catch(() => "")) || `Request failed (${res.status})`);
  }

  let sawAnyEvent = false;
  let sawCompleted = false;
  let streamError: string | undefined;

  const parser = createParser({
    onEvent(event) {
      let data: ImageEventPayload | undefined;
      try {
        data = JSON.parse(event.data) as ImageEventPayload;
      } catch {
        /* ignore malformed frame */
      }
      if (event.event === "error" || data?.type === "error") {
        sawAnyEvent = true;
        streamError =
          (data as { error?: { message?: string } })?.error?.message ?? "Image generation failed";
        return;
      }
      const isPartial =
        event.event === "image_generation.partial_image" ||
        event.event === "image_edit.partial_image";
      const isFinal =
        event.event === "image_generation.completed" || event.event === "image_edit.completed";
      if ((!isPartial && !isFinal) || !data || !("b64_json" in data)) return;
      sawAnyEvent = true;
      flushSync(() => onFrame(`data:image/png;base64,${data.b64_json}`, isFinal));
      if (isFinal) sawCompleted = true;
    },
  });

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      parser.feed(value);
    }
  } finally {
    reader.cancel().catch(() => {});
  }

  if (streamError) throw new Error(streamError);

  if (!sawAnyEvent) {
    const replay = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, stream: false }),
    });
    if (!replay.ok) {
      throw new Error((await replay.text().catch(() => "")) || `Request failed (${replay.status})`);
    }
    const json = (await replay.json()) as { data?: { b64_json?: string }[] };
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) throw new Error("The design service returned no image");
    onFrame(`data:image/png;base64,${b64}`, true);
    return;
  }

  if (!sawCompleted) throw new Error("The design stopped before it finished rendering");
}
