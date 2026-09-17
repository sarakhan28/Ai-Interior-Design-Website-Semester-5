import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GEMINI_TEXT_MODEL = "gemini-3.8-flash";
const GEMINI_TEXT_FALLBACK_MODEL = "gemini-3.7-flash";

async function fetchGeminiContent({
  key,
  body,
  model = GEMINI_TEXT_MODEL,
  fallbackModel,
}: {
  key: string;
  body: Record<string, unknown>;
  model?: string;
  fallbackModel?: string;
}): Promise<Response> {
  const models = fallbackModel ? [model, fallbackModel] : [model];
  let lastResponse: Response | undefined;

  for (const [modelIndex, currentModel] of models.entries()) {
    const maxAttempt = modelIndex === 0 ? 2 : 0;
    for (let attempt = 0; attempt <= maxAttempt; attempt += 1) {
      if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${encodeURIComponent(key)}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
      );
      lastResponse = response;
      const detail = response.ok ? "" : await response.clone().text().catch(() => "");
      const temporary = response.status === 503 || detail.includes("UNAVAILABLE");
      if (!temporary) return response;
    }
  }

  return lastResponse!;
}

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

const FurnitureInput = z.object({
  image: z.string().regex(/^data:image\/(jpeg|jpg|png);base64,/, "A JPG or PNG room photo is required"),
  style: z.string().min(1),
  roomType: z.string().min(1),
  budget: z.string().min(1),
  notes: z.string().optional(),
});

export type FurnitureRecommendation = {
  summary: string;
  recommendations: {
    name: string;
    category: string;
    quantity: number;
    estimatedPrice: number;
    reason: string;
    spaceSavingAlternative: string;
  }[];
  placementSuggestions: string[];
  estimatedTotal: number;
};

const BudgetInput = z.object({
  image: z.string().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "A JPG, PNG, or WebP room photo is required"),
  roomType: z.string().min(1),
  style: z.string().min(1),
  budget: z.string().min(1),
  requirements: z.string().optional(),
  spaceConcerns: z.string().optional(),
});

export type BudgetPlan = {
  summary: string;
  budgetOverview: {
    totalBudget: number;
    furniture: number;
    storage: number;
    lighting: number;
    decor: number;
    softFurnishings: number;
    other: number;
    estimatedTotal: number;
    remainingBudget: number;
  };
  furnitureRecommendations: {
    name: string;
    category: string;
    quantity: number;
    estimatedPrice: number;
    reason: string;
    spaceSavingAlternative: string;
  }[];
  spaceOptimization: string[];
  layoutPlan: string[];
  moneySavingSuggestions: string[];
  priorityList: { essential: string[]; recommended: string[]; optional: string[] };
  finalNote: string;
};

const VastuInput = z.object({
  image: z.string().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "A JPG, PNG, or WebP room photo is required").optional(),
  roomType: z.string().min(1),
  roomOrientation: z.string().min(1),
  entranceDirection: z.string().min(1),
  windowDirection: z.string().min(1),
  currentFurniture: z.string().optional(),
  concerns: z.string().optional(),
});

export type VastuGuidance = {
  summary: string;
  directionalGuidance: { direction: string; traditionalAssociation: string; suggestedUse: string; placementGuidance: string; considerations: string }[];
  furniturePlacement: { item: string; recommendedPlacement: string; reason: string }[];
  colorGuidance: { color: string; area: string; reason: string }[];
  lightingGuidance: string[];
  dos: string[];
  considerations: string[];
  priorityActions: { highPriority: string[]; optional: string[] };
  practicalInteriorNote: string;
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

const furnitureSchema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "recommendations", "placementSuggestions", "estimatedTotal"],
  properties: {
    summary: { type: "string" },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "category", "quantity", "estimatedPrice", "reason", "spaceSavingAlternative"],
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          quantity: { type: "number" },
          estimatedPrice: { type: "number" },
          reason: { type: "string" },
          spaceSavingAlternative: { type: "string" },
        },
      },
    },
    placementSuggestions: { type: "array", items: { type: "string" } },
    estimatedTotal: { type: "number" },
  },
} as const;

