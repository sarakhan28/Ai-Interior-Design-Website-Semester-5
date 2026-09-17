import { i as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DyiJRwCz.mjs";
import { A as Compass, D as Eye, F as ChevronLeft, G as ArrowRight, H as BadgeIndianRupee, L as Check, O as Download, P as ChevronRight, S as Instagram, T as Grid2x2, U as ArrowUp, W as ArrowUpRight, _ as Menu, a as Upload, d as Sofa, f as ScanLine, g as PaintBucket, h as Palette, j as CirclePlay, l as Star, m as Play, n as X, o as Twitter, p as Quote, r as WandSparkles, t as Zap, u as Sparkles, v as LoaderCircle, w as Heart, y as Linkedin } from "../_libs/lucide-react.mjs";
import { n as getFriendlyAuthErrorMessage, r as useAuth } from "./auth-context-HLjDwMnT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DKq59WAn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_empty_room_default = "/assets/hero-empty-room-X5IC5XPr.jpg";
var hero_designed_room_default = "/assets/hero-designed-room-Cy-70GGW.jpg";
var ai_bedroom_default = "/assets/ai-bedroom-fkpv99B9.jpg";
var cost_bedroom_default = "/assets/cost-bedroom-BXGUsXBC.jpg";
var GALLERY = [
	{
		tag: "Living room · Mumbai",
		title: "From bare walls to warm calm",
		text: "Layered lighting, a low travertine table and a jute rug turned an echoing shell into a lounge.",
		before: hero_empty_room_default,
		after: hero_designed_room_default
	},
	{
		tag: "Kitchen · Pune",
		title: "A kitchen that finally breathes",
		text: "Fluted oak fronts, stone counters and warm task lighting, all sourced within budget.",
		before: "/assets/gallery-kitchen-before-DYH8XdWa.jpg",
		after: "/assets/gallery-kitchen-after-CmXuxw_v.jpg"
	},
	{
		tag: "Bedroom · Bengaluru",
		title: "Dark drama, soft landing",
		text: "Moody panelling balanced with linen, brass accents and a Vastu-correct bed placement.",
		before: cost_bedroom_default,
		after: ai_bedroom_default
	}
];
var MARQUEE = [
	"Furniture recommendations",
	"AI colour guidance",
	"Budget planning",
	"Space optimization",
	"Room visualization",
	"OpenCV room analysis",
	"Vastu recommendations"
];
var REVIEWS = [
	{
		name: "Priya Sharma",
		role: "Homeowner, Mumbai",
		text: "I redesigned my entire 2BHK in under a day. The AI suggestions were shockingly accurate — it even accounted for the direction of sunlight. Worth every rupee."
	},
	{
		name: "Ananya Reddy",
		role: "Interior Blogger, Bengaluru",
		text: "As someone who writes about interior design professionally, I was skeptical. But the 3D renders are indistinguishable from studio work. The Vastu analysis saved me from a costly layout mistake."
	},
	{
		name: "Kavitha Nair",
		role: "Architect, Chennai",
		text: "I now use this with every client for initial mood-boarding. The shopping list generator alone saves me 6–8 hours per project. The AI genuinely understands spatial harmony."
	}
];
var FOOTER = [
	{
		title: "Company",
		links: [
			"About us",
			"Careers",
			"Press",
			"Blog",
			"Contact"
		]
	},
	{
		title: "Features",
		links: [
			"Furniture recommendation",
			"Color recommendation",
			"Budget estimator",
			"Space optimization",
			"Room redesign",
			"Image/video analysis",
			"Vastu recommendation"
		]
	},
	{
		title: "Resources",
		links: [
			"Help center",
			"Documentation",
			"Community",
			"Status page"
		]
	}
];
var features = [
	[
		Sofa,
		"AI Furniture Recommendation",
		"Get furniture suggestions matched to your room dimensions, design style, budget and practical needs.",
		"furniture"
	],
	[
		PaintBucket,
		"AI Color Recommendation",
		"Get personalized wall, furniture and accent color recommendations based on your room, style and preferences.",
		"color"
	],
	[
		BadgeIndianRupee,
		"AI Budget & Space Planning",
		"Plan your interior budget while optimizing furniture placement and available room space.",
		"budget",
		"Budget Estimator · Space Optimization"
	],
	[
		WandSparkles,
		"AI Room Redesign / Visualization",
		"Generate a visual redesign of your room and explore possible changes before making physical changes.",
		"redesign"
	],
	[
		ScanLine,
		"AI Room Analysis",
		"Analyze room images and walkthrough videos using computer-vision techniques to extract useful spatial information.",
		"analysis"
	],
	[
		Compass,
		"AI Vastu Recommendation",
		"Receive Vastu-based room planning recommendations using room orientation and spatial information.",
		"vastu"
	]
];
var steps = [
	[
		Upload,
		"Upload your room",
		"Share a 30-second walkthrough or a few clear photos from any device."
	],
	[
		ScanLine,
		"AI maps the space",
		"Vision AI identifies walls, openings, furniture and room dimensions."
	],
	[
		Palette,
		"Set your style",
		"Choose your aesthetic, colours, needs and a comfortable budget range."
	],
	[
		WandSparkles,
		"Generate concepts",
		"Receive multiple complete room directions tailored uniquely to you."
	],
	[
		Eye,
		"Refine in 3D",
		"Swap materials and furniture while previewing every change photorealistically."
	],
	[
		Download,
		"Download your plan",
		"Export renders, cost breakdown, layout and a shoppable product list."
	]
];
function HomePage() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [compare, setCompare] = (0, import_react.useState)(53);
	const [annual, setAnnual] = (0, import_react.useState)(false);
	const [modal, setModal] = (0, import_react.useState)(null);
	const [story, setStory] = (0, import_react.useState)(0);
	const uploadRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const openFeature = (featureId = "redesign") => {
		if (user) navigate({
			to: "/features/$featureId",
			params: { featureId }
		});
		else setModal("register");
	};
	const scrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setMenuOpen(false);
	};
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				entry.target.dataset["shown"] = "true";
				observer.unobserve(entry.target);
			}
		}, { threshold: .15 });
		document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:flex lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => scrollTo("top"),
							className: "flex min-w-0 items-center gap-3 text-left",
							"aria-label": "Go to top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 shrink-0 place-items-center rounded-lg bg-foreground text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-display text-xl",
								children: "InteriorAI Studio"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-auto hidden items-center gap-8 lg:flex",
							"aria-label": "Main navigation",
							children: [
								"Features",
								"How it works",
								"Pricing",
								"Stories"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo(item.toLowerCase().replaceAll(" ", "-")),
								className: "text-sm text-muted-foreground transition-colors hover:text-primary",
								children: item
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-5 hidden items-center gap-3 lg:flex",
							children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-[170px] truncate text-xs font-semibold text-muted-foreground",
								title: user.email || "",
								children: user.displayName || user.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => logout(),
								children: "Log out"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setModal("login"),
								children: "Log in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setModal("register"),
								children: "Start free"
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMenuOpen(!menuOpen),
							className: "grid size-11 place-items-center rounded-lg border border-border lg:hidden",
							"aria-label": "Toggle menu",
							children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						})
					]
				}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border bg-background px-5 py-5 lg:hidden",
					children: [[
						"Features",
						"How it works",
						"Pricing",
						"Stories"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => scrollTo(item.toLowerCase().replaceAll(" ", "-")),
						className: "block w-full border-b border-border py-3 text-left",
						children: item
					}, item)), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "max-w-[200px] truncate text-xs font-medium text-muted-foreground",
							children: user.displayName || user.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								logout();
								setMenuOpen(false);
							},
							children: "Log out"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "w-full",
							onClick: () => {
								setModal("login");
								setMenuOpen(false);
							},
							children: "Log in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: () => {
								setModal("register");
								setMenuOpen(false);
							},
							children: "Start free"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "top",
				className: "relative bg-leaf",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-30",
					style: {
						backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
						backgroundSize: "24px 24px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-reveal",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/65 px-4 py-2 text-xs font-semibold uppercase text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " AI-powered interior design"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "max-w-2xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl",
								children: ["Transform your home with ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "interior intelligence"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-lg leading-8 text-muted-foreground",
								children: "Upload your room and receive bespoke layouts, photorealistic 3D renders, budget estimates and a shoppable plan—in minutes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-14 px-7 text-base",
									onClick: () => navigate({ to: "/studio" }),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 }),
										" Design my room ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "h-14 bg-background/50 px-7 text-base",
									onClick: () => scrollTo("how-it-works"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { size: 19 }), " See how it works"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap items-center gap-5 border-t border-primary/15 pt-6 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex -space-x-2",
										children: [
											"A",
											"N",
											"R"
										].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-9 place-items-center rounded-full border-2 border-leaf bg-warm font-semibold text-foreground",
											style: { zIndex: 3 - i },
											children: v
										}, v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "10,000+ rooms designed" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											size: 16,
											fill: "currentColor",
											className: "text-warm"
										}), " 4.9/5"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative animate-reveal [animation-delay:150ms]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-foreground/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-11 items-center gap-2 border-b border-border px-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-3 rounded-full bg-destructive" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-3 rounded-full bg-warm" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-3 rounded-full bg-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-3 text-xs text-muted-foreground",
											children: "interior-ai.studio / your-room"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-[4/3] overflow-hidden select-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: hero_designed_room_default,
											alt: "AI designed living room",
											width: 1408,
											height: 1056,
											className: "absolute inset-0 h-full w-full object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-y-0 left-0 overflow-hidden",
											style: { width: `${compare}%` },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: hero_empty_room_default,
												alt: "Empty living room before redesign",
												width: 1408,
												height: 1056,
												className: "h-full max-w-none object-cover",
												style: { width: "min(56vw, 704px)" }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-y-0 w-0.5 bg-background",
											style: { left: `${compare}%` },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foreground text-primary-foreground shadow-xl",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
													className: "-ml-2",
													size: 15
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"aria-label": "Compare before and after",
											type: "range",
											min: "15",
											max: "85",
											value: compare,
											onChange: (e) => setCompare(Number(e.target.value)),
											className: "absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute bottom-4 left-4 rounded-md bg-foreground/75 px-3 py-1.5 text-xs font-semibold text-primary-foreground",
											children: "Before"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute bottom-4 right-4 rounded-md bg-background/85 px-3 py-1.5 text-xs font-semibold",
											children: "AI designed"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -right-3 -top-6 animate-float rounded-xl border border-border bg-background p-4 shadow-xl sm:right-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Concepts ready"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-display text-xl text-primary",
									children: "12 designs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -bottom-7 left-5 rounded-xl bg-foreground p-4 text-primary-foreground shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs opacity-70",
									children: "Generated in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-display text-xl",
									children: "2 min 48 sec"
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "features",
				className: "px-5 py-24 lg:px-8 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Powerful features",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Everything you need to design",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:block" }),
						" the perfect room"
					] }),
					text: "Six intelligent modules work together—from spatial planning to one-click shopping."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3",
					children: features.map(([Icon, title, text, featureId, capabilities], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mb-7 grid size-12 place-items-center rounded-lg ${i % 2 ? "bg-accent text-primary" : "bg-muted text-ink-soft"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 22 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl",
								children: String(title)
							}),
							capabilities && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold text-primary",
								children: capabilities
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `${capabilities ? "mt-2" : "mt-3"} leading-7 text-muted-foreground`,
								children: String(text)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openFeature(featureId),
								className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary",
								children: ["Explore feature ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
							})
						]
					}, String(title)))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "how-it-works",
				className: "bg-leaf px-5 py-24 lg:px-8 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Ready in minutes",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "From empty room to dream home" }),
					text: "A complete six-step workflow built to make professional interior design effortless."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-14 grid max-w-7xl gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3",
					children: steps.map(([Icon, title, text], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "relative bg-background p-7 lg:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-8 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "grid size-12 place-items-center rounded-full border border-primary/25 bg-leaf font-display text-primary",
									children: ["0", i + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 21,
									className: "text-ink-soft"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl",
								children: String(title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-7 text-muted-foreground",
								children: String(text)
							}),
							i < 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "absolute -right-3 top-12 z-10 hidden rounded-full bg-primary p-1 text-primary-foreground lg:block",
								size: 24
							})
						]
					}, String(title)))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-5 py-24 lg:px-8 lg:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cost_bedroom_default,
							alt: "Premium dark bedroom interior",
							loading: "lazy",
							width: 1408,
							height: 1008,
							className: "aspect-[4/3] w-full rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-5 left-5 rounded-lg bg-background p-4 shadow-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "AI design score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl",
								children: ["98 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "text-base",
									children: "/ 100"
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "Cost efficiency" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-7 text-4xl leading-tight sm:text-5xl",
							children: "Beautiful spaces, without the designer markup"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-lg leading-8 text-muted-foreground",
							children: "Build confidently with itemized estimates, intelligent alternatives and layouts that make every square foot work harder."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-4",
							children: [
								"Save up to 60% on design costs",
								"Instant recommendations within your budget",
								"Material quantities and labour estimates"
							].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-8 place-items-center rounded-md bg-accent text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 })
								}), x]
							}, x))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-9",
							onClick: () => navigate({ to: "/studio" }),
							children: ["Build my room plan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-muted/40 px-5 py-24 lg:px-8 lg:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:pr-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "Smart personalization" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-7 text-4xl leading-tight sm:text-5xl",
								children: ["Every design is ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "uniquely yours"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-lg leading-8 text-muted-foreground",
								children: "Your studio learns what you love, how you live and what you want to spend. No generic templates—just rooms that feel unmistakably yours."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-4 sm:grid-cols-2",
								children: [
									"20+ curated styles",
									"Budget-aware sourcing",
									"Eco-friendly options",
									"Instant refinements"
								].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 border-b border-border pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										size: 18,
										className: "text-primary"
									}), x]
								}, x))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ai_bedroom_default,
							alt: "Warm AI-designed bedroom",
							loading: "lazy",
							width: 1408,
							height: 1008,
							className: "aspect-[4/3] w-full rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-6 right-5 rounded-xl border border-border bg-background p-5 shadow-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 text-warm",
								children: [
									1,
									2,
									3,
									4,
									5
								].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									size: 16,
									fill: "currentColor"
								}, x))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-semibold",
								children: "Matched to your taste"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-leaf px-5 py-16 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4",
					children: [
						[
							Grid2x2,
							"10,000+",
							"Rooms designed"
						],
						[
							Heart,
							"95%",
							"Customer delight"
						],
						[
							Zap,
							"3 min",
							"Average generation"
						],
						[
							BadgeIndianRupee,
							"₹2 Cr+",
							"Saved by customers"
						]
					].map(([Icon, n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background px-5 py-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto mb-4 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl sm:text-4xl",
								children: String(n)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: String(l)
							})
						]
					}, String(l)))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "stories",
				className: "px-5 py-24 lg:px-8 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Real transformations",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Loved by rooms—and their owners" }),
					text: "From first homes to forever homes, see what happens when imagination meets intelligence."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-14 max-w-4xl border-y border-border py-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
							className: "mx-auto text-primary",
							size: 34
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mx-auto mt-6 max-w-3xl font-display text-3xl leading-snug sm:text-4xl",
							children: [
								"“",
								[
									"I could see the whole room before buying a single thing. The final result feels considered, calm and completely us.",
									"We tested five layouts in one evening. It saved weeks of indecision and kept our renovation exactly on budget.",
									"The shopping list was the game changer—every piece worked together and fit the measurements perfectly."
								][story],
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm font-semibold",
							children: [
								"Meera & Aarav · Bengaluru",
								"Riya Shah · Mumbai",
								"Kabir Mehta · Pune"
							][story]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								"aria-label": "Previous story",
								onClick: () => setStory((story + 2) % 3),
								className: "size-11 p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								"aria-label": "Next story",
								onClick: () => setStory((story + 1) % 3),
								className: "size-11 p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "pricing",
				className: "bg-leaf px-5 py-24 lg:px-8 lg:py-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						eyebrow: "Transparent pricing",
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Simple, honest pricing" }),
						text: "No hidden fees. Explore for free, upgrade when you're ready to bring a room to life."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center justify-center gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: !annual ? "font-bold" : "text-muted-foreground",
								children: "Monthly"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Toggle annual pricing",
								onClick: () => setAnnual(!annual),
								className: `relative h-7 w-12 rounded-full transition-colors ${annual ? "bg-primary" : "bg-border"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-1 size-5 rounded-full bg-background transition-all ${annual ? "left-6" : "left-1"}` })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: annual ? "font-bold" : "text-muted-foreground",
								children: ["Annual ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "ml-1 rounded bg-accent px-2 py-1 text-xs text-primary",
									children: "Save 20%"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCard, {
								name: "Starter",
								price: "₹0",
								note: "Explore your first room",
								features: [
									"2 AI concepts",
									"Standard 3D renders",
									"Basic shopping list"
								],
								onClick: openFeature
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCard, {
								featured: true,
								name: "Professional",
								price: annual ? "₹799" : "₹999",
								note: "For complete room projects",
								features: [
									"Unlimited room projects",
									"12 concepts per room",
									"4K renders & walkthrough",
									"Detailed budget & shopping list"
								],
								onClick: openFeature
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCard, {
								name: "Studio",
								price: "Custom",
								note: "For design teams",
								features: [
									"Everything in Professional",
									"Team workspaces",
									"Brand-ready exports",
									"Priority support"
								],
								onClick: openFeature
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "gallery",
				className: "px-5 py-24 lg:px-8 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scroll-reveal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						eyebrow: "Hover to transform",
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Rooms that changed ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "overnight"
						})] }),
						text: "Hover any space to watch the room redesign itself — the same corner, reimagined by AI."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3",
					children: GALLERY.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						tabIndex: 0,
						className: "swap-card scroll-reveal group aspect-[4/5] rounded-xl border border-border",
						style: { transitionDelay: `${i * 90}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: g.before,
								alt: `${g.title} before redesign`,
								loading: "lazy",
								className: "swap-before absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: g.after,
								alt: `${g.title} after AI redesign`,
								loading: "lazy",
								className: "swap-after absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 p-6 text-primary-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-widest text-warm",
										children: g.tag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-2xl text-primary-foreground",
										children: g.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-h-0 overflow-hidden text-sm opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-80",
										children: g.text
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-background/90 opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
							})
						]
					}, g.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden border-y border-border bg-foreground py-5 text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl sm:text-3xl",
					children: Array.from({ length: 2 }).flatMap(() => MARQUEE).map((word, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-10 opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: 17,
							className: "text-warm"
						}), word]
					}, word + i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-leaf px-5 py-24 lg:px-8 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scroll-reveal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						eyebrow: "Customer stories",
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Loved by 10,000+ homeowners" }),
						text: "Designers, bloggers and first-time homeowners — all designing faster with AI."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3",
					children: REVIEWS.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lift scroll-reveal rounded-xl border border-border bg-background p-8",
						style: { transitionDelay: `${i * 120}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 text-warm",
								children: [
									0,
									1,
									2,
									3,
									4
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									size: 16,
									fill: "currentColor"
								}, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 leading-8 text-ink-soft",
								children: [
									"“",
									r.text,
									"”"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex items-center gap-3 border-t border-border pt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-full bg-accent font-display text-lg text-primary",
									children: r.name[0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "block text-sm",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "text-muted-foreground",
									children: r.role
								})] })]
							})
						]
					}, r.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-5 py-24 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-reveal relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-primary/20 bg-leaf px-6 py-20 text-center sm:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-accent blur-2xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full bg-warm/50 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "Limited time offer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mx-auto mt-7 max-w-3xl text-4xl leading-[1.06] sm:text-6xl",
									children: ["Ready to redesign your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shimmer-text text-primary",
										children: "dream home?"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground",
									children: "Join 10,000+ homeowners who transformed their living spaces with AI. First 7 days completely free."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-9 flex flex-col justify-center gap-3 sm:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "pulse-ring h-14 px-8 text-base",
										onClick: () => navigate({ to: "/studio" }),
										children: ["Start free trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "h-14 bg-background/70 px-8 text-base",
										onClick: () => scrollTo("how-it-works"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 16 }), " Watch a demo"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-sm text-muted-foreground",
									children: "No credit card required · Cancel anytime · 7-day free trial"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border bg-muted/30 px-5 pb-10 pt-16 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-10 place-items-center rounded-lg bg-foreground text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 17 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl",
									children: "InteriorAI Studio"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xs leading-7 text-muted-foreground",
								children: "AI-powered interior design that makes beautiful, liveable spaces accessible to everyone."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex gap-3",
								children: [
									Twitter,
									Linkedin,
									Instagram
								].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#top",
									"aria-label": "Social link",
									className: "grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:bg-accent hover:text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
								}, i))
							})
						]
					}), FOOTER.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm uppercase tracking-widest",
						children: col.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-3 text-sm text-muted-foreground",
						children: col.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => scrollTo("features"),
							className: "transition-colors hover:text-primary",
							children: l
						}) }, l))
					})] }, col.title))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 InteriorAI Studio. All rights reserved." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary" }), " All systems operational"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1",
							children: [
								"Made with ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 14,
									className: "text-destructive",
									fill: "currentColor"
								}),
								" in India"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => scrollTo("top"),
				"aria-label": "Back to top",
				className: "fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-foreground text-primary-foreground shadow-xl transition-transform hover:-translate-y-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { size: 18 })
			}),
			modal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				type: modal,
				close: () => setModal(null),
				uploadRef,
				onSwitchType: (t) => setModal(t)
			})
		]
	});
}
function Pill({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-2 text-xs font-semibold uppercase text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 13 }), children]
	});
}
function SectionTitle({ eyebrow, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: eyebrow }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-7 text-4xl leading-tight sm:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground",
				children: text
			})
		]
	});
}
function PriceCard({ name, price, note, features, featured, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `relative p-8 ${featured ? "bg-foreground text-primary-foreground shadow-2xl lg:-translate-y-3" : "border border-border bg-background"}`,
		children: [
			featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warm px-4 py-1 text-xs font-bold uppercase text-foreground",
				children: "Most popular"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-xs font-bold uppercase ${featured ? "text-warm" : "text-primary"}`,
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 font-display text-5xl",
				children: [price, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "font-sans text-sm opacity-60",
					children: price.includes("₹") && price !== "₹0" ? "/month" : ""
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm opacity-65",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "my-8 space-y-4",
				children: features.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						size: 17,
						className: "shrink-0 text-primary"
					}), x]
				}, x))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: featured ? "primary" : "outline",
				className: "w-full",
				onClick,
				children: name === "Studio" ? "Contact studio" : "Choose plan"
			})
		]
	});
}
function Modal({ type, close, uploadRef, onSwitchType }) {
	const [file, setFile] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
	const [successMessage, setSuccessMessage] = (0, import_react.useState)("");
	const { login, register } = useAuth();
	const handleAuthSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage("");
		setSuccessMessage("");
		setIsSubmitting(true);
		try {
			if (type === "login") {
				await login(email, password);
				setSuccessMessage("Logged in successfully!");
			} else if (type === "register") {
				await register(email, password);
				setSuccessMessage("Account created successfully!");
			}
			setTimeout(() => {
				close();
			}, 500);
		} catch (err) {
			setErrorMessage(getFriendlyAuthErrorMessage(err));
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[70] grid place-items-center bg-foreground/60 p-4",
		onMouseDown: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${type} dialog`,
			onMouseDown: (e) => e.stopPropagation(),
			className: "w-full max-w-md rounded-xl bg-background p-7 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase text-primary",
					children: "InteriorAI Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl",
					children: type === "upload" ? "Start your room" : type === "login" ? "Welcome back" : "Create your studio"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: close,
					"aria-label": "Close",
					className: "grid size-9 place-items-center rounded-full border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}), type === "upload" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: uploadRef,
						type: "file",
						accept: "image/*,video/*",
						className: "hidden",
						onChange: (e) => setFile(e.target.files?.[0]?.name ?? "")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => uploadRef.current?.click(),
						className: "grid min-h-48 w-full place-items-center rounded-lg border border-dashed border-primary bg-leaf p-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto mb-3 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block",
								children: file || "Choose room photos or video"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "mt-2 block text-muted-foreground",
								children: "JPG, PNG or MP4 · up to 100 MB"
							})
						] })
					}),
					file && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-5 w-full",
						onClick: close,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { size: 17 }), " Analyze my room"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-7 space-y-4",
				onSubmit: handleAuthSubmit,
				children: [
					errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
						children: errorMessage
					}),
					successMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-primary/40 bg-accent p-3 text-xs font-medium text-primary",
						children: successMessage
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "you@example.com",
							className: "mt-2 h-12 w-full rounded-lg border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "At least 8 characters",
							className: "mt-2 h-12 w-full rounded-lg border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2 w-full",
						type: "submit",
						disabled: isSubmitting,
						children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							size: 16,
							className: "animate-spin"
						}), type === "login" ? "Logging in…" : "Creating account…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [type === "login" ? "Log in" : "Create free account", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2 text-center text-xs text-muted-foreground",
						children: type === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onSwitchType?.("register"),
								className: "font-semibold text-primary underline underline-offset-2",
								children: "Start free"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onSwitchType?.("login"),
								className: "font-semibold text-primary underline underline-offset-2",
								children: "Log in"
							})
						] })
					})
				]
			})]
		})
	});
}
//#endregion
export { HomePage as component };
