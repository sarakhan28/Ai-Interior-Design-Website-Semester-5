import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/design.functions-BoBSHGce.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var OPENROUTER_TEXT_MODELS = [
	"openai/gpt-4o-mini",
	"anthropic/claude-3-haiku",
	"qwen/qwen2.5-vl-72b-instruct"
];
function isOpenRouterTemporaryError(status, detail) {
	if (status === 400 || status === 401 || status === 403 || status === 404) return false;
	if (status === 503 || status === 429 || status === 500 || status === 502 || status === 504) return true;
	const lower = detail.toLowerCase();
	return lower.includes("unavailable") || lower.includes("temporarily busy") || lower.includes("high demand") || lower.includes("overloaded") || lower.includes("rate limit") || lower.includes("try again");
}
function extractJsonFromText(raw) {
	const trimmed = raw.trim();
	const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
	if (fenceMatch && fenceMatch[1]) return fenceMatch[1].trim();
	const firstBrace = trimmed.indexOf("{");
	const lastBrace = trimmed.lastIndexOf("}");
	if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) return trimmed.slice(firstBrace, lastBrace + 1);
	return trimmed;
}
async function fetchOpenRouterChat({ key, messages, responseFormat = { type: "json_object" }, models = OPENROUTER_TEXT_MODELS, maxTokens = 2500 }) {
	let lastResponse;
	for (const [modelIndex, currentModel] of models.entries()) {
		const maxRetries = modelIndex === 0 ? 2 : 1;
		for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
			if (attempt > 0 || modelIndex > 0) {
				const backoffMs = 500 * Math.pow(2, attempt) + Math.floor(Math.random() * 200);
				await new Promise((resolve) => setTimeout(resolve, backoffMs));
			}
			try {
				const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${key}`,
						"Content-Type": "application/json",
						"HTTP-Referer": "http://localhost:5173",
						"X-Title": "InteriorAI Studio"
					},
					body: JSON.stringify({
						model: currentModel,
						models: models.slice(0, 3),
						max_tokens: maxTokens,
						messages,
						response_format: responseFormat
					})
				});
				lastResponse = response;
				if (response.ok) return response;
				const detail = await response.clone().text().catch(() => "");
				if (!isOpenRouterTemporaryError(response.status, detail)) return response;
			} catch {}
		}
	}
	return lastResponse;
}
var PlanInput = objectType({
	style: stringType().min(1),
	roomType: stringType().min(1),
	budget: stringType().min(1),
	notes: stringType().optional()
});
var FurnitureInput = objectType({
	image: stringType().regex(/^data:image\/(jpeg|jpg|png);base64,/, "A JPG or PNG room photo is required"),
	style: stringType().min(1),
	roomType: stringType().min(1),
	budget: stringType().min(1),
	notes: stringType().optional()
});
var BudgetInput = objectType({
	image: stringType().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "A JPG, PNG, or WebP room photo is required"),
	roomType: stringType().min(1),
	style: stringType().min(1),
	budget: stringType().min(1),
	requirements: stringType().optional(),
	spaceConcerns: stringType().optional()
});
var VastuInput = objectType({
	image: stringType().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "A JPG, PNG, or WebP room photo is required").optional(),
	roomType: stringType().min(1),
	roomOrientation: stringType().min(1),
	entranceDirection: stringType().min(1),
	windowDirection: stringType().min(1),
	currentFurniture: stringType().optional(),
	concerns: stringType().optional()
});
function parseVastuGuidance(content) {
	const jsonStr = extractJsonFromText(content);
	const parsed = JSON.parse(jsonStr);
	if (!parsed.summary || !parsed.priorityActions || !parsed.practicalInteriorNote || !Array.isArray(parsed.directionalGuidance) || !Array.isArray(parsed.furniturePlacement)) throw new Error("AI service returned an invalid Vastu guidance plan. Please try again.");
	return parsed;
}
function parseBudgetPlan(content, requestedBudget) {
	const jsonStr = extractJsonFromText(content);
	const parsed = JSON.parse(jsonStr);
	const overview = parsed.budgetOverview;
	const categories = [
		overview?.furniture,
		overview?.storage,
		overview?.lighting,
		overview?.decor,
		overview?.softFurnishings,
		overview?.other
	];
	if (!parsed.summary || !overview || categories.some((value) => !Number.isFinite(value) || value < 0)) throw new Error("AI service returned an invalid budget plan. Please try again.");
	const estimatedTotal = Math.round(categories.reduce((sum, value) => sum + value, 0));
	return {
		...parsed,
		budgetOverview: {
			...overview,
			totalBudget: requestedBudget,
			estimatedTotal,
			remainingBudget: requestedBudget - estimatedTotal
		}
	};
}
function parseFurnitureRecommendation(content) {
	const jsonStr = extractJsonFromText(content);
	const parsed = JSON.parse(jsonStr);
	if (!parsed.summary || !Array.isArray(parsed.recommendations) || !Array.isArray(parsed.placementSuggestions)) throw new Error("AI service returned an invalid furniture recommendation. Please try again.");
	const estimatedTotal = typeof parsed.estimatedTotal === "number" && Number.isFinite(parsed.estimatedTotal) ? parsed.estimatedTotal : parsed.recommendations.reduce((sum, item) => sum + (Number(item.estimatedPrice) || 0) * (Number(item.quantity) || 1), 0);
	return {
		...parsed,
		estimatedTotal: Math.round(estimatedTotal)
	};
}
var generateDesignPlan_createServerFn_handler = createServerRpc({
	id: "fcccfa189e62e2d97cb631ec0ea673b43ffc47e070f12193f36a4fb9ac3ff42e",
	name: "generateDesignPlan",
	filename: "src/lib/design.functions.ts"
}, (opts) => generateDesignPlan.__executeServer(opts));
var generateDesignPlan = createServerFn({ method: "POST" }).inputValidator((input) => PlanInput.parse(input)).handler(generateDesignPlan_createServerFn_handler, async ({ data }) => {
	const key = processModule.env["OPENROUTER_API_KEY"];
	if (!key) throw new Error("Design planning is not configured: missing OPENROUTER_API_KEY.");
	const res = await fetchOpenRouterChat({
		key,
		messages: [{
			role: "system",
			content: "You are an Indian interior designer. Produce practical, realistic design plans in valid JSON format. All prices are in Indian Rupees (INR) as plain numbers. Keep the shopping list total within the stated budget. Return 6 to 10 shopping items, 4 to 5 palette colours with valid hex codes, a design score between 80 and 99, and one short Vastu-aligned placement tip. Return strictly a JSON object with keys: summary (string), palette (array of {name, hex}), materials (array of strings), items (array of {name, description, price, category}), totalCost (number), designScore (number), vastuNote (string)."
		}, {
			role: "user",
			content: `Room type: ${data.roomType}\nStyle: ${data.style}\nBudget: ${data.budget}\nClient notes: ${data.notes || "none"}`
		}]
	});
	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		if (res.status === 401 || res.status === 403) throw new Error("AI service rejected the API key. Check OPENROUTER_API_KEY configuration.");
		if (res.status === 429 || res.status === 503 || isOpenRouterTemporaryError(res.status, detail)) throw new Error("AI service is temporarily unavailable. Please try again in a moment.");
		throw new Error(detail && !detail.trim().startsWith("{") ? detail : `Design plan failed (${res.status})`);
	}
	const content = (await res.json()).choices?.[0]?.message?.content;
	if (!content) throw new Error("The design service returned an empty plan");
	return JSON.parse(extractJsonFromText(content));
});
var generateFurnitureRecommendations_createServerFn_handler = createServerRpc({
	id: "96f8910d9d876f7c1f0c8f1e430463eb27fdc748c39576d3bb04d3314433a2be",
	name: "generateFurnitureRecommendations",
	filename: "src/lib/design.functions.ts"
}, (opts) => generateFurnitureRecommendations.__executeServer(opts));
var generateFurnitureRecommendations = createServerFn({ method: "POST" }).inputValidator((input) => FurnitureInput.parse(input)).handler(generateFurnitureRecommendations_createServerFn_handler, async ({ data }) => {
	const key = processModule.env["OPENROUTER_API_KEY"];
	if (!key) throw new Error("Furniture recommendations are not configured: missing OPENROUTER_API_KEY.");
	if (!data.image.match(/^data:(image\/(?:jpeg|jpg|png));base64,(.+)$/)) throw new Error("The room photo could not be prepared for the AI service.");
	const res = await fetchOpenRouterChat({
		key,
		messages: [{
			role: "system",
			content: "You are FurniSense AI, an Indian interior furniture specialist. Recommend practical furniture based on the visible room context, room type, style, budget and requirements. Treat the image as visual context only: do not claim exact room dimensions or measurements. Prices are approximate INR estimates, not live market prices. Recommend 4 to 8 items, use positive integer quantities, keep the estimated total within the stated budget when possible, and always provide a useful space-saving alternative (or say Not applicable). Output strictly a JSON object with keys: summary (string), recommendations (array of {name, category, quantity, estimatedPrice, reason, spaceSavingAlternative}), placementSuggestions (array of strings), estimatedTotal (number)."
		}, {
			role: "user",
			content: [{
				type: "text",
				text: `Room type: ${data.roomType}\nDesign style: ${data.style}\nBudget: ${data.budget}\nRequirements: ${data.notes || "none"}`
			}, {
				type: "image_url",
				image_url: { url: data.image }
			}]
		}]
	});
	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		if (res.status === 401 || res.status === 403) throw new Error("AI service rejected the API key. Check OPENROUTER_API_KEY configuration.");
		if (res.status === 429 || res.status === 503 || isOpenRouterTemporaryError(res.status, detail)) throw new Error("AI service is temporarily unavailable. Please try again in a moment.");
		throw new Error(detail && !detail.trim().startsWith("{") ? detail : `Furniture recommendations failed (${res.status})`);
	}
	const content = (await res.json()).choices?.[0]?.message?.content;
	if (!content) throw new Error("The furniture recommendation service returned an empty result.");
	return parseFurnitureRecommendation(content);
});
var generateBudgetPlan_createServerFn_handler = createServerRpc({
	id: "8f32b808463f5bab345b1e0de4ca3e97d326cd327c8ee7aa1b400893566f7034",
	name: "generateBudgetPlan",
	filename: "src/lib/design.functions.ts"
}, (opts) => generateBudgetPlan.__executeServer(opts));
var generateBudgetPlan = createServerFn({ method: "POST" }).inputValidator((input) => BudgetInput.parse(input)).handler(generateBudgetPlan_createServerFn_handler, async ({ data }) => {
	const key = processModule.env["OPENROUTER_API_KEY"];
	if (!key) throw new Error("SpaceWise is not configured: missing OPENROUTER_API_KEY.");
	if (!data.image.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/)) throw new Error("The room photo could not be prepared for the AI service.");
	const requestedBudget = Number(data.budget.replace(/[^0-9]/g, ""));
	if (!Number.isFinite(requestedBudget) || requestedBudget <= 0) throw new Error("Please choose a valid interior budget.");
	const res = await fetchOpenRouterChat({
		key,
		messages: [{
			role: "system",
			content: "You are SpaceWise AI, a practical Indian interior budget and space-planning specialist. Analyze the uploaded room image as visual context only. Never claim exact room dimensions, never invent measurements, and use wording such as Based on the visible layout or The image suggests. Prices are approximate INR estimates, not live market prices. Create a useful plan for the selected room, style, budget, requirements and space concerns. Keep category allocations internally consistent and the estimated total within or close to the requested budget. Return 4 to 8 furniture recommendations, 4 to 6 space recommendations, 3 to 5 money-saving suggestions, and concrete text placement guidance relative to visible doors, windows and furniture. Output strictly a JSON object with keys: summary (string), budgetOverview ({totalBudget, furniture, storage, lighting, decor, softFurnishings, other, estimatedTotal, remainingBudget}), furnitureRecommendations (array of {name, category, quantity, estimatedPrice, reason, spaceSavingAlternative}), spaceOptimization (array of strings), layoutPlan (array of strings), moneySavingSuggestions (array of strings), priorityList ({essential: string[], recommended: string[], optional: string[]}), finalNote (string)."
		}, {
			role: "user",
			content: [{
				type: "text",
				text: `Room type: ${data.roomType}\nDesign style: ${data.style}\nTotal interior budget: ${data.budget}\nRoom requirements: ${data.requirements || "None specified"}\nSpace concerns: ${data.spaceConcerns || "None specified"}`
			}, {
				type: "image_url",
				image_url: { url: data.image }
			}]
		}]
	});
	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		if (res.status === 401 || res.status === 403) throw new Error("AI service rejected the API key. Check OPENROUTER_API_KEY configuration.");
		if (res.status === 429 || res.status === 503 || isOpenRouterTemporaryError(res.status, detail)) throw new Error("AI service is temporarily unavailable. Please try again in a moment.");
		throw new Error(detail && !detail.trim().startsWith("{") ? detail : `SpaceWise generation failed (${res.status})`);
	}
	const content = (await res.json()).choices?.[0]?.message?.content;
	if (!content) throw new Error("AI service returned an empty SpaceWise plan.");
	try {
		return parseBudgetPlan(content, requestedBudget);
	} catch (cause) {
		if (cause instanceof Error && cause.message.startsWith("AI service returned")) throw cause;
		throw new Error("AI service returned an unreadable SpaceWise plan. Please try again.");
	}
});
var generateVastuGuidance_createServerFn_handler = createServerRpc({
	id: "3728f59eb30a257f725d274eedb58e5d6daa2e2f237ac72bb5c8c1b9faa475e1",
	name: "generateVastuGuidance",
	filename: "src/lib/design.functions.ts"
}, (opts) => generateVastuGuidance.__executeServer(opts));
var generateVastuGuidance = createServerFn({ method: "POST" }).inputValidator((input) => VastuInput.parse(input)).handler(generateVastuGuidance_createServerFn_handler, async ({ data }) => {
	const key = processModule.env["OPENROUTER_API_KEY"];
	if (!key) throw new Error("VastuSense is not configured: missing OPENROUTER_API_KEY.");
	const imageMatch = data.image?.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
	const directionUnknown = [
		data.roomOrientation,
		data.entranceDirection,
		data.windowDirection
	].some((value) => value === "I don't know");
	const promptText = `Room type: ${data.roomType}\nRoom orientation / main direction: ${data.roomOrientation}\nMain entrance direction: ${data.entranceDirection}\nWindow direction: ${data.windowDirection}\nCurrent furniture: ${data.currentFurniture || "Not provided"}\nSpecific concern/preferences: ${data.concerns || "Not provided"}\n${directionUnknown ? "At least one direction is unknown. Do not infer or invent it from the photo; state that direction-specific guidance is limited." : "Use only the supplied directions."}`;
	const response = await fetchOpenRouterChat({
		key,
		messages: [{
			role: "system",
			content: "You are VastuSense AI providing traditional Vastu guidance for interior planning. Present it explicitly as cultural/traditional guidance, not scientifically validated predictions, medical advice, financial advice, or guaranteed outcomes. Never claim Vastu guarantees health, wealth, relationships, success or destiny. Do not infer compass directions or exact measurements from an ordinary image. Only use supplied directions; if any direction is unknown, say directional guidance is limited. Recommend only furniture categories relevant to the selected room. Keep suggestions practical, comfortable, safe and accessible, and say practical interior requirements take priority over forcing a traditional preference. Output strictly a JSON object with keys: summary (string), directionalGuidance (array of {direction, traditionalAssociation, suggestedUse, placementGuidance, considerations}), furniturePlacement (array of {item, recommendedPlacement, reason}), colorGuidance (array of {color, area, reason}), lightingGuidance (array of strings), dos (array of strings), considerations (array of strings), priorityActions ({highPriority: string[], optional: string[]}), practicalInteriorNote (string)."
		}, {
			role: "user",
			content: imageMatch ? [{
				type: "text",
				text: promptText
			}, {
				type: "image_url",
				image_url: { url: data.image }
			}] : promptText
		}]
	});
	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		if (response.status === 401 || response.status === 403) throw new Error("AI service rejected the API key. Check OPENROUTER_API_KEY configuration.");
		if (response.status === 429 || response.status === 503 || isOpenRouterTemporaryError(response.status, detail)) throw new Error("AI service is temporarily busy. Please try again in a moment.");
		throw new Error(detail && !detail.trim().startsWith("{") ? detail : `VastuSense generation failed (${response.status})`);
	}
	const content = (await response.json()).choices?.[0]?.message?.content;
	if (!content) throw new Error("AI service returned an empty VastuSense plan.");
	try {
		return parseVastuGuidance(content);
	} catch (cause) {
		if (cause instanceof Error && cause.message.startsWith("AI service returned")) throw cause;
		throw new Error("AI service returned an unreadable VastuSense plan. Please try again.");
	}
});
var ColorInput = objectType({
	image: stringType().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "A JPG, PNG, or WebP room photo is required"),
	roomType: stringType().min(1),
	style: stringType().min(1),
	colorMood: stringType().min(1),
	naturalLighting: stringType().min(1),
	preferences: stringType().optional()
});
function parseColorRecommendation(content) {
	const jsonStr = extractJsonFromText(content);
	const parsed = JSON.parse(jsonStr);
	if (!parsed.summary || !parsed.primaryWallColor || !parsed.secondaryColor || !parsed.accentColor || !Array.isArray(parsed.alternativePalettes)) throw new Error("AI service returned an invalid color recommendation. Please try again.");
	return parsed;
}
var generateColorRecommendations_createServerFn_handler = createServerRpc({
	id: "01a034350c599b0f7c9958ee5c9460b8df5d19f68cb5300a2c45f30f6053d547",
	name: "generateColorRecommendations",
	filename: "src/lib/design.functions.ts"
}, (opts) => generateColorRecommendations.__executeServer(opts));
var generateColorRecommendations = createServerFn({ method: "POST" }).inputValidator((input) => ColorInput.parse(input)).handler(generateColorRecommendations_createServerFn_handler, async ({ data }) => {
	const key = processModule.env["OPENROUTER_API_KEY"];
	if (!key) throw new Error("Color recommendations are not configured: missing OPENROUTER_API_KEY.");
	if (!data.image.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/)) throw new Error("The room photo could not be prepared for the AI service.");
	const res = await fetchOpenRouterChat({
		key,
		messages: [{
			role: "system",
			content: "You are Chromatica AI, an expert interior color consultant and color theorist. Visually analyze the uploaded room photo and recommend a coordinated, harmonious interior color palette based on the room's visible layout, existing furniture, flooring, natural lighting, requested room type, design style, and color mood preference. Treat the photo as visual context only: do not claim exact measurements or invent room dimensions. All HEX values must be valid 6-digit hex color codes (#RRGGBB) representing practical, elegant architectural and interior colors. Recommendations across walls, furniture, soft furnishings, flooring, and lighting must form a cohesive design scheme. Provide exactly 2 alternative palettes, each with 3 to 5 matching colors with valid hex codes and clear names. Output strictly a JSON object with keys: summary (string), primaryWallColor ({name, hex, reason}), secondaryColor ({name, hex, reason}), accentColor ({name, hex, reason}), furnitureColor ({recommendation, reason}), softFurnishingColor ({recommendation, reason}), flooringTone ({recommendation, reason}), lighting ({recommendation, reason}), colorHarmony (string), alternativePalettes (array of {name, colors: array of {name, hex}, description}), colorPsychology (string)."
		}, {
			role: "user",
			content: [{
				type: "text",
				text: `Room type: ${data.roomType}\nDesign style: ${data.style}\nColor mood / preference: ${data.colorMood}\nNatural lighting: ${data.naturalLighting}\nExisting furniture or color preferences: ${data.preferences || "None specified"}`
			}, {
				type: "image_url",
				image_url: { url: data.image }
			}]
		}]
	});
	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		if (res.status === 401 || res.status === 403) throw new Error("AI service rejected the API key. Check OPENROUTER_API_KEY configuration.");
		if (res.status === 429 || res.status === 503 || isOpenRouterTemporaryError(res.status, detail)) throw new Error("AI service is temporarily busy. Please try again in a moment.");
		throw new Error(detail && !detail.trim().startsWith("{") ? detail : `Color recommendations failed (${res.status})`);
	}
	const content = (await res.json()).choices?.[0]?.message?.content;
	if (!content) throw new Error("The color recommendation service returned an empty result.");
	return parseColorRecommendation(content);
});
//#endregion
export { generateBudgetPlan_createServerFn_handler, generateColorRecommendations_createServerFn_handler, generateDesignPlan_createServerFn_handler, generateFurnitureRecommendations_createServerFn_handler, generateVastuGuidance_createServerFn_handler };
