import { createFileRoute } from "@tanstack/react-router";

type RedesignBody = {
  image: string; // data URL of the uploaded room photo
  style: string;
  roomType: string;
  budget: string;
  notes?: string;
  stream?: boolean;
};

function buildPrompt(b: RedesignBody) {
  return [
    `You are an expert interior designer and architectural visualiser.`,
    `Redesign the ${b.roomType.toLowerCase()} in the supplied photograph in a ${b.style} style.`,
    `Keep the exact same camera angle, perspective, room geometry, window and door positions, and natural lighting direction as the original photo.`,
    `Replace furniture, materials, textiles, wall finishes, flooring, lighting fixtures and decor so the room looks professionally styled and photorealistic.`,
    `Furnishings should be realistically achievable within a budget of ${b.budget}.`,
    b.notes ? `Additional client requirements: ${b.notes}.` : "",
    `Output a single high-resolution photorealistic interior photograph. No text, no watermarks, no floor plans, no collages.`,
  ]
    .filter(Boolean)
    .join(" ");
}

export const Route = createFileRoute("/api/redesign")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as RedesignBody;
        if (!body?.image?.startsWith("data:image/")) {
          return new Response("A room photo is required", { status: 400 });
        }

        const streaming = body.stream !== false;
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-3-pro-image",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: buildPrompt(body) },
                  { type: "image_url", image_url: { url: body.image } },
                ],
              },
            ],
            modalities: ["image", "text"],
            ...(streaming ? { stream: true } : {}),
          }),
        });

        if (!upstream.ok || !upstream.body) {
          return new Response(await upstream.text(), { status: upstream.status });
        }
        if (!streaming) {
          return new Response(upstream.body, { headers: { "Content-Type": "application/json" } });
        }
        return new Response(upstream.body, {
          headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        });
      },
    },
  },
});
