import { createFileRoute } from "@tanstack/react-router";
import { InferenceClient } from "@huggingface/inference";

type RedesignBody = {
  image: string;
  style: string;
  roomType: string;
  budget: string;
  notes?: string;
  stream?: boolean;
};

function buildPrompt(b: RedesignBody): string {
  const notesPart = b.notes ? ` Redesign preferences: ${b.notes}.` : "";
  return `Redesign this uploaded ${b.roomType.toLowerCase()} room in a photorealistic ${b.style.toLowerCase()} interior style. Preserve the room's architectural structure, existing walls, visible windows, doors, openings, ceiling height, flooring boundaries, and camera perspective. Redesign and improve the furniture, lighting, wall colors, textiles, materials, and decor to match the ${b.style} aesthetic while respecting an approximate budget of ${b.budget}.${notesPart} Produce a high-quality, realistic interior-design visualization with no text, no watermark, and no floor plan.`;
}

export const Route = createFileRoute("/api/redesign")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env["HF_TOKEN"];
        if (!token) {
          return new Response("Reimagine AI is not configured: missing HF_TOKEN.", { status: 500 });
        }

        let body: RedesignBody;
        try {
          body = (await request.json()) as RedesignBody;
        } catch {
          return new Response("The redesign request was invalid.", { status: 400 });
        }

        const imageMatch = body?.image?.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
        if (!imageMatch) {
          return new Response("Please upload a valid JPG, PNG, or WebP room photo.", { status: 400 });
        }
        if (!body.roomType || !body.style || !body.budget) {
          return new Response("Room type, design style and budget are required.", { status: 400 });
        }

        // Convert the data URL to a Blob via fetch
        const inputResponse = await fetch(body.image);
        if (!inputResponse.ok) {
          return new Response("Could not read uploaded room image.", { status: 500 });
        }
        const inputImage = await inputResponse.blob();

        try {
          const client = new InferenceClient(token);
          const result = await client.imageToImage({
            model: "black-forest-labs/FLUX.1-Kontext-dev",
            provider: "replicate",
            inputs: inputImage,
            parameters: {
              prompt: buildPrompt(body),
            },
          });

          if (!result || !(result instanceof Blob)) {
            return new Response("AI image generation is temporarily unavailable. Please try again.", { status: 502 });
          }

          const arrayBuffer = await result.arrayBuffer();
          const resultBase64 = Buffer.from(arrayBuffer).toString("base64");
          const outMime = result.type || "image/png";
          const generatedImageDataUrl = `data:${outMime};base64,${resultBase64}`;

          const summary = `A photorealistic ${body.style.toLowerCase()} redesign created for your ${body.roomType.toLowerCase()} respecting your ${body.budget} budget.`;

          return Response.json({
            image: generatedImageDataUrl,
            summary,
          });
        } catch (error: unknown) {
          const errorRecord = error !== null && typeof error === "object"
            ? (error as Record<string, unknown>)
            : {};
          const responseRecord = errorRecord["response"] !== null && typeof errorRecord["response"] === "object"
            ? (errorRecord["response"] as Record<string, unknown>)
            : {};
          const status = typeof errorRecord["status"] === "number"
            ? errorRecord["status"]
            : typeof responseRecord["status"] === "number"
              ? responseRecord["status"]
              : undefined;

          console.error("Hugging Face image generation failed", {
            status,
            message: typeof errorRecord["message"] === "string" ? errorRecord["message"] : undefined,
            name: typeof errorRecord["name"] === "string" ? errorRecord["name"] : undefined,
            type: typeof errorRecord["type"] === "string" ? errorRecord["type"] : undefined,
            model: "black-forest-labs/FLUX.1-Kontext-dev",
            provider: typeof errorRecord["provider"] === "string" ? errorRecord["provider"] : undefined,
          });

          return new Response("AI image generation is temporarily unavailable. Please try again.", { status: 502 });
        }
      },
    },
  },
});
