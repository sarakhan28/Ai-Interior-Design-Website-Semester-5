import { createFileRoute } from "@tanstack/react-router";

type RedesignBody = {
  image: string;
  style: string;
  roomType: string;
  budget: string;
  notes?: string;
  stream?: boolean;
};

function buildPrompt(b: RedesignBody) {
  return [
    `You are Reimagine AI, an expert interior designer and architectural visualiser.`,
    `Redesign the supplied ${b.roomType.toLowerCase()} photograph in a ${b.style} style.`,
    `Preserve the room's basic architectural structure, camera angle, perspective, visible windows, doors, openings, ceiling, floor boundaries and other fixed architectural elements.`,
    `Redesign only the furniture, decor, colors, lighting, textiles, materials and styling so the result is a believable, photorealistic version of the supplied room, not an unrelated room.`,
    `Respect the user's budget conceptually: ${b.budget}. Do not claim exact measurements or infer room dimensions from the photograph.`,
    b.notes ? `Redesign preferences: ${b.notes}.` : "",
    `Return one high-quality interior-design visualization with no text, no labels, no watermark, no floor plan and no collage.`,
  ]
    .filter(Boolean)
    .join(" ");
}

async function fetchGeminiImage(key: string, body: Record<string, unknown>) {
  let response: Response | undefined;
  for (let attempt = 0; attempt <= 2; attempt += 1) {
    if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) return response;
    const detail = await response.clone().text().catch(() => "");
    if (response.status !== 503 && !detail.includes("UNAVAILABLE")) return response;
  }
  return response!;
}

export const Route = createFileRoute("/api/redesign")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["GEMINI_API_KEY"];
        if (!key) return new Response("Reimagine AI is not configured: missing GEMINI_API_KEY.", { status: 500 });

        let body: RedesignBody;
        try {
          body = (await request.json()) as RedesignBody;
        } catch {
          return new Response("The redesign request was invalid.", { status: 400 });
        }

        const imageMatch = body?.image?.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
        if (!imageMatch) return new Response("Please upload a valid JPG, PNG, or WebP room photo.", { status: 400 });
        if (!body.roomType || !body.style || !body.budget) return new Response("Room type, design style and budget are required.", { status: 400 });

        let upstream: Response;
        try {
          upstream = await fetchGeminiImage(key, {
            systemInstruction: {
              parts: [{ text: "Create a realistic image-to-image interior redesign. The uploaded room image is the visual reference and must remain recognizable. Do not invent dimensions." }],
            },
            contents: [
              {
                role: "user",
                parts: [
                  { text: buildPrompt(body) },
                  { inlineData: { mimeType: imageMatch[1], data: imageMatch[2] } },
                ],
              },
            ],
            generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
          });
        } catch {
          return new Response("Gemini could not be reached. Please try again in a moment.", { status: 502 });
        }

        if (!upstream.ok) {
          const detail = await upstream.text().catch(() => "");
          if (upstream.status === 403) return new Response("Gemini rejected the API key. Check GEMINI_API_KEY configuration.", { status: 502 });
          if (upstream.status === 429 || upstream.status === 503) return new Response("Gemini is temporarily busy. Please try again in a moment.", { status: 503 });
          return new Response(detail && !detail.trim().startsWith("{") ? detail : "Gemini could not generate this redesign.", { status: 502 });
        }

        const json = (await upstream.json()) as {
          candidates?: { content?: { parts?: { text?: string; inlineData?: { mimeType?: string; data?: string } }[] } }[];
        };
        const parts = json.candidates?.[0]?.content?.parts ?? [];
        const imagePart = parts.find((part) => part.inlineData?.data);
        if (!imagePart?.inlineData?.data) {
          return new Response("Gemini returned no redesigned image. Please try again.", { status: 502 });
        }

        return Response.json({
          image: `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}`,
          summary: parts.find((part) => part.text)?.text || "A new direction has been created from the visible room layout and your preferences.",
        });
      },
    },
  },
});
