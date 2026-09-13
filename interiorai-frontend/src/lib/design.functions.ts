import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PlanInput = z.object({
  style: z.string().min(1),
  roomType: z.string().min(1),
  budget: z.string().min(1),
  notes: z.string().optional(),
});

export type DesignPlan = {
  summary: string;
  palette: { name: string; hex: string }[];
  materials: string[];
  items: { name: string; description: string; price: number; category: string }[];
  totalCost: number;
  designScore: number;
  vastuNote: string;
};

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "palette", "materials", "items", "totalCost", "designScore", "vastuNote"],
  properties: {
    summary: { type: "string" },
    palette: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "hex"],
        properties: { name: { type: "string" }, hex: { type: "string" } },
      },
    },
    materials: { type: "array", items: { type: "string" } },
    items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "description", "price", "category"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          category: { type: "string" },
        },
      },
    },
    totalCost: { type: "number" },
    designScore: { type: "number" },
    vastuNote: { type: "string" },
  },
} as const;

export const generateDesignPlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PlanInput.parse(input))
  .handler(async ({ data }): Promise<DesignPlan> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.8-flash",
        messages: [
          {
            role: "system",
            content:
              "You are an Indian interior designer. Produce practical, realistic design plans. All prices are in Indian Rupees (INR) as plain numbers. Keep the shopping list total within the stated budget. Return 6 to 10 shopping items, 4 to 5 palette colours with valid hex codes, a design score between 80 and 99, and one short Vastu-aligned placement tip.",
          },
          {
            role: "user",
            content: `Room type: ${data.roomType}\nStyle: ${data.style}\nBudget: ${data.budget}\nClient notes: ${data.notes || "none"}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: "design_plan", strict: true, schema },
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Too many requests right now — try again in a moment.");
      if (res.status === 402) throw new Error("AI credits are exhausted for this workspace.");
      throw new Error(detail || `Design plan failed (${res.status})`);
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = json.choices?.[0]?.message?.content;
    if (!content) throw new Error("The design service returned an empty plan");
    return JSON.parse(content) as DesignPlan;
  });