const geminiFurnitureSchema = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    recommendations: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          category: { type: "STRING" },
          quantity: { type: "INTEGER" },
          estimatedPrice: { type: "NUMBER" },
          reason: { type: "STRING" },
          spaceSavingAlternative: { type: "STRING" },
        },
        required: ["name", "category", "quantity", "estimatedPrice", "reason", "spaceSavingAlternative"],
      },
    },
    placementSuggestions: { type: "ARRAY", items: { type: "STRING" } },
    estimatedTotal: { type: "NUMBER" },
  },
  required: ["summary", "recommendations", "placementSuggestions", "estimatedTotal"],
} as const;

const geminiBudgetSchema = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    budgetOverview: {
      type: "OBJECT",
      properties: {
        totalBudget: { type: "NUMBER" },
        furniture: { type: "NUMBER" },
        storage: { type: "NUMBER" },
        lighting: { type: "NUMBER" },
        decor: { type: "NUMBER" },
        softFurnishings: { type: "NUMBER" },
        other: { type: "NUMBER" },
        estimatedTotal: { type: "NUMBER" },
        remainingBudget: { type: "NUMBER" },
      },
      required: ["totalBudget", "furniture", "storage", "lighting", "decor", "softFurnishings", "other", "estimatedTotal", "remainingBudget"],
    },
    furnitureRecommendations: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          category: { type: "STRING" },
          quantity: { type: "INTEGER" },
          estimatedPrice: { type: "NUMBER" },
          reason: { type: "STRING" },
          spaceSavingAlternative: { type: "STRING" },
        },
        required: ["name", "category", "quantity", "estimatedPrice", "reason", "spaceSavingAlternative"],
      },
    },
    spaceOptimization: { type: "ARRAY", items: { type: "STRING" } },
    layoutPlan: { type: "ARRAY", items: { type: "STRING" } },
    moneySavingSuggestions: { type: "ARRAY", items: { type: "STRING" } },
    priorityList: {
      type: "OBJECT",
      properties: {
        essential: { type: "ARRAY", items: { type: "STRING" } },
        recommended: { type: "ARRAY", items: { type: "STRING" } },
        optional: { type: "ARRAY", items: { type: "STRING" } },
      },
      required: ["essential", "recommended", "optional"],
    },
    finalNote: { type: "STRING" },
  },
  required: ["summary", "budgetOverview", "furnitureRecommendations", "spaceOptimization", "layoutPlan", "moneySavingSuggestions", "priorityList", "finalNote"],
} as const;

const geminiVastuSchema = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    directionalGuidance: { type: "ARRAY", items: { type: "OBJECT", properties: { direction: { type: "STRING" }, traditionalAssociation: { type: "STRING" }, suggestedUse: { type: "STRING" }, placementGuidance: { type: "STRING" }, considerations: { type: "STRING" } }, required: ["direction", "traditionalAssociation", "suggestedUse", "placementGuidance", "considerations"] } },
    furniturePlacement: { type: "ARRAY", items: { type: "OBJECT", properties: { item: { type: "STRING" }, recommendedPlacement: { type: "STRING" }, reason: { type: "STRING" } }, required: ["item", "recommendedPlacement", "reason"] } },
    colorGuidance: { type: "ARRAY", items: { type: "OBJECT", properties: { color: { type: "STRING" }, area: { type: "STRING" }, reason: { type: "STRING" } }, required: ["color", "area", "reason"] } },
    lightingGuidance: { type: "ARRAY", items: { type: "STRING" } },
    dos: { type: "ARRAY", items: { type: "STRING" } },
    considerations: { type: "ARRAY", items: { type: "STRING" } },
    priorityActions: { type: "OBJECT", properties: { highPriority: { type: "ARRAY", items: { type: "STRING" } }, optional: { type: "ARRAY", items: { type: "STRING" } } }, required: ["highPriority", "optional"] },
    practicalInteriorNote: { type: "STRING" },
  },
  required: ["summary", "directionalGuidance", "furniturePlacement", "colorGuidance", "lightingGuidance", "dos", "considerations", "priorityActions", "practicalInteriorNote"],
} as const;

function parseVastuGuidance(content: string): VastuGuidance {
  const parsed = JSON.parse(content) as VastuGuidance;
  if (!parsed.summary || !parsed.priorityActions || !parsed.practicalInteriorNote || !Array.isArray(parsed.directionalGuidance) || !Array.isArray(parsed.furniturePlacement)) {
    throw new Error("Gemini returned an invalid Vastu guidance plan. Please try again.");
  }
  return parsed;
}

