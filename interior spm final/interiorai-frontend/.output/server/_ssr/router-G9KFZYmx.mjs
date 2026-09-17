import { i as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as AuthProvider } from "./auth-context-HLjDwMnT.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-G9KFZYmx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-IE1PG28O.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "InteriorAI Studio" },
			{
				name: "description",
				content: "AI-powered room design, realistic renders, budgets and shoppable plans."
			},
			{
				name: "author",
				content: "InteriorAI Studio"
			},
			{
				property: "og:title",
				content: "InteriorAI Studio"
			},
			{
				property: "og:description",
				content: "Design a beautiful room in minutes with AI."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$2 = () => import("./routes-DKq59WAn.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "InteriorAI Studio — Design Your Dream Room" },
		{
			name: "description",
			content: "InteriorAI combines furniture, colour, budget, space, visualization, room analysis and Vastu capabilities for better interior decisions."
		},
		{
			property: "og:title",
			content: "InteriorAI Studio — Design Your Dream Room"
		},
		{
			property: "og:description",
			content: "Seven focused AI capabilities for planning and visualizing better interiors."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./studio-B6QlvH52.mjs");
var Route$2 = createFileRoute("/studio")({
	head: () => ({ meta: [
		{ title: "AI Design Studio — InteriorAI Studio" },
		{
			name: "description",
			content: "Use the room redesign and visualization capability to review a photorealistic concept with budget and planning context."
		},
		{
			property: "og:title",
			content: "AI Design Studio — InteriorAI Studio"
		},
		{
			property: "og:description",
			content: "Real AI room redesigns with renders, budgets and shoppable product lists."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
function buildPrompt(b) {
	return [
		`You are Reimagine AI, an expert interior designer and architectural visualiser.`,
		`Redesign the supplied ${b.roomType.toLowerCase()} photograph in a ${b.style} style.`,
		`Preserve the room's basic architectural structure, camera angle, perspective, visible windows, doors, openings, ceiling, floor boundaries and other fixed architectural elements.`,
		`Redesign only the furniture, decor, colors, lighting, textiles, materials and styling so the result is a believable, photorealistic version of the supplied room, not an unrelated room.`,
		`Respect the user's budget conceptually: ${b.budget}. Do not claim exact measurements or infer room dimensions from the photograph.`,
		b.notes ? `Redesign preferences: ${b.notes}.` : "",
		`Return one high-quality interior-design visualization with no text, no labels, no watermark, no floor plan and no collage.`
	].filter(Boolean).join(" ");
}
async function fetchGeminiImage(key, body) {
	let response;
	for (let attempt = 0; attempt <= 2; attempt += 1) {
		if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
		response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${encodeURIComponent(key)}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (response.ok) return response;
		const detail = await response.clone().text().catch(() => "");
		if (response.status !== 503 && !detail.includes("UNAVAILABLE")) return response;
	}
	return response;
}
var Route$1 = createFileRoute("/api/redesign")({ server: { handlers: { POST: async ({ request }) => {
	const key = processModule.env["GEMINI_API_KEY"];
	if (!key) return new Response("Reimagine AI is not configured: missing GEMINI_API_KEY.", { status: 500 });
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response("The redesign request was invalid.", { status: 400 });
	}
	const imageMatch = body?.image?.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
	if (!imageMatch) return new Response("Please upload a valid JPG, PNG, or WebP room photo.", { status: 400 });
	if (!body.roomType || !body.style || !body.budget) return new Response("Room type, design style and budget are required.", { status: 400 });
	let upstream;
	try {
		upstream = await fetchGeminiImage(key, {
			systemInstruction: { parts: [{ text: "Create a realistic image-to-image interior redesign. The uploaded room image is the visual reference and must remain recognizable. Do not invent dimensions." }] },
			contents: [{
				role: "user",
				parts: [{ text: buildPrompt(body) }, { inlineData: {
					mimeType: imageMatch[1],
					data: imageMatch[2]
				} }]
			}],
			generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
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
	const parts = (await upstream.json()).candidates?.[0]?.content?.parts ?? [];
	const imagePart = parts.find((part) => part.inlineData?.data);
	if (!imagePart?.inlineData?.data) return new Response("Gemini returned no redesigned image. Please try again.", { status: 502 });
	return Response.json({
		image: `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}`,
		summary: parts.find((part) => part.text)?.text || "A new direction has been created from the visible room layout and your preferences."
	});
} } } });
var $$splitComponentImporter = () => import("./features._featureId-DrSQatU0.mjs");
var Route = createFileRoute("/features/$featureId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	StudioRoute: Route$2.update({
		id: "/studio",
		path: "/studio",
		getParentRoute: () => Route$4
	}),
	ApiRedesignRoute: Route$1.update({
		id: "/api/redesign",
		path: "/api/redesign",
		getParentRoute: () => Route$4
	}),
	FeaturesFeatureIdRoute: Route.update({
		id: "/features/$featureId",
		path: "/features/$featureId",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
