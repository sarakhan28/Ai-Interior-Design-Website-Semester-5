import { i as __toESM } from "../_runtime.mjs";
import { O as isRedirect, _ as useParams, g as useNavigate, h as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DG9t1q3J.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-DyiJRwCz.mjs";
import { A as Compass, B as Brain, C as Image$1, E as FilePlay, H as BadgeIndianRupee, I as ChevronDown, J as Activity, K as ArrowLeft, L as Check, M as CircleCheck, N as ChevronUp, R as ChartColumn, V as Box, a as Upload, b as Lightbulb, c as Sun, d as Sofa, f as ScanLine, g as PaintBucket, h as Palette, i as Video, k as Copy, q as Armchair, r as WandSparkles, s as TreePine, u as Sparkles, v as LoaderCircle, x as Layers, z as Camera } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/features._featureId-DrSQatU0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
createServerFn({ method: "POST" }).inputValidator((input) => PlanInput.parse(input)).handler(createSsrRpc("fcccfa189e62e2d97cb631ec0ea673b43ffc47e070f12193f36a4fb9ac3ff42e"));
var generateFurnitureRecommendations = createServerFn({ method: "POST" }).inputValidator((input) => FurnitureInput.parse(input)).handler(createSsrRpc("96f8910d9d876f7c1f0c8f1e430463eb27fdc748c39576d3bb04d3314433a2be"));
var generateBudgetPlan = createServerFn({ method: "POST" }).inputValidator((input) => BudgetInput.parse(input)).handler(createSsrRpc("8f32b808463f5bab345b1e0de4ca3e97d326cd327c8ee7aa1b400893566f7034"));
var generateVastuGuidance = createServerFn({ method: "POST" }).inputValidator((input) => VastuInput.parse(input)).handler(createSsrRpc("3728f59eb30a257f725d274eedb58e5d6daa2e2f237ac72bb5c8c1b9faa475e1"));
var ColorInput = objectType({
	image: stringType().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "A JPG, PNG, or WebP room photo is required"),
	roomType: stringType().min(1),
	style: stringType().min(1),
	colorMood: stringType().min(1),
	naturalLighting: stringType().min(1),
	preferences: stringType().optional()
});
var generateColorRecommendations = createServerFn({ method: "POST" }).inputValidator((input) => ColorInput.parse(input)).handler(createSsrRpc("01a034350c599b0f7c9958ee5c9460b8df5d19f68cb5300a2c45f30f6053d547"));
var openCvPromise = null;
function loadOpenCv() {
	openCvPromise ??= import("../_libs/techstark__opencv-js+unenv.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then(({ default: opencv }) => Promise.resolve(opencv)).then((opencv) => {
		if (!opencv || typeof opencv.Mat !== "function") throw new Error("OpenCV.js could not be loaded.");
		return opencv;
	});
	return openCvPromise;
}
function clamp(value, minimum, maximum) {
	return Math.min(Math.max(value, minimum), maximum);
}
function brightnessLevel(brightness) {
	if (brightness < 78) return "Low";
	if (brightness > 174) return "High";
	return "Medium";
}
function createObservations(metrics) {
	const lightingLevel = brightnessLevel(metrics.brightness);
	const naturalLight = metrics.brightness > 145 ? "The visible image is well illuminated, which may indicate substantial natural or artificial light." : metrics.brightness < 85 ? "The visible image appears dim; the light source direction is not reliably determined from this analysis." : "The visible image has moderate illumination; window-driven natural light is not reliably separable from artificial light here.";
	const openSpace = metrics.foregroundRatio < .3 ? "Large regions have relatively low visual activity and may represent open floor or wall space." : "Visual activity is distributed across much of the frame, suggesting a more furnished or detailed view.";
	const density = metrics.edgeDensity > .18 ? "The frame has high edge activity, consistent with a visually dense scene." : "The frame has moderate-to-low edge activity, suggesting a visually calmer scene.";
	const contours = metrics.contourCount > 90 ? "Many contour candidates are visible; furniture-like boundaries may overlap in the perspective view." : "Fewer major contour candidates are visible, so only broad structure can be discussed confidently.";
	const structure = metrics.edgeDensity > .12 ? "Major wall, floor and furniture boundaries may be present among the detected edges; perspective makes physical interpretation approximate." : "Only limited major edges were detected; fixed architectural boundaries are not reliably separable in this view.";
	const objects = metrics.contourCount > 35 ? ["Visual object observations: contour groups may correspond to furniture-like forms such as seating, tables, cabinets or other room contents.", "Object identity is approximate because this OpenCV pass does not perform trained object detection."] : ["Visual object observations: no distinct object category can be inferred reliably from the measured contours.", "Use the preview as context rather than a guaranteed object-recognition result."];
	return {
		summary: `The image shows a ${lightingLevel.toLowerCase()} brightness scene with ${density} Based on image perspective, the analysis can describe visible structure and relative activity, but it cannot establish physical room measurements.`,
		lighting: {
			level: lightingLevel,
			naturalLight,
			observations: [
				"Brightness is computed from the grayscale image average.",
				metrics.brightness < 95 ? "Darker regions are present across the visible frame." : "No strongly dark overall exposure pattern was detected.",
				metrics.brightness > 185 ? "Bright regions may contain window or light-source highlights." : "Light-source boundaries are not isolated reliably from a single frame."
			]
		},
		spatialObservations: [
			openSpace,
			density,
			contours,
			"Walkway clearance cannot be measured; only visible obstruction patterns should be considered."
		],
		structureObservations: [
			structure,
			"Windows, doors and openings are reported only when visually evident; this basic contour pass does not guarantee their identity.",
			"No exact wall length, ceiling height, area or furniture dimensions are inferred."
		],
		objectObservations: objects,
		optimizationSuggestions: [
			metrics.foregroundRatio > .55 ? "Consider reducing visual clutter in the busiest visible region to improve circulation." : "Keep the relatively open visible regions clear to preserve an easy walkway.",
			"Place frequently used furniture with visible clearance around doors and likely circulation paths.",
			"Use vertical or multifunctional storage where the visible scene appears furniture-dense.",
			"Treat unused wall or corner regions as candidates for compact storage, lighting or plants after an in-person fit check."
		]
	};
}
function analyzeCanvas(opencv, canvas, includeEdgePreview) {
	const source = opencv.imread(canvas);
	const scale = Math.min(1, 640 / Math.max(source.cols, source.rows));
	const resized = new opencv.Mat();
	const gray = new opencv.Mat();
	const blurred = new opencv.Mat();
	const edges = new opencv.Mat();
	const threshold = new opencv.Mat();
	const contours = new opencv.MatVector();
	const hierarchy = new opencv.Mat();
	try {
		if (scale < 1) opencv.resize(source, resized, new opencv.Size(0, 0), scale, scale, opencv.INTER_AREA);
		else source.copyTo(resized);
		opencv.cvtColor(resized, gray, opencv.COLOR_RGBA2GRAY);
		opencv.GaussianBlur(gray, blurred, new opencv.Size(5, 5), 0, 0, opencv.BORDER_DEFAULT);
		opencv.Canny(blurred, edges, 60, 140);
		opencv.threshold(gray, threshold, 0, 255, opencv.THRESH_BINARY + opencv.THRESH_OTSU);
		opencv.findContours(edges, contours, hierarchy, opencv.RETR_EXTERNAL, opencv.CHAIN_APPROX_SIMPLE);
		const brightness = opencv.mean(gray)[0] ?? 0;
		const edgePixels = opencv.countNonZero(edges);
		const foregroundPixels = opencv.countNonZero(threshold);
		const totalPixels = Math.max(gray.rows * gray.cols, 1);
		const metrics = {
			width: source.cols,
			height: source.rows,
			brightness: Math.round(brightness * 10) / 10,
			edgeDensity: Math.round(edgePixels / totalPixels * 1e3) / 1e3,
			contourCount: contours.size(),
			foregroundRatio: Math.round(foregroundPixels / totalPixels * 1e3) / 1e3
		};
		let edgePreview = "";
		if (includeEdgePreview) {
			const edgeCanvas = document.createElement("canvas");
			edgeCanvas.width = edges.cols;
			edgeCanvas.height = edges.rows;
			opencv.imshow(edgeCanvas, edges);
			edgePreview = edgeCanvas.toDataURL("image/png");
		}
		return {
			...createObservations(metrics),
			metrics,
			edgePreview
		};
	} finally {
		source.delete();
		resized.delete();
		gray.delete();
		blurred.delete();
		edges.delete();
		threshold.delete();
		contours.delete();
		hierarchy.delete();
	}
}
async function analyzeImageWithOpenCv(file) {
	const opencv = await loadOpenCv();
	const imageUrl = URL.createObjectURL(file);
	try {
		const image = await new Promise((resolve, reject) => {
			const element = new Image();
			element.onload = () => resolve(element);
			element.onerror = () => reject(/* @__PURE__ */ new Error("The image could not be decoded for OpenCV analysis."));
			element.src = imageUrl;
		});
		const canvas = document.createElement("canvas");
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;
		canvas.getContext("2d")?.drawImage(image, 0, 0);
		return analyzeCanvas(opencv, canvas, true);
	} finally {
		URL.revokeObjectURL(imageUrl);
	}
}
function waitForVideoEvent(video, eventName) {
	return new Promise((resolve, reject) => {
		const handleEvent = () => {
			cleanup();
			resolve();
		};
		const handleError = () => {
			cleanup();
			reject(/* @__PURE__ */ new Error("The video could not be read by the browser."));
		};
		const cleanup = () => {
			video.removeEventListener(eventName, handleEvent);
			video.removeEventListener("error", handleError);
		};
		video.addEventListener(eventName, handleEvent, { once: true });
		video.addEventListener("error", handleError, { once: true });
	});
}
async function analyzeVideoWithOpenCv(file, onProgress) {
	const opencv = await loadOpenCv();
	const videoUrl = URL.createObjectURL(file);
	const video = document.createElement("video");
	video.preload = "metadata";
	video.muted = true;
	video.src = videoUrl;
	try {
		await waitForVideoEvent(video, "loadedmetadata");
		if (!Number.isFinite(video.duration) || video.duration <= 0) throw new Error("The video duration is unavailable.");
		const total = clamp(Math.ceil(video.duration / 3), 3, 12);
		const canvas = document.createElement("canvas");
		const samples = [];
		const representativeFrames = [];
		for (let index = 0; index < total; index += 1) {
			video.currentTime = Math.min((index + .5) * (video.duration / total), Math.max(video.duration - .05, 0));
			await waitForVideoEvent(video, "seeked");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvas.getContext("2d")?.drawImage(video, 0, 0);
			const sample = analyzeCanvas(opencv, canvas, index === 0);
			samples.push(sample);
			if (index === 0 || index === Math.floor(total / 2) || index === total - 1) representativeFrames.push(canvas.toDataURL("image/jpeg", .78));
			onProgress(index + 1, total);
		}
		const average = (selector) => samples.reduce((sum, sample) => sum + selector(sample), 0) / samples.length;
		const brightnessValues = samples.map((sample) => sample.metrics.brightness);
		const edgeValues = samples.map((sample) => sample.metrics.edgeDensity);
		const averageMetrics = {
			width: samples[0].metrics.width,
			height: samples[0].metrics.height,
			brightness: Math.round(average((sample) => sample.metrics.brightness) * 10) / 10,
			edgeDensity: Math.round(average((sample) => sample.metrics.edgeDensity) * 1e3) / 1e3,
			contourCount: Math.round(average((sample) => sample.metrics.contourCount)),
			foregroundRatio: Math.round(average((sample) => sample.metrics.foregroundRatio) * 1e3) / 1e3
		};
		return {
			...createObservations(averageMetrics),
			metrics: averageMetrics,
			edgePreview: samples[0].edgePreview,
			duration: video.duration,
			sampledFrames: samples.length,
			lightingVariation: Math.round((Math.max(...brightnessValues) - Math.min(...brightnessValues)) * 10) / 10,
			edgeVariation: Math.round((Math.max(...edgeValues) - Math.min(...edgeValues)) * 1e3) / 1e3,
			representativeFrames
		};
	} finally {
		video.pause();
		video.removeAttribute("src");
		video.load();
		URL.revokeObjectURL(videoUrl);
	}
}
var FEATURE_DETAILS = {
	furniture: {
		title: "AI Furniture Recommendation",
		description: "A future workspace for furniture suggestions matched to room dimensions, style and practical needs.",
		icon: Sofa
	},
	color: {
		title: "AI Color Recommendation",
		description: "A future workspace for coordinated wall, furniture and accent colour recommendations.",
		icon: PaintBucket
	},
	budget: {
		title: "AI Budget & Space Planning",
		description: "Plan your interior budget while optimizing furniture placement and available room space.",
		icon: BadgeIndianRupee
	},
	space: {
		title: "AI Space Optimization",
		description: "A future workspace for evaluating room layouts and improving how each part of a space is used.",
		icon: Box
	},
	redesign: {
		title: "AI Room Redesign / Visualization",
		description: "The current room redesign workflow is available in AI Design Studio.",
		icon: WandSparkles
	},
	analysis: {
		title: "OpenCV-Based Room Image/Video Analysis",
		description: "A future workspace for computer-vision-based analysis of room photos and walkthrough videos.",
		icon: ScanLine
	},
	vastu: {
		title: "AI Vastu Recommendation",
		description: "A future workspace for directional and placement guidance for interior planning.",
		icon: Compass
	}
};
function FeatureShell() {
	const { featureId } = useParams({ from: "/features/$featureId" });
	const navigate = useNavigate();
	const feature = FEATURE_DETAILS[featureId];
	if (!feature) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-background px-5 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl",
			children: "Feature not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-5 inline-block text-sm font-semibold text-primary",
			children: "Return home"
		})] })
	});
	const Icon = feature.icon;
	if (featureId === "furniture") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FurnitureWorkspace, {});
	if (featureId === "color") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorWorkspace, {});
	if (featureId === "budget") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetWorkspace, {});
	if (featureId === "analysis") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisionSpaceWorkspace, {});
	if (featureId === "vastu") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuSenseWorkspace, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-5 py-8 text-foreground lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to home"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 border border-border bg-background p-8 shadow-xl sm:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-14 place-items-center rounded-lg bg-accent text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 26 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-xs font-bold uppercase tracking-widest text-primary",
						children: "InteriorAI capability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl leading-tight sm:text-5xl",
						children: feature.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg leading-8 text-muted-foreground",
						children: feature.description
					}),
					featureId === "redesign" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-8",
						onClick: () => navigate({ to: "/studio" }),
						children: "Open AI Design Studio"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 border-l-2 border-primary pl-4 text-sm text-muted-foreground",
						children: "This feature is part of the final SPM scope and is not implemented yet. This page is only the navigation shell for future work."
					})
				]
			})]
		})
	});
}
var VISION_ROOMS = [
	"Living Room",
	"Bedroom",
	"Dining Room",
	"Kitchen",
	"Home Office",
	"Other"
];
var IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp"
];
var VIDEO_TYPES = [
	"video/mp4",
	"video/webm",
	"video/quicktime"
];
function VisionSpaceWorkspace() {
	const fileRef = (0, import_react.useRef)(null);
	const [inputType, setInputType] = (0, import_react.useState)("photo");
	const [roomType, setRoomType] = (0, import_react.useState)(VISION_ROOMS[0]);
	const [file, setFile] = (0, import_react.useState)(null);
	const [previewUrl, setPreviewUrl] = (0, import_react.useState)("");
	const [analysis, setAnalysis] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => () => {
		if (previewUrl) URL.revokeObjectURL(previewUrl);
	}, [previewUrl]);
	function chooseInputType(nextType) {
		setInputType(nextType);
		setFile(null);
		setAnalysis(null);
		setError("");
		setProgress("");
		if (fileRef.current) fileRef.current.value = "";
	}
	function pickFile(nextFile) {
		if (!nextFile) return;
		if (!(inputType === "photo" ? IMAGE_TYPES : VIDEO_TYPES).includes(nextFile.type)) {
			setError(inputType === "photo" ? "Please choose a JPG, PNG, or WebP image." : "Please choose an MP4, WebM, or browser-supported MOV video.");
			return;
		}
		if (nextFile.size > 104857600) {
			setError("Please choose a file under 100 MB.");
			return;
		}
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		setFile(nextFile);
		setPreviewUrl(URL.createObjectURL(nextFile));
		setAnalysis(null);
		setError("");
	}
	async function analyze() {
		if (!file) {
			setError(`Upload a ${inputType === "photo" ? "room photo" : "walkthrough video"} first.`);
			return;
		}
		setBusy(true);
		setError("");
		setAnalysis(null);
		setProgress(inputType === "photo" ? "Loading OpenCV.js..." : "Loading OpenCV.js and preparing video samples...");
		try {
			const result = inputType === "photo" ? await analyzeImageWithOpenCv(file) : await analyzeVideoWithOpenCv(file, (current, total) => setProgress(`Analyzing representative frame ${current} of ${total}...`));
			setAnalysis(result);
			setProgress("");
		} catch (cause) {
			setProgress("");
			setError(cause instanceof Error ? cause.message : "VisionSpace could not analyze this file.");
		} finally {
			setBusy(false);
		}
	}
	const accept = inputType === "photo" ? IMAGE_TYPES.join(",") : VIDEO_TYPES.join(",");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border px-5 py-5 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "VisionSpace AI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to home"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "Computer vision capability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl leading-tight sm:text-5xl",
						children: "VisionSpace AI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-muted-foreground",
						children: "Analyze your room's visible layout, lighting and spatial characteristics with computer vision."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-display",
							children: "Analyze your room"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 rounded-lg bg-muted p-1",
							role: "group",
							"aria-label": "Input type",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => chooseInputType("photo"),
								className: `flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${inputType === "photo" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { size: 16 }), " Room Photo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => chooseInputType("video"),
								className: `flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${inputType === "video" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 16 }), " Walkthrough Video"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-semibold",
								children: inputType === "photo" ? "Room photo" : "Room walkthrough video"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept,
								className: "hidden",
								onChange: (event) => pickFile(event.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary",
								children: [
									previewUrl && inputType === "photo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: previewUrl,
										alt: "Uploaded room preview",
										className: "absolute inset-0 size-full object-cover"
									}),
									previewUrl && inputType === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
										src: previewUrl,
										controls: true,
										muted: true,
										className: "absolute inset-0 size-full object-contain bg-black/5"
									}),
									!previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "space-y-3 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mx-auto grid size-11 place-items-center rounded-full bg-background text-primary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 20 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-sm font-semibold",
												children: ["Upload ", inputType === "photo" ? "a JPG, PNG, or WebP" : "an MP4, WebM, or MOV"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-xs text-muted-foreground",
												children: "Maximum 100 MB"
											})
										]
									})
								]
							}),
							file && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 truncate text-xs text-muted-foreground",
								children: file.name
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-5 text-muted-foreground",
							children: "Computer vision analyzes visible visual features. Exact room dimensions cannot be determined from a normal image or video without a known scale reference."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Room type", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: roomType,
								onChange: (event) => setRoomType(event.target.value),
								className: "mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring",
								children: VISION_ROOMS.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: room }, room))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: analyze,
							disabled: busy,
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "animate-spin",
									size: 16
								}),
								" ",
								progress || "Analyzing room..."
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { size: 16 }), " Analyze my room"] })
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "alert",
							className: "border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive",
							children: error
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8",
					children: [
						!analysis && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { size: 26 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-5 text-2xl",
										children: "VisionSpace Analysis"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-6 text-muted-foreground",
										children: "Upload a photo or representative walkthrough video to measure visible visual features with OpenCV.js."
									})
								]
							})
						}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mx-auto animate-spin text-primary",
									size: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 text-2xl",
									children: "Processing visual features..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: progress
								})
							] })
						}),
						analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisionResults, {
							result: analysis,
							inputType
						})
					]
				})]
			})]
		})]
	});
}
function VisionResults({ result, inputType }) {
	const videoResult = result;
	const metricCards = [
		["Image resolution", `${result.metrics.width} x ${result.metrics.height}`],
		["Brightness score", `${result.metrics.brightness}/255`],
		["Edge density", `${(result.metrics.edgeDensity * 100).toFixed(1)}%`],
		["Detected contours", String(result.metrics.contourCount)],
		["Foreground/background ratio", `${(result.metrics.foregroundRatio * 100).toFixed(1)}% foreground`]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-reveal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "VisionSpace Analysis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl",
						children: "Visible room intelligence"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 14 }), " Analysis quality: Visual estimate"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-3xl text-sm leading-7 text-muted-foreground",
					children: result.summary
				})]
			}),
			inputType === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Video duration",
						value: `${videoResult.duration?.toFixed(1)}s`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Sampled frames",
						value: String(videoResult.sampledFrames)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Lighting variation",
						value: `${videoResult.lightingVariation}/255`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "flex items-center gap-2 text-xl font-display",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
					size: 19,
					className: "text-primary"
				}), " Lighting analysis"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-widest text-primary",
							children: "Brightness level"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-2xl",
							children: result.lighting.level
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-6 text-muted-foreground",
							children: result.lighting.naturalLight
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "Brightness observations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm leading-6 text-muted-foreground",
						children: result.lighting.observations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObservationSection, {
				title: "Spatial / layout observations",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 18 }),
				items: result.spatialObservations
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObservationSection, {
				title: "Room structure",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { size: 18 }),
				items: result.structureObservations
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObservationSection, {
				title: "Visual object observations",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { size: 18 }),
				items: result.objectObservations
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObservationSection, {
				title: "Space optimization suggestions",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { size: 18 }),
				items: result.optimizationSuggestions
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 text-xl font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
						size: 18,
						className: "text-primary"
					}), " Computer-vision metrics"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "These are image-processing measurements, not physical room measurements."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: metricCards.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label,
						value
					}, label))
				})
			] }),
			result.edgePreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 text-xl font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
						size: 18,
						className: "text-primary"
					}), " Edge analysis preview"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Canny edge detection highlights visible boundaries and texture changes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: result.edgePreview,
					alt: "OpenCV edge analysis preview",
					className: "mt-4 max-h-72 w-full rounded-lg border border-border bg-black object-contain"
				})
			] }),
			inputType === "video" && videoResult.representativeFrames && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 text-xl font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlay, {
						size: 18,
						className: "text-primary"
					}), " Representative frames"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: videoResult.representativeFrames.map((frame, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: frame,
						alt: `Representative walkthrough frame ${index + 1}`,
						className: "aspect-video w-full rounded-lg border border-border object-cover"
					}, frame))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "The video was sampled at intervals; every frame was not processed."
				})
			] })
		]
	});
}
function ObservationSection({ title, icon, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
		className: "flex items-center gap-2 text-xl font-display",
		children: [icon, title]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 grid gap-3 sm:grid-cols-2",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "border-l-2 border-primary bg-card px-4 py-3 text-sm leading-6 text-muted-foreground",
			children: item
		}, item))
	})] });
}
function MetricCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xl font-semibold text-primary",
			children: value
		})]
	});
}
var VASTU_ROOMS = [
	"Living Room",
	"Bedroom",
	"Dining Room",
	"Kitchen",
	"Home Office",
	"Study Room",
	"Other"
];
var DIRECTIONS = [
	"North",
	"South",
	"East",
	"West",
	"North-East",
	"North-West",
	"South-East",
	"South-West",
	"I don't know"
];
var WINDOW_DIRECTIONS = [
	"North",
	"South",
	"East",
	"West",
	"Multiple directions",
	"I don't know"
];
function VastuSenseWorkspace() {
	const runGuidance = useServerFn(generateVastuGuidance);
	const fileRef = (0, import_react.useRef)(null);
	const [photo, setPhoto] = (0, import_react.useState)();
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [roomType, setRoomType] = (0, import_react.useState)(VASTU_ROOMS[0]);
	const [roomOrientation, setRoomOrientation] = (0, import_react.useState)("I don't know");
	const [entranceDirection, setEntranceDirection] = (0, import_react.useState)("I don't know");
	const [windowDirection, setWindowDirection] = (0, import_react.useState)("I don't know");
	const [currentFurniture, setCurrentFurniture] = (0, import_react.useState)("");
	const [concerns, setConcerns] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	function pickFile(file) {
		if (!file) return;
		if (![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(file.type)) {
			setError("Please choose a JPG, PNG, or WebP image.");
			return;
		}
		if (file.size > 12582912) {
			setError("Please choose a room photo under 12 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setPhoto(String(reader.result));
			setFileName(file.name);
			setResult(null);
			setError("");
		};
		reader.readAsDataURL(file);
	}
	async function generate() {
		setBusy(true);
		setError("");
		setResult(null);
		try {
			const guidance = await runGuidance({ data: {
				image: photo,
				roomType,
				roomOrientation,
				entranceDirection,
				windowDirection,
				currentFurniture,
				concerns
			} });
			setResult(guidance);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Something went wrong generating VastuSense guidance.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border px-5 py-5 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "VastuSense AI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to home"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "Traditional Vastu guidance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl leading-tight sm:text-5xl",
						children: "VastuSense AI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-muted-foreground",
						children: "Traditional Vastu guidance for thoughtful room planning and furniture placement."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground",
						children: "VastuSense provides traditional Vastu-based guidance for interior planning. Recommendations are cultural/traditional rather than scientifically validated predictions."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-display",
							children: "Tell us about your room"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mb-2 block text-sm font-semibold",
								children: ["Room photo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "(optional)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								className: "hidden",
								onChange: (event) => pickFile(event.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "relative flex min-h-44 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center",
								children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo,
									alt: "Uploaded room preview",
									className: "absolute inset-0 size-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "space-y-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mx-auto grid size-11 place-items-center rounded-full bg-background text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 20 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-semibold",
											children: "Upload a JPG, PNG, or WebP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-muted-foreground",
											children: "Maximum 12 MB"
										})
									]
								})
							}),
							fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 truncate text-xs text-muted-foreground",
								children: fileName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-5 text-muted-foreground",
								children: "The photo provides visual context only and does not determine exact directions or measurements."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuSelect, {
							label: "Room type",
							value: roomType,
							options: VASTU_ROOMS,
							onChange: setRoomType
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuSelect, {
							label: "Room orientation / main direction",
							value: roomOrientation,
							options: DIRECTIONS,
							onChange: setRoomOrientation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuSelect, {
							label: "Main entrance direction",
							value: entranceDirection,
							options: DIRECTIONS,
							onChange: setEntranceDirection
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuSelect, {
							label: "Window direction",
							value: windowDirection,
							options: WINDOW_DIRECTIONS,
							onChange: setWindowDirection
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Current furniture", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: currentFurniture,
								onChange: (event) => setCurrentFurniture(event.target.value),
								placeholder: "Example: Sofa in the west, TV unit opposite the sofa, study table near the window.",
								className: "mt-2 min-h-24 resize-y"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Specific concern/preferences", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: concerns,
								onChange: (event) => setConcerns(event.target.value),
								placeholder: "Example: I want better furniture placement and a calmer bedroom layout.",
								className: "mt-2 min-h-24 resize-y"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: generate,
							disabled: busy,
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "animate-spin",
								size: 16
							}), " Preparing guidance..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { size: 16 }), " Get VastuSense recommendations"] })
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "alert",
							className: "border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive",
							children: error
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8",
					children: [
						!result && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { size: 26 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-5 text-2xl",
										children: "Your VastuSense AI Guidance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-6 text-muted-foreground",
										children: "Share the directions you know and your current layout to receive traditional Vastu guidance grounded in the information you supplied."
									})
								]
							})
						}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mx-auto animate-spin text-primary",
									size: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 text-2xl",
									children: "Preparing traditional guidance..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Gemini is organizing directional and placement suggestions."
								})
							] })
						}),
						result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuResults, { result })
					]
				})]
			})]
		})]
	});
}
function VastuSelect({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm font-semibold",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: "mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring",
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: option }, option))
		})]
	});
}
function VastuResults({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-reveal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "Traditional Vastu guidance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl",
						children: "Your VastuSense AI Guidance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-3xl text-sm leading-7 text-muted-foreground",
						children: result.summary
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuListSection, {
				title: "Directional guidance",
				items: result.directionalGuidance.map((item) => `${item.direction}: ${item.traditionalAssociation} Suggested use: ${item.suggestedUse} Placement: ${item.placementGuidance} Considerations: ${item.considerations}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuCards, {
				title: "Furniture placement",
				items: result.furniturePlacement.map((item) => ({
					title: item.item,
					body: `${item.recommendedPlacement} ${item.reason}`
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuCards, {
				title: "Color guidance",
				items: result.colorGuidance.map((item) => ({
					title: `${item.color} · ${item.area}`,
					body: item.reason
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuListSection, {
				title: "Lighting guidance",
				items: result.lightingGuidance
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuListSection, {
					title: "Traditional Vastu Do's",
					items: result.dos
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuListSection, {
					title: "Traditional Vastu Considerations / Avoid",
					items: result.considerations
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuListSection, {
					title: "High-priority changes",
					items: result.priorityActions.highPriority
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VastuListSection, {
					title: "Optional changes",
					items: result.priorityActions.optional
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "Practical interior note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-7 text-muted-foreground",
						children: result.practicalInteriorNote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Traditional guidance is optional cultural context. Comfort, safety, accessibility and a workable layout should take priority."
					})
				]
			})
		]
	});
}
function VastuListSection({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-xl font-display",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 grid gap-3",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "border-l-2 border-primary bg-card px-4 py-3 text-sm leading-6 text-muted-foreground",
			children: item
		}, item))
	})] });
}
function VastuCards({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-xl font-display",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 grid gap-4 sm:grid-cols-2",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "font-semibold text-primary",
				children: item.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-6 text-muted-foreground",
				children: item.body
			})]
		}, item.title))
	})] });
}
var ROOM_TYPES = [
	"Living Room",
	"Bedroom",
	"Kitchen",
	"Dining Room",
	"Home Office"
];
var STYLES = [
	"Modern Minimal",
	"Scandinavian",
	"Indian Contemporary",
	"Luxury Classic",
	"Boho Warm",
	"Japandi",
	"Industrial"
];
var BUDGETS = [
	"₹50,000",
	"₹1,50,000",
	"₹3,00,000",
	"₹6,00,000",
	"₹10,00,000+"
];
var inr = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;
function FurnitureWorkspace() {
	const runRecommendations = useServerFn(generateFurnitureRecommendations);
	const fileRef = (0, import_react.useRef)(null);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [roomType, setRoomType] = (0, import_react.useState)(ROOM_TYPES[0]);
	const [style, setStyle] = (0, import_react.useState)(STYLES[0]);
	const [budget, setBudget] = (0, import_react.useState)(BUDGETS[1]);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	function pickFile(file) {
		if (!file) return;
		if (!["image/jpeg", "image/png"].includes(file.type)) {
			setError("Please choose a JPG or PNG image.");
			return;
		}
		if (file.size > 12582912) {
			setError("Please choose a room photo under 12 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setPhoto(String(reader.result));
			setFileName(file.name);
			setError("");
			setResult(null);
		};
		reader.readAsDataURL(file);
	}
	async function generate() {
		if (!photo) {
			setError("Upload a photo of your room first.");
			return;
		}
		setBusy(true);
		setError("");
		setResult(null);
		try {
			const recommendation = await runRecommendations({ data: {
				image: photo,
				roomType,
				style,
				budget,
				notes
			} });
			setResult(recommendation);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Something went wrong generating recommendations.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border px-5 py-5 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "FurniSense AI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to home"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "InteriorAI capability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl leading-tight sm:text-5xl",
						children: "Furniture that fits your room and your life."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-muted-foreground",
						children: "Share a room photo and a few preferences. FurniSense AI will suggest practical furniture with approximate INR pricing and placement ideas."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-5 rounded-xl border border-border p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl",
							children: "Tell us about the room"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "The photo guides visual context only; it does not provide exact measurements."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/jpeg,image/png",
							className: "hidden",
							onChange: (event) => pickFile(event.target.files?.[0])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							className: "group relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary",
							children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: photo,
								alt: "Uploaded room preview",
								className: "absolute inset-0 size-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-auto grid size-11 place-items-center rounded-full bg-background text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 20 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-semibold",
										children: "Upload a JPG or PNG"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: "Maximum 12 MB"
									})
								]
							})
						}),
						fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: fileName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Room type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: roomType,
								onValueChange: setRoomType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ROOM_TYPES.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: room,
									children: room
								}, room)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Design style", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: style,
								onValueChange: setStyle,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STYLES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item,
									children: item
								}, item)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Furniture budget", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: budget,
								onValueChange: setBudget,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: BUDGETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item,
									children: item
								}, item)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: [
								"Requirements or preferences ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "(optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: notes,
									onChange: (event) => setNotes(event.target.value),
									placeholder: "For example: need storage for books, prefer rounded edges",
									className: "mt-2 min-h-24 resize-y"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: generate,
							disabled: busy,
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "animate-spin",
								size: 16
							}), " Finding furniture..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }), " Generate recommendations"] })
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "alert",
							className: "border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive",
							children: error
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-h-[520px] rounded-xl border border-border bg-accent/20 p-6 sm:p-8",
					children: [
						!result && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sofa, { size: 26 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-5 text-2xl",
										children: "Your furniture plan will appear here"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-6 text-muted-foreground",
										children: "Upload a room photo and generate a recommendation to see a tailored shortlist, estimated cost, and practical placement suggestions."
									})
								]
							})
						}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mx-auto animate-spin text-primary",
									size: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 text-2xl",
									children: "Reading the room..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Preparing practical furniture suggestions. This can take a moment."
								})
							] })
						}),
						result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationResults, { result })
					]
				})]
			})]
		})]
	});
}
function RecommendationResults({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-widest text-primary",
				children: "FurniSense AI plan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-3xl",
				children: "A considered furniture shortlist"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-primary/30 bg-background px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Estimated total"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xl font-semibold text-primary",
					children: inr(result.estimatedTotal)
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-3xl leading-7 text-muted-foreground",
			children: result.summary
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2",
			children: result.recommendations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border border-border bg-background p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-widest text-primary",
							children: item.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-xl",
							children: item.name
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 text-sm text-muted-foreground",
							children: ["x", item.quantity]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-6 text-muted-foreground",
						children: item.reason
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 border-t border-border pt-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Estimate:"
							}),
							" ",
							inr(item.estimatedPrice * item.quantity)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs leading-5 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Space-saving alternative:"
							}),
							" ",
							item.spaceSavingAlternative
						]
					})
				]
			}, `${item.name}-${item.category}`))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 border-t border-border pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "flex items-center gap-2 text-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					size: 18,
					className: "text-primary"
				}), " Placement suggestions"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: result.placementSuggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-l-2 border-primary pl-3 text-sm leading-6 text-muted-foreground",
					children: suggestion
				}, suggestion))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-xs text-muted-foreground",
			children: "Prices are approximate estimates in INR, not live market prices. Confirm dimensions and fit before purchasing."
		})
	] });
}
var BUDGET_ROOM_TYPES = [
	"Living Room",
	"Bedroom",
	"Dining Room",
	"Kitchen",
	"Home Office",
	"Other"
];
var BUDGET_STYLES = [
	"Modern",
	"Minimalist",
	"Luxury Classic",
	"Scandinavian",
	"Bohemian",
	"Industrial",
	"Contemporary",
	"Traditional"
];
var SPACEWISE_BUDGETS = [
	"₹50,000",
	"₹75,000",
	"₹1,00,000",
	"₹1,50,000",
	"₹2,00,000",
	"₹3,00,000",
	"₹5,00,000"
];
function BudgetWorkspace() {
	const runBudgetPlan = useServerFn(generateBudgetPlan);
	const fileRef = (0, import_react.useRef)(null);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [roomType, setRoomType] = (0, import_react.useState)(BUDGET_ROOM_TYPES[0]);
	const [style, setStyle] = (0, import_react.useState)(BUDGET_STYLES[0]);
	const [budget, setBudget] = (0, import_react.useState)(SPACEWISE_BUDGETS[3]);
	const [requirements, setRequirements] = (0, import_react.useState)("");
	const [spaceConcerns, setSpaceConcerns] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	function pickFile(file) {
		if (!file) return;
		if (![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(file.type)) {
			setError("Please choose a JPG, PNG, or WebP image.");
			return;
		}
		if (file.size > 12582912) {
			setError("Please choose a room photo under 12 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setPhoto(String(reader.result));
			setFileName(file.name);
			setError("");
			setResult(null);
		};
		reader.readAsDataURL(file);
	}
	async function generate() {
		if (!photo) {
			setError("Upload a photo of your room first.");
			return;
		}
		setBusy(true);
		setError("");
		setResult(null);
		try {
			const plan = await runBudgetPlan({ data: {
				image: photo,
				roomType,
				style,
				budget,
				requirements,
				spaceConcerns
			} });
			setResult(plan);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Something went wrong generating your SpaceWise plan.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border px-5 py-5 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeIndianRupee, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "SpaceWise AI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to home"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "InteriorAI capability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl leading-tight sm:text-5xl",
						children: "A smarter plan for every rupee and every corner."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-muted-foreground",
						children: "Share your room context, priorities and budget. SpaceWise AI will shape a practical plan around the visible layout and the way you want to live."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-display",
							children: "Plan your room"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-5 text-muted-foreground",
							children: "The photo guides visual context only; it does not provide exact measurements."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-semibold",
								children: "Room photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								className: "hidden",
								onChange: (event) => pickFile(event.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "group relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary",
								children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo,
									alt: "Uploaded room preview",
									className: "absolute inset-0 size-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "space-y-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mx-auto grid size-11 place-items-center rounded-full bg-background text-primary shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 20 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-semibold",
											children: "Upload a JPG, PNG, or WebP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-muted-foreground",
											children: "Maximum 12 MB"
										})
									]
								})
							}),
							fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 truncate text-xs text-muted-foreground",
								children: fileName
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Room type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: roomType,
								onValueChange: setRoomType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: BUDGET_ROOM_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item,
									children: item
								}, item)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Design style", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: style,
								onValueChange: setStyle,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: BUDGET_STYLES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item,
									children: item
								}, item)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Total interior budget", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: budget,
								onValueChange: setBudget,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SPACEWISE_BUDGETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item,
									children: item
								}, item)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: [
								"Room requirements ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "(optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: requirements,
									onChange: (event) => setRequirements(event.target.value),
									placeholder: "Example: Need a sofa, TV unit, study desk and extra storage.",
									className: "mt-2 min-h-24 resize-y"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: [
								"Space concerns ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "(optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: spaceConcerns,
									onChange: (event) => setSpaceConcerns(event.target.value),
									placeholder: "Example: Keep the walkway open and maximize storage.",
									className: "mt-2 min-h-24 resize-y"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: generate,
							disabled: busy,
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "animate-spin",
								size: 16
							}), " Planning your room..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }), " Create my SpaceWise plan"] })
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "alert",
							className: "border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive",
							children: error
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8",
					children: [
						!result && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBudgetState, {}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mx-auto animate-spin text-primary",
									size: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 text-2xl",
									children: "Building your SpaceWise plan..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Gemini is reading the visible layout and balancing your priorities."
								})
							] })
						}),
						result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetResults, { result })
					]
				})]
			})]
		})]
	});
}
function EmptyBudgetState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[460px] place-items-center text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeIndianRupee, { size: 26 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 text-2xl",
					children: "Your SpaceWise AI Plan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-6 text-muted-foreground",
					children: "Upload a room photo and set your preferences to see a budget-aware furniture plan, layout guidance and ways to save."
				})
			]
		})
	});
}
function BudgetResults({ result }) {
	const overview = result.budgetOverview;
	const allocations = [
		["Furniture", overview.furniture],
		["Storage", overview.storage],
		["Lighting", overview.lighting],
		["Decor", overview.decor],
		["Soft furnishings", overview.softFurnishings],
		["Other", overview.other]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-reveal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "SpaceWise AI plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl",
						children: "Your room, planned with intention"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-3xl text-sm leading-7 text-muted-foreground",
						children: result.summary
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-display",
					children: "Budget overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Approximate INR estimates"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: [
					["Total budget", overview.totalBudget],
					["Estimated furniture cost", overview.furniture],
					["Decor/accessories cost", overview.decor],
					["Lighting cost", overview.lighting],
					["Flooring/soft furnishings cost", overview.softFurnishings],
					["Storage cost", overview.storage],
					["Estimated total", overview.estimatedTotal],
					["Remaining budget", overview.remainingBudget]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-2 text-xl font-semibold ${label === "Remaining budget" && Number(value) < 0 ? "text-destructive" : "text-primary"}`,
						children: inr(Number(value))
					})]
				}, String(label)))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-display",
				children: "Budget allocation"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: allocations.map(([label, value]) => {
					const percent = overview.estimatedTotal ? Math.round(value / overview.estimatedTotal * 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: inr(value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary",
									style: { width: `${Math.min(percent, 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [percent, "% of estimated total"]
							})
						]
					}, label);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-display",
				children: "Recommended furniture"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: result.furnitureRecommendations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-widest text-primary",
								children: item.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-2 text-xl",
								children: item.name
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-sm text-muted-foreground",
								children: ["x", item.quantity]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-6 text-muted-foreground",
							children: item.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 border-t border-border pt-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Estimated price:"
								}),
								" ",
								inr(item.estimatedPrice * item.quantity)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs leading-5 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "Space-saving alternative:"
								}),
								" ",
								item.spaceSavingAlternative
							]
						})
					]
				}, `${item.name}-${item.category}`))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultList, {
				title: "Space optimization",
				items: result.spaceOptimization,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultList, {
				title: "Suggested layout",
				items: result.layoutPlan,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultList, {
				title: "Money-saving suggestions",
				items: result.moneySavingSuggestions,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-display",
				children: "Priority list"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityColumn, {
						title: "Essential",
						items: result.priorityList.essential
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityColumn, {
						title: "Recommended",
						items: result.priorityList.recommended
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityColumn, {
						title: "Optional",
						items: result.priorityList.optional
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "Final planning note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-7 text-muted-foreground",
						children: result.finalNote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Prices are approximate estimates, not live market prices. Confirm fit, clearances and final quotations before purchasing."
					})
				]
			})
		]
	});
}
function ResultList({ title, items, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
		className: "flex items-center gap-2 text-xl font-display text-foreground",
		children: [icon, title]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 grid gap-3 sm:grid-cols-2",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "border-l-2 border-primary bg-card px-4 py-3 text-sm leading-6 text-muted-foreground",
			children: item
		}, item))
	})] });
}
function PriorityColumn({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "font-semibold text-primary",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-2 text-sm leading-6 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					size: 16,
					className: "mt-1 shrink-0 text-primary"
				}), item]
			}, item))
		})]
	});
}
var COLOR_ROOM_TYPES = [
	"Living Room",
	"Bedroom",
	"Dining Room",
	"Kitchen",
	"Home Office",
	"Other"
];
var COLOR_STYLES = [
	"Modern",
	"Minimalist",
	"Luxury Classic",
	"Scandinavian",
	"Bohemian",
	"Industrial",
	"Contemporary",
	"Traditional"
];
var COLOR_MOODS = [
	"Warm & Cozy",
	"Calm & Relaxing",
	"Fresh & Natural",
	"Elegant & Luxurious",
	"Bright & Energetic",
	"Neutral & Minimal"
];
var LIGHTING_LEVELS = [
	"Low",
	"Medium",
	"High"
];
function ColorWorkspace() {
	const runColorRecommendations = useServerFn(generateColorRecommendations);
	const fileRef = (0, import_react.useRef)(null);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [roomType, setRoomType] = (0, import_react.useState)(COLOR_ROOM_TYPES[0]);
	const [style, setStyle] = (0, import_react.useState)(COLOR_STYLES[0]);
	const [colorMood, setColorMood] = (0, import_react.useState)(COLOR_MOODS[0]);
	const [naturalLighting, setNaturalLighting] = (0, import_react.useState)(LIGHTING_LEVELS[1]);
	const [preferences, setPreferences] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	function pickFile(file) {
		if (!file) return;
		if (![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(file.type)) {
			setError("Please choose a JPG, PNG, or WebP image.");
			return;
		}
		if (file.size > 12582912) {
			setError("Please choose a room photo under 12 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setPhoto(String(reader.result));
			setFileName(file.name);
			setError("");
			setResult(null);
		};
		reader.readAsDataURL(file);
	}
	async function generate() {
		if (!photo) {
			setError("Upload a photo of your room first.");
			return;
		}
		setBusy(true);
		setError("");
		setResult(null);
		try {
			const recommendation = await runColorRecommendations({ data: {
				image: photo,
				roomType,
				style,
				colorMood,
				naturalLighting,
				preferences
			} });
			setResult(recommendation);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Something went wrong generating color recommendations.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border px-5 py-5 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintBucket, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "Chromatica AI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to home"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "InteriorAI capability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl leading-tight sm:text-5xl",
						children: "Color harmony calibrated to your space."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-muted-foreground",
						children: "Upload your room photo and define your preferences. Chromatica AI analyzes the visual architecture, existing furniture, flooring, and lighting to compose a cohesive, professional interior color scheme."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-display",
							children: "Tell us about the room"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "The photo guides visual context only; it does not provide exact measurements."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold mb-2",
								children: "Room photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								className: "hidden",
								onChange: (event) => pickFile(event.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "group relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary",
								children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo,
									alt: "Uploaded room preview",
									className: "absolute inset-0 size-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "space-y-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mx-auto grid size-11 place-items-center rounded-full bg-background text-primary shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 20 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-semibold",
											children: "Upload a JPG, PNG, or WebP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-muted-foreground",
											children: "Maximum 12 MB"
										})
									]
								})
							}),
							fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 truncate text-xs text-muted-foreground",
								children: fileName
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Room type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: roomType,
								onValueChange: setRoomType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COLOR_ROOM_TYPES.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: room,
									children: room
								}, room)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Design style", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: style,
								onValueChange: setStyle,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COLOR_STYLES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item,
									children: item
								}, item)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Color mood / preference", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: colorMood,
								onValueChange: setColorMood,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COLOR_MOODS.map((mood) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: mood,
									children: mood
								}, mood)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: ["Natural lighting", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: naturalLighting,
								onValueChange: setNaturalLighting,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LIGHTING_LEVELS.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: level,
									children: level
								}, level)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold",
							children: [
								"Existing colors or preferences ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "(optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: preferences,
									onChange: (event) => setPreferences(event.target.value),
									placeholder: "Example: Keep the brown wooden furniture and avoid very bright colors.",
									className: "mt-2 min-h-24 resize-y text-sm"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full font-medium",
							size: "lg",
							onClick: generate,
							disabled: busy,
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "animate-spin",
								size: 16
							}), " Analyzing room colors..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }), " Generate color recommendations"] })
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "alert",
							className: "border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive rounded-lg",
							children: error
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8",
					children: [
						!result && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid size-16 place-items-center rounded-2xl bg-background text-primary shadow-sm border border-border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { size: 30 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-6 text-2xl font-display",
										children: "Your color palette will appear here"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-sm leading-6 text-muted-foreground",
										children: [
											"Upload a room photo, pick your preferred design style, mood, and lighting level, and click",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: "“Generate color recommendations”"
											}),
											" to receive an AI-curated palette with hex codes, material harmony, and lighting guidance."
										]
									})
								]
							})
						}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-[460px] place-items-center text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative mx-auto size-16",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-primary size-16" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-6 text-2xl font-display",
										children: "Crafting your color palette..."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground leading-6",
										children: "Chromatica AI is analyzing the lighting, architectural lines, and visible materials to recommend a coordinated palette."
									})
								]
							})
						}),
						result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorResults, { result })
					]
				})]
			})]
		})]
	});
}
function ColorResults({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-reveal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " Chromatica AI Engine"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl font-display",
						children: "Your Chromatica AI Palette"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), " Palette Generated"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-3xl text-sm sm:text-base leading-7 text-muted-foreground",
					children: result.summary
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-xl font-display flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
						size: 20,
						className: "text-primary"
					}), " Coordinated Paint Scheme"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground font-medium hidden sm:inline",
					children: "60-30-10 Interior Rule"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorSwatchCard, {
						role: "Primary Wall Color",
						ratio: "~60% Dominant",
						color: result.primaryWallColor,
						isPrimary: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorSwatchCard, {
						role: "Secondary Wall / Supporting",
						ratio: "~30% Secondary",
						color: result.secondaryColor
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorSwatchCard, {
						role: "Accent Color",
						ratio: "~10% Focal Accent",
						color: result.accentColor
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-xl font-display flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Armchair, {
						size: 20,
						className: "text-primary"
					}), " Furnishings & Architectural Finishes"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationCard, {
							icon: Armchair,
							title: "Furniture Color & Material",
							recommendation: result.furnitureColor.recommendation,
							reason: result.furnitureColor.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationCard, {
							icon: Layers,
							title: "Curtains & Soft Furnishings",
							recommendation: result.softFurnishingColor.recommendation,
							reason: result.softFurnishingColor.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationCard, {
							icon: TreePine,
							title: "Flooring & Wood Tone",
							recommendation: result.flooringTone.recommendation,
							reason: result.flooringTone.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationCard, {
							icon: Lightbulb,
							title: "Lighting & Color Temperature",
							recommendation: result.lighting.recommendation,
							reason: result.lighting.reason
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 text-primary mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold text-foreground text-sm uppercase tracking-wide",
							children: "Color Harmony"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-6 text-muted-foreground",
						children: result.colorHarmony
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 text-primary mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold text-foreground text-sm uppercase tracking-wide",
							children: "Color Psychology & Mood"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-6 text-muted-foreground",
						children: result.colorPsychology
					})]
				})]
			}),
			result.alternativePalettes && result.alternativePalettes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-xl font-display flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
							size: 20,
							className: "text-primary"
						}), " Alternative Palettes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Explore secondary directions tailored for varied aesthetic preferences."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: result.alternativePalettes.map((altPalette, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlternativePaletteCard, {
						palette: altPalette,
						index: idx + 1
					}, `${altPalette.name}-${idx}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t border-border pt-4 text-xs text-muted-foreground",
				children: "Color swatches and HEX codes are architectural design approximations. Paint appearance varies under specific natural daylight and artificial lighting conditions; test with real sample pots before final application."
			})
		]
	});
}
function ColorSwatchCard({ role, ratio, color, isPrimary = false }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	function copyHex() {
		if (!color.hex) return;
		navigator.clipboard.writeText(color.hex);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	}
	const formattedHex = color.hex.startsWith("#") ? color.hex : `#${color.hex}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: `relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-4 transition shadow-sm ${isPrimary ? "border-primary/50 ring-1 ring-primary/20" : "border-border"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full rounded-lg border border-black/10 shadow-inner transition-transform group",
			style: {
				backgroundColor: formattedHex,
				height: isPrimary ? "120px" : "96px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-2 left-2 rounded-md bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm",
				children: ratio
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: copyHex,
				className: "absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/80 transition",
				title: "Copy HEX code",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 12,
					className: "text-emerald-400"
				}), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 12 }),
					" ",
					formattedHex
				] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold uppercase tracking-wider text-primary",
					children: role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-lg font-semibold truncate",
						title: color.name,
						children: color.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "text-xs font-mono font-medium text-muted-foreground shrink-0",
						children: formattedHex
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-5 text-muted-foreground",
					children: color.reason
				})
			]
		})] })
	});
}
function RecommendationCard({ icon: Icon, title, recommendation, reason }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-card p-5 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 text-primary mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-8 place-items-center rounded-lg bg-accent text-primary shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-semibold text-foreground text-sm",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base font-medium text-foreground",
				children: recommendation
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-5 text-muted-foreground border-t border-border/60 pt-2.5",
				children: reason
			})
		]
	});
}
function AlternativePaletteCard({ palette, index }) {
	const [copiedHex, setCopiedHex] = (0, import_react.useState)(null);
	function copyHex(hex) {
		navigator.clipboard.writeText(hex);
		setCopiedHex(hex);
		setTimeout(() => setCopiedHex(null), 2e3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-5 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-semibold text-base font-display",
					children: palette.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded",
					children: ["Option ", index]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground leading-5 mb-4",
				children: palette.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 sm:grid-cols-4 gap-2",
				children: palette.colors.map((c, i) => {
					const hex = c.hex.startsWith("#") ? c.hex : `#${c.hex}`;
					const isCopied = copiedHex === hex;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => copyHex(hex),
						className: "group flex flex-col text-left focus:outline-none",
						title: `Click to copy ${c.name} (${hex})`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-full rounded-md border border-black/10 shadow-inner group-hover:scale-[1.03] transition-transform relative flex items-center justify-center",
								style: { backgroundColor: hex },
								children: isCopied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm",
									children: "Copied"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-[11px] font-medium truncate w-full",
								title: c.name,
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono text-muted-foreground",
								children: hex
							})
						]
					}, `${c.name}-${i}`);
				})
			})
		]
	});
}
//#endregion
export { FeatureShell as component };