function parseBudgetPlan(content: string, requestedBudget: number): BudgetPlan {
  const parsed = JSON.parse(content) as BudgetPlan;
  const overview = parsed.budgetOverview;
  const categories = [overview?.furniture, overview?.storage, overview?.lighting, overview?.decor, overview?.softFurnishings, overview?.other];
  if (!parsed.summary || !overview || categories.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new Error("Gemini returned an invalid budget plan. Please try again.");
  }
  const estimatedTotal = Math.round(categories.reduce((sum, value) => sum + value, 0));
  return {
    ...parsed,
    budgetOverview: {
      ...overview,
      totalBudget: requestedBudget,
      estimatedTotal,
      remainingBudget: requestedBudget - estimatedTotal,
    },
  };
}

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

export const generateFurnitureRecommendations = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => FurnitureInput.parse(input))
  .handler(async ({ data }): Promise<FurnitureRecommendation> => {
    const key = process.env["GEMINI_API_KEY"];
    if (!key) throw new Error("Furniture recommendations are not configured: missing GEMINI_API_KEY.");

    const imageMatch = data.image.match(/^data:(image\/(?:jpeg|jpg|png));base64,(.+)$/);
    if (!imageMatch) throw new Error("The room photo could not be prepared for Gemini.");

    const res = await fetchGeminiContent({ key, fallbackModel: GEMINI_TEXT_FALLBACK_MODEL, body: {
        systemInstruction: {
          parts: [
            {
              text: "You are FurniSense AI, an Indian interior furniture specialist. Recommend practical furniture based on the visible room context, room type, style, budget and requirements. Treat the image as visual context only: do not claim exact room dimensions or measurements. Prices are approximate INR estimates, not live market prices. Recommend 4 to 8 items, use positive integer quantities, keep the estimated total within the stated budget when possible, and always provide a useful space-saving alternative (or say Not applicable).",
            },
          ],
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Room type: ${data.roomType}\nDesign style: ${data.style}\nBudget: ${data.budget}\nRequirements: ${data.notes || "none"}`,
              },
              { inlineData: { mimeType: imageMatch[1], data: imageMatch[2] } },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: geminiFurnitureSchema,
        },
      },
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Too many requests right now — try again in a moment.");
      if (res.status === 503) throw new Error("Gemini is temporarily busy. Please try again in a moment.");
      if (res.status === 403) throw new Error("Gemini rejected the API key. Check GEMINI_API_KEY configuration.");
      throw new Error(detail || `Furniture recommendations failed (${res.status})`);
    }

    const json = (await res.json()) as { candidates?: { content?: { parts?: { text?: string } } }[] };
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error("The furniture recommendation service returned an empty result.");
    return JSON.parse(content) as FurnitureRecommendation;
  });

export const generateBudgetPlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BudgetInput.parse(input))
  .handler(async ({ data }): Promise<BudgetPlan> => {
    const key = process.env["GEMINI_API_KEY"];
    if (!key) throw new Error("SpaceWise is not configured: missing GEMINI_API_KEY.");

    const imageMatch = data.image.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
    if (!imageMatch) throw new Error("The room photo could not be prepared for Gemini.");
    const requestedBudget = Number(data.budget.replace(/[^0-9]/g, ""));
    if (!Number.isFinite(requestedBudget) || requestedBudget <= 0) throw new Error("Please choose a valid interior budget.");

    const res = await fetchGeminiContent({ key, fallbackModel: GEMINI_TEXT_FALLBACK_MODEL, body: {
          systemInstruction: {
            parts: [
              {
                text: "You are SpaceWise AI, a practical Indian interior budget and space-planning specialist. Analyze the uploaded room image as visual context only. Never claim exact room dimensions, never invent measurements, and use wording such as Based on the visible layout or The image suggests. Prices are approximate INR estimates, not live market prices. Create a useful plan for the selected room, style, budget, requirements and space concerns. Keep category allocations internally consistent and the estimated total within or close to the requested budget. Return 4 to 8 furniture recommendations, 4 to 6 space recommendations, 3 to 5 money-saving suggestions, and concrete text placement guidance relative to visible doors, windows and furniture.",
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Room type: ${data.roomType}\nDesign style: ${data.style}\nTotal interior budget: ${data.budget}\nRoom requirements: ${data.requirements || "None specified"}\nSpace concerns: ${data.spaceConcerns || "None specified"}`,
                },
                { inlineData: { mimeType: imageMatch[1], data: imageMatch[2] } },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: geminiBudgetSchema,
          },
        },
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Too many requests right now - try again in a moment.");
      if (res.status === 403) throw new Error("Gemini rejected the API key. Check GEMINI_API_KEY configuration.");
      if (res.status === 503) throw new Error("Gemini is temporarily busy. Please try again in a moment.");
      throw new Error(detail && !detail.trim().startsWith("{") ? detail : `SpaceWise generation failed (${res.status})`);
    }

    const json = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error("Gemini returned an empty SpaceWise plan.");
    try {
      return parseBudgetPlan(content, requestedBudget);
    } catch (cause) {
      if (cause instanceof Error && cause.message.startsWith("Gemini returned")) throw cause;
      throw new Error("Gemini returned an unreadable SpaceWise plan. Please try again.");
    }
  });

