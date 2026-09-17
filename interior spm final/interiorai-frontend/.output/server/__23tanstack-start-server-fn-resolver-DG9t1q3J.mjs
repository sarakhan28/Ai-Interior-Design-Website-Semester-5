//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DG9t1q3J.js
var manifest = {
	"01a034350c599b0f7c9958ee5c9460b8df5d19f68cb5300a2c45f30f6053d547": {
		functionName: "generateColorRecommendations_createServerFn_handler",
		importer: () => import("./_ssr/design.functions-LDmmrfhz.mjs")
	},
	"3728f59eb30a257f725d274eedb58e5d6daa2e2f237ac72bb5c8c1b9faa475e1": {
		functionName: "generateVastuGuidance_createServerFn_handler",
		importer: () => import("./_ssr/design.functions-LDmmrfhz.mjs")
	},
	"8f32b808463f5bab345b1e0de4ca3e97d326cd327c8ee7aa1b400893566f7034": {
		functionName: "generateBudgetPlan_createServerFn_handler",
		importer: () => import("./_ssr/design.functions-LDmmrfhz.mjs")
	},
	"96f8910d9d876f7c1f0c8f1e430463eb27fdc748c39576d3bb04d3314433a2be": {
		functionName: "generateFurnitureRecommendations_createServerFn_handler",
		importer: () => import("./_ssr/design.functions-LDmmrfhz.mjs")
	},
	"fcccfa189e62e2d97cb631ec0ea673b43ffc47e070f12193f36a4fb9ac3ff42e": {
		functionName: "generateDesignPlan_createServerFn_handler",
		importer: () => import("./_ssr/design.functions-LDmmrfhz.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
