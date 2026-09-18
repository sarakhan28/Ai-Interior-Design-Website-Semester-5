import { a as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DyiJRwCz.mjs";
import { K as ArrowLeft, O as Download, a as Upload, r as WandSparkles, u as Sparkles, v as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-D6ol_ISH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STYLES = [
	"Modern",
	"Minimalist",
	"Luxury Classic",
	"Scandinavian",
	"Bohemian",
	"Industrial",
	"Contemporary",
	"Traditional"
];
var ROOMS = [
	"Living Room",
	"Bedroom",
	"Dining Room",
	"Kitchen",
	"Home Office",
	"Other"
];
var BUDGETS = [
	"₹50,000",
	"₹1,00,000",
	"₹1,50,000",
	"₹2,00,000",
	"₹3,00,000",
	"₹5,00,000"
];
function StudioPage() {
	const fileRef = (0, import_react.useRef)(null);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [style, setStyle] = (0, import_react.useState)(STYLES[0]);
	const [roomType, setRoomType] = (0, import_react.useState)(ROOMS[0]);
	const [budget, setBudget] = (0, import_react.useState)(BUDGETS[1]);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [render, setRender] = (0, import_react.useState)(null);
	const [designSummary, setDesignSummary] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("");
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
			setError("Please choose a photo under 12 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setPhoto(String(reader.result));
			setFileName(file.name);
			setError("");
			setRender(null);
			setDesignSummary("");
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
		setRender(null);
		setDesignSummary("");
		setStatus("Analysing your room and rendering the new design...");
		try {
			const response = await fetch("/api/redesign", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					image: photo,
					style,
					roomType,
					budget,
					notes
				})
			});
			if (!response.ok) throw new Error(await response.text().catch(() => "") || `Redesign failed (${response.status})`);
			const result = await response.json();
			if (!result.image) throw new Error("AI service returned no redesigned image.");
			setRender(result.image);
			setDesignSummary(result.summary || "A new direction has been created from the visible room layout and your preferences.");
			setStatus("Design ready");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong generating your design.");
			setStatus("");
		} finally {
			setBusy(false);
		}
	}
	function startOver() {
		setPhoto(null);
		setFileName("");
		setRender(null);
		setDesignSummary("");
		setStatus("");
		setError("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-background/95 px-5 py-5 lg:px-8",
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
						children: "InteriorAI Studio"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to home"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl",
						children: "Reimagine AI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Visualize your room in a new style before you commit."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => pickFile(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => fileRef.current?.click(),
						className: "grid min-h-40 w-full place-items-center overflow-hidden rounded-lg border border-dashed border-primary bg-leaf p-4 text-center",
						children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo,
							alt: "Your uploaded room",
							className: "max-h-56 w-full object-contain"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto mb-3 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block",
								children: "Choose a room photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "mt-1 block text-muted-foreground",
								children: "JPG, PNG or WebP · up to 12 MB"
							})
						] })
					}),
					fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: fileName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-5 text-muted-foreground",
						children: "The photo guides visual context only; exact room dimensions are not inferred."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Room type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: roomType,
							onChange: setRoomType,
							options: ROOMS
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Design style",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: style,
							onChange: setStyle,
							options: STYLES
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Budget",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: budget,
							onChange: setBudget,
							options: BUDGETS
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Redesign preferences (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							rows: 3,
							placeholder: "Use warm lighting, add a reading chair, keep the wooden flooring and make the room feel more spacious.",
							className: "w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full",
						onClick: generate,
						disabled: busy,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "animate-spin",
							size: 17
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { size: 17 }), busy ? "Reimagining..." : "Reimagine my room"]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: error
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 border-b border-border px-5 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "Your AI Room Redesign"
							}), status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid min-h-80 place-items-center bg-muted/40",
							children: render ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: render,
								alt: `AI redesigned ${roomType.toLowerCase()} in ${style} style`,
								className: "w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-10 text-center text-sm text-muted-foreground",
								children: busy ? "Your render is being generated — this usually takes under a minute." : "Your generated room will appear here."
							})
						}),
						render && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: render,
										download: `reimagine-${roomType.toLowerCase().replaceAll(" ", "-")}.png`,
										className: "inline-flex items-center gap-2 text-sm font-semibold text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Download render"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: generate,
										disabled: busy,
										children: "Generate another design"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: startOver,
										disabled: busy,
										children: "Start over"
									})
								]
							})
						})
					]
				}), designSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 rounded-xl border border-border p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-widest text-primary",
							children: "Reimagine AI summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-2xl",
							children: "A new direction for your room"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-7 text-muted-foreground",
							children: designSummary
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent px-3 py-1.5",
								children: roomType
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent px-3 py-1.5",
								children: style
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-accent px-3 py-1.5",
								children: ["Budget ", budget]
							}),
							notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent px-3 py-1.5",
								children: "Preferences included"
							})
						]
					})]
				})]
			})]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm font-medium",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block",
			children: label
		}), children]
	});
}
function Select({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
	});
}
//#endregion
export { StudioPage as component };