export const generateVastuGuidance = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => VastuInput.parse(input))
  .handler(async ({ data }): Promise<VastuGuidance> => {
    const key = process.env["GEMINI_API_KEY"];
    if (!key) throw new Error("VastuSense is not configured: missing GEMINI_API_KEY.");
    const imageMatch = data.image?.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
    const directionUnknown = [data.roomOrientation, data.entranceDirection, data.windowDirection].some((value) => value === "I don't know");
    const prompt = `Room type: ${data.roomType}\nRoom orientation / main direction: ${data.roomOrientation}\nMain entrance direction: ${data.entranceDirection}\nWindow direction: ${data.windowDirection}\nCurrent furniture: ${data.currentFurniture || "Not provided"}\nSpecific concern/preferences: ${data.concerns || "Not provided"}\n${directionUnknown ? "At least one direction is unknown. Do not infer or invent it from the photo; state that direction-specific guidance is limited." : "Use only the supplied directions."}`;
    const response = await fetchGeminiContent({ key, fallbackModel: GEMINI_TEXT_FALLBACK_MODEL, body: {
        systemInstruction: { parts: [{ text: "You are VastuSense AI providing traditional Vastu guidance for interior planning. Present it explicitly as cultural/traditional guidance, not scientifically validated predictions, medical advice, financial advice, or guaranteed outcomes. Never claim Vastu guarantees health, wealth, relationships, success or destiny. Do not infer compass directions or exact measurements from an ordinary image. Only use supplied directions; if any direction is unknown, say directional guidance is limited. Recommend only furniture categories relevant to the selected room. Keep suggestions practical, comfortable, safe and accessible, and say practical interior requirements take priority over forcing a traditional preference." }] },
        contents: [{ role: "user", parts: [{ text: prompt }, ...(imageMatch ? [{ inlineData: { mimeType: imageMatch[1], data: imageMatch[2] } }] : [])] }],
        generationConfig: { responseMimeType: "application/json", responseSchema: geminiVastuSchema },
      },
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      if (response.status === 429 || response.status === 503) throw new Error("Gemini is temporarily busy. Please try again in a moment.");
      if (response.status === 403) throw new Error("Gemini rejected the API key. Check GEMINI_API_KEY configuration.");
      throw new Error(detail && !detail.trim().startsWith("{") ? detail : `VastuSense generation failed (${response.status})`);
    }
    const json = (await response.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error("Gemini returned an empty VastuSense plan.");
    try { return parseVastuGuidance(content); } catch (cause) {
      if (cause instanceof Error && cause.message.startsWith("Gemini returned")) throw cause;
      throw new Error("Gemini returned an unreadable VastuSense plan. Please try again.");
    }
  });

const ColorInput = z.object({
  image: z.string().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "A JPG, PNG, or WebP room photo is required"),
  roomType: z.string().min(1),
  style: z.string().min(1),
  colorMood: z.string().min(1),
  naturalLighting: z.string().min(1),
  preferences: z.string().optional(),
});

export type ColorRecommendation = {
  summary: string;
  primaryWallColor: {
    name: string;
    hex: string;
    reason: string;
  };
  secondaryColor: {
    name: string;
    hex: string;
    reason: string;
  };
  accentColor: {
    name: string;
    hex: string;
    reason: string;
  };
  furnitureColor: {
    recommendation: string;
    reason: string;
  };
  softFurnishingColor: {
    recommendation: string;
    reason: string;
  };
  flooringTone: {
    recommendation: string;
    reason: string;
  };
  lighting: {
    recommendation: string;
    reason: string;
  };
  colorHarmony: string;
  alternativePalettes: {
    name: string;
    colors: {
      name: string;
      hex: string;
    }[];
    description: string;
  }[];
  colorPsychology: string;
};

const geminiColorSchema = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    primaryWallColor: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        hex: { type: "STRING" },
        reason: { type: "STRING" },
      },
      required: ["name", "hex", "reason"],
    },
    secondaryColor: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        hex: { type: "STRING" },
        reason: { type: "STRING" },
      },
      required: ["name", "hex", "reason"],
    },
    accentColor: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        hex: { type: "STRING" },
        reason: { type: "STRING" },
      },
      required: ["name", "hex", "reason"],
    },
    furnitureColor: {
      type: "OBJECT",
      properties: {
        recommendation: { type: "STRING" },
        reason: { type: "STRING" },
      },
      required: ["recommendation", "reason"],
    },
    softFurnishingColor: {
      type: "OBJECT",
      properties: {
        recommendation: { type: "STRING" },
        reason: { type: "STRING" },
      },
      required: ["recommendation", "reason"],
    },
    flooringTone: {
      type: "OBJECT",
      properties: {
        recommendation: { type: "STRING" },
        reason: { type: "STRING" },
      },
      required: ["recommendation", "reason"],
    },
    lighting: {
      type: "OBJECT",
      properties: {
        recommendation: { type: "STRING" },
        reason: { type: "STRING" },
      },
      required: ["recommendation", "reason"],
    },
    colorHarmony: { type: "STRING" },
    alternativePalettes: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          colors: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                hex: { type: "STRING" },
              },
              required: ["name", "hex"],
            },
          },
          description: { type: "STRING" },
        },
        required: ["name", "colors", "description"],
      },
    },
    colorPsychology: { type: "STRING" },
  },
  required: [
    "summary",
    "primaryWallColor",
    "secondaryColor",
    "accentColor",
    "furnitureColor",
    "softFurnishingColor",
    "flooringTone",
    "lighting",
    "colorHarmony",
    "alternativePalettes",
    "colorPsychology",
  ],
} as const;

