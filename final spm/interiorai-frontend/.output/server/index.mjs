globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/arrow-left-XpArv3uf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-c6tXcOp0pVBi6LYfjeQYxLeyins\"",
		"mtime": "2026-09-18T08:51:40.772Z",
		"size": 155,
		"path": "../public/assets/arrow-left-XpArv3uf.js"
	},
	"/assets/button-DBGaV_u4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85b7-21BhGIcfDY12mPKAPnsDT7/w3dk\"",
		"mtime": "2026-09-18T08:51:40.773Z",
		"size": 34231,
		"path": "../public/assets/button-DBGaV_u4.js"
	},
	"/assets/ai-bedroom-fkpv99B9.jpg": {
		"type": "image/jpeg",
		"etag": "\"313ce-aQM53wsZ+03vCOeCneuaDLDIA3g\"",
		"mtime": "2026-09-18T08:51:40.795Z",
		"size": 201678,
		"path": "../public/assets/ai-bedroom-fkpv99B9.jpg"
	},
	"/assets/download-U22tj__h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de-1im9GqDBNGuVDizIkQbBgokguZU\"",
		"mtime": "2026-09-18T08:51:40.775Z",
		"size": 222,
		"path": "../public/assets/download-U22tj__h.js"
	},
	"/assets/features._featureId-BtJMruBZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2865a-md9niytGmCHLCIkKDeOnbAelZJg\"",
		"mtime": "2026-09-18T08:51:40.776Z",
		"size": 165466,
		"path": "../public/assets/features._featureId-BtJMruBZ.js"
	},
	"/assets/cost-bedroom-BXGUsXBC.jpg": {
		"type": "image/jpeg",
		"etag": "\"2b84a-kjMhJW8lB5o+bNbteZtqUnC+Yog\"",
		"mtime": "2026-09-18T08:51:40.796Z",
		"size": 178250,
		"path": "../public/assets/cost-bedroom-BXGUsXBC.jpg"
	},
	"/assets/gallery-kitchen-after-CmXuxw_v.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fa45-4bLx9F/xLSZhdJPTk87N/j43vPM\"",
		"mtime": "2026-09-18T08:51:40.797Z",
		"size": 129605,
		"path": "../public/assets/gallery-kitchen-after-CmXuxw_v.jpg"
	},
	"/assets/gallery-kitchen-before-DYH8XdWa.jpg": {
		"type": "image/jpeg",
		"etag": "\"1bb9e-WXezFMMUUmkP3UUCTbr5WsRIZbA\"",
		"mtime": "2026-09-18T08:51:40.799Z",
		"size": 113566,
		"path": "../public/assets/gallery-kitchen-before-DYH8XdWa.jpg"
	},
	"/assets/hero-designed-room-Cy-70GGW.jpg": {
		"type": "image/jpeg",
		"etag": "\"2ecc0-Nip0Emljm2qu2tRykBy564nSnu4\"",
		"mtime": "2026-09-18T08:51:40.801Z",
		"size": 191680,
		"path": "../public/assets/hero-designed-room-Cy-70GGW.jpg"
	},
	"/assets/index-DqPkU-nN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76795-2F26wW0TWFqWVGj7nL0XC60e/Js\"",
		"mtime": "2026-09-18T08:51:40.770Z",
		"size": 485269,
		"path": "../public/assets/index-DqPkU-nN.js"
	},
	"/assets/hero-empty-room-X5IC5XPr.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e82e-AGN5qQFWw0UYkgsjfK++HlYYOgk\"",
		"mtime": "2026-09-18T08:51:40.807Z",
		"size": 124974,
		"path": "../public/assets/hero-empty-room-X5IC5XPr.jpg"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-09-18T08:51:40.789Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-ClTtnalT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9107-R8jSZtAlyvxyrinAEWhwpXesu8s\"",
		"mtime": "2026-09-18T08:51:40.790Z",
		"size": 37127,
		"path": "../public/assets/routes-ClTtnalT.js"
	},
	"/assets/sofa-Rt1izklc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a6-9gTO+nmM/B97aymmouwZhMxWrps\"",
		"mtime": "2026-09-18T08:51:40.791Z",
		"size": 2214,
		"path": "../public/assets/sofa-Rt1izklc.js"
	},
	"/assets/studio-BQ65Y5VF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1deb-Utfz0KsuScmYKRUoMtBVHpfDAeE\"",
		"mtime": "2026-09-18T08:51:40.792Z",
		"size": 7659,
		"path": "../public/assets/studio-BQ65Y5VF.js"
	},
	"/assets/useRouter-eFyvqlp7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2090-zSNODqokSWI4IPf6OZ3o81DTMG8\"",
		"mtime": "2026-09-18T08:51:40.793Z",
		"size": 8336,
		"path": "../public/assets/useRouter-eFyvqlp7.js"
	},
	"/assets/styles-DIezSjY-.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17f8e-9gYT9LjjEBmJkmZe8X3Y+A2ATPU\"",
		"mtime": "2026-09-18T08:51:40.810Z",
		"size": 98190,
		"path": "../public/assets/styles-DIezSjY-.css"
	},
	"/assets/opencv-Y5AnV6xD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed7ab6-WcxUxJM6JRNIxy9OKrwy/d56Zok\"",
		"mtime": "2026-09-18T08:51:40.788Z",
		"size": 15563446,
		"path": "../public/assets/opencv-Y5AnV6xD.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_MTK4Lf = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_MTK4Lf
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