export const generateColorRecommendations = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ColorInput.parse(input))
  .handler(async ({ data }): Promise<ColorRecommendation> => {
    const key = process.env["GEMINI_API_KEY"];
    if (!key) throw new Error("Color recommendations are not configured: missing GEMINI_API_KEY.");

    const imageMatch = data.image.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
    if (!imageMatch) throw new Error("The room photo could not be prepared for Gemini.");

    const res = await fetchGeminiContent({ key, fallbackModel: GEMINI_TEXT_FALLBACK_MODEL, body: {
          systemInstruction: {
            parts: [
              {
                text: "You are Chromatica AI, an expert interior color consultant and color theorist. Visually analyze the uploaded room photo and recommend a coordinated, harmonious interior color palette based on the room's visible layout, existing furniture, flooring, natural lighting, requested room type, design style, and color mood preference. Treat the photo as visual context only: do not claim exact measurements or invent room dimensions. All HEX values must be valid 6-digit hex color codes (#RRGGBB) representing practical, elegant architectural and interior colors. Recommendations across walls, furniture, soft furnishings, flooring, and lighting must form a cohesive design scheme. Provide exactly 2 alternative palettes, each with 3 to 5 matching colors with valid hex codes and clear names.",
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Room type: ${data.roomType}\nDesign style: ${data.style}\nColor mood / preference: ${data.colorMood}\nNatural lighting: ${data.naturalLighting}\nExisting furniture or color preferences: ${data.preferences || "None specified"}`,
                },
                { inlineData: { mimeType: imageMatch[1], data: imageMatch[2] } },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: geminiColorSchema,
          },
        },
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Too many requests right now — try again in a moment.");
      if (res.status === 503) throw new Error("Gemini is temporarily busy. Please try again in a moment.");
      if (res.status === 403) throw new Error("Gemini rejected the API key. Check GEMINI_API_KEY configuration.");
      throw new Error(detail || `Color recommendations failed (${res.status})`);
    }

    const json = (await res.json()) as { candidates?: { content?: { parts?: { text?: string } } }[] };
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error("The color recommendation service returned an empty result.");
    return JSON.parse(content) as ColorRecommendation;
  });
