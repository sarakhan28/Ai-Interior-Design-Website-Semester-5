import { a as __toESM } from "../_runtime.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import "../_libs/firebase.mjs";
import { a as signOut, i as signInWithEmailAndPassword, n as getAuth, o as updateProfile, r as onIdTokenChanged, t as createUserWithEmailAndPassword } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-Dv-orynH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var firebaseConfig = {
	apiKey: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:8080",
		"VITE_FIREBASE_API_KEY": "AIzaSyDemoKeyInteriorAiStudioClient",
		"VITE_FIREBASE_APP_ID": "1:123456789012:web:abcdef1234567890",
		"VITE_FIREBASE_AUTH_DOMAIN": "interiorai-studio.firebaseapp.com",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "123456789012",
		"VITE_FIREBASE_PROJECT_ID": "interiorai-studio",
		"VITE_FIREBASE_STORAGE_BUCKET": "interiorai-studio.appspot.com"
	}["VITE_FIREBASE_API_KEY"],
	authDomain: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:8080",
		"VITE_FIREBASE_API_KEY": "AIzaSyDemoKeyInteriorAiStudioClient",
		"VITE_FIREBASE_APP_ID": "1:123456789012:web:abcdef1234567890",
		"VITE_FIREBASE_AUTH_DOMAIN": "interiorai-studio.firebaseapp.com",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "123456789012",
		"VITE_FIREBASE_PROJECT_ID": "interiorai-studio",
		"VITE_FIREBASE_STORAGE_BUCKET": "interiorai-studio.appspot.com"
	}["VITE_FIREBASE_AUTH_DOMAIN"],
	projectId: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:8080",
		"VITE_FIREBASE_API_KEY": "AIzaSyDemoKeyInteriorAiStudioClient",
		"VITE_FIREBASE_APP_ID": "1:123456789012:web:abcdef1234567890",
		"VITE_FIREBASE_AUTH_DOMAIN": "interiorai-studio.firebaseapp.com",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "123456789012",
		"VITE_FIREBASE_PROJECT_ID": "interiorai-studio",
		"VITE_FIREBASE_STORAGE_BUCKET": "interiorai-studio.appspot.com"
	}["VITE_FIREBASE_PROJECT_ID"],
	storageBucket: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:8080",
		"VITE_FIREBASE_API_KEY": "AIzaSyDemoKeyInteriorAiStudioClient",
		"VITE_FIREBASE_APP_ID": "1:123456789012:web:abcdef1234567890",
		"VITE_FIREBASE_AUTH_DOMAIN": "interiorai-studio.firebaseapp.com",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "123456789012",
		"VITE_FIREBASE_PROJECT_ID": "interiorai-studio",
		"VITE_FIREBASE_STORAGE_BUCKET": "interiorai-studio.appspot.com"
	}["VITE_FIREBASE_STORAGE_BUCKET"],
	messagingSenderId: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:8080",
		"VITE_FIREBASE_API_KEY": "AIzaSyDemoKeyInteriorAiStudioClient",
		"VITE_FIREBASE_APP_ID": "1:123456789012:web:abcdef1234567890",
		"VITE_FIREBASE_AUTH_DOMAIN": "interiorai-studio.firebaseapp.com",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "123456789012",
		"VITE_FIREBASE_PROJECT_ID": "interiorai-studio",
		"VITE_FIREBASE_STORAGE_BUCKET": "interiorai-studio.appspot.com"
	}["VITE_FIREBASE_MESSAGING_SENDER_ID"],
	appId: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:8080",
		"VITE_FIREBASE_API_KEY": "AIzaSyDemoKeyInteriorAiStudioClient",
		"VITE_FIREBASE_APP_ID": "1:123456789012:web:abcdef1234567890",
		"VITE_FIREBASE_AUTH_DOMAIN": "interiorai-studio.firebaseapp.com",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "123456789012",
		"VITE_FIREBASE_PROJECT_ID": "interiorai-studio",
		"VITE_FIREBASE_STORAGE_BUCKET": "interiorai-studio.appspot.com"
	}["VITE_FIREBASE_APP_ID"]
};
var demoConfigValues = /* @__PURE__ */ new Set([
	"AIzaSyDemoKeyInteriorAiStudioClient",
	"interiorai-studio.firebaseapp.com",
	"interiorai-studio",
	"interiorai-studio.appspot.com",
	"123456789012",
	"1:123456789012:web:abcdef1234567890"
]);
var missingConfig = Object.entries(firebaseConfig).filter(([, value]) => !value || demoConfigValues.has(value)).map(([key]) => key);
var app;
var auth;
if (typeof window !== "undefined" && missingConfig.length === 0) {
	app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
	auth = getAuth(app);
}
/**
* Translates Firebase Auth error codes into clean, user-friendly messages.
*/
function getFriendlyAuthErrorMessage(error) {
	if (!error || typeof error !== "object") {
		if (!auth && missingConfig.length > 0) return "Firebase authentication is not configured. Add the VITE_FIREBASE_* values to the frontend environment.";
		return "An unexpected error occurred. Please try again.";
	}
	const err = error;
	const code = err.code || "";
	if (!code && err.message) return err.message;
	if (!auth && missingConfig.length > 0) return "Firebase authentication is not configured. Add the VITE_FIREBASE_* values to the frontend environment.";
	switch (code) {
		case "auth/invalid-credential":
		case "auth/wrong-password":
		case "auth/user-not-found": return "Invalid email or password. Please check your details and try again.";
		case "auth/email-already-in-use": return "An account with this email already exists. Please log in instead.";
		case "auth/weak-password": return "Password should be at least 8 characters long.";
		case "auth/invalid-email": return "Please enter a valid email address.";
		case "auth/too-many-requests": return "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.";
		case "auth/network-request-failed": return "Network connection error. Please check your internet connection.";
		case "auth/user-disabled": return "This account has been disabled. Please contact support.";
		case "auth/operation-not-allowed": return "Email/Password sign-in is not enabled for this project.";
		default: return err.message || "Authentication failed. Please check your input.";
	}
}
var BACKEND_URL = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_BACKEND_URL": "http://localhost:8080",
	"VITE_FIREBASE_API_KEY": "AIzaSyDemoKeyInteriorAiStudioClient",
	"VITE_FIREBASE_APP_ID": "1:123456789012:web:abcdef1234567890",
	"VITE_FIREBASE_AUTH_DOMAIN": "interiorai-studio.firebaseapp.com",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "123456789012",
	"VITE_FIREBASE_PROJECT_ID": "interiorai-studio",
	"VITE_FIREBASE_STORAGE_BUCKET": "interiorai-studio.appspot.com"
}["VITE_BACKEND_URL"] || "http://localhost:8080";
/**
* Fetch current user profile from Spring Boot backend using Firebase ID token
* Calls GET /api/auth/me with Authorization: Bearer <token>
*/
async function fetchCurrentUserProfile(token) {
	const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	});
	if (!response.ok) {
		const errorBody = await response.text().catch(() => "");
		throw new Error(`Backend authentication failed (${response.status}): ${errorBody || response.statusText}`);
	}
	return response.json();
}
var LOCAL_DEMO_ACCOUNT_KEY = "interiorai-demo-account";
var LOCAL_DEMO_SESSION_KEY = "interiorai-demo-session";
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [token, setToken] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadBackendProfile = async (idToken) => {
		try {
			const res = await fetchCurrentUserProfile(idToken);
			if (res.success && res.data) {
				setProfile(res.data);
				return res.data;
			}
		} catch (err) {
			console.warn("Could not fetch user profile from backend (backend may be starting or offline):", err);
		}
		return null;
	};
	(0, import_react.useEffect)(() => {
		if (!auth) {
			const session = readLocalDemoSession();
			if (session) {
				setUser(createLocalDemoUser(session.email));
				setToken(getLocalDemoToken(session.email));
			}
			setLoading(false);
			return;
		}
		const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
			setUser(currentUser);
			if (currentUser) try {
				const idToken = await currentUser.getIdToken();
				setToken(idToken);
				await loadBackendProfile(idToken);
			} catch (err) {
				console.error("Error retrieving ID token:", err);
				setToken(null);
				setProfile(null);
			}
			else {
				setToken(null);
				setProfile(null);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);
	const login = async (email, password) => {
		const normalizedEmail = email.trim();
		if (!normalizedEmail || !password) throw new Error("Please enter both email and password.");
		if (!auth) {
			const account = readLocalDemoAccount();
			if (!account || account.email !== normalizedEmail || account.password !== password) throw new Error("No matching local demo account found. Create an account first.");
			const localUser = createLocalDemoUser(normalizedEmail);
			saveLocalDemoSession(normalizedEmail);
			setUser(localUser);
			setToken(getLocalDemoToken(normalizedEmail));
			return localUser;
		}
		const loggedInUser = (await signInWithEmailAndPassword(auth, normalizedEmail, password)).user;
		const idToken = await loggedInUser.getIdToken();
		setUser(loggedInUser);
		setToken(idToken);
		await loadBackendProfile(idToken);
		return loggedInUser;
	};
	const register = async (email, password, displayName) => {
		const normalizedEmail = email.trim();
		if (!normalizedEmail || !password) throw new Error("Please enter both email and password.");
		if (!auth) {
			const localUser = createLocalDemoUser(normalizedEmail);
			saveLocalDemoAccount({
				email: normalizedEmail,
				password
			});
			saveLocalDemoSession(normalizedEmail);
			setUser(localUser);
			setToken(getLocalDemoToken(normalizedEmail));
			return localUser;
		}
		const newUser = (await createUserWithEmailAndPassword(auth, normalizedEmail, password)).user;
		if (displayName && auth.currentUser) await updateProfile(auth.currentUser, { displayName });
		const idToken = await newUser.getIdToken();
		setUser(newUser);
		setToken(idToken);
		await loadBackendProfile(idToken);
		return newUser;
	};
	const logout = async () => {
		if (auth) await signOut(auth);
		setUser(null);
		setToken(null);
		setProfile(null);
		clearLocalDemoSession();
	};
	const getIdToken = async (forceRefresh = false) => {
		if (!user) return null;
		const freshToken = await user.getIdToken(forceRefresh);
		setToken(freshToken);
		return freshToken;
	};
	const refreshProfile = async () => {
		if (!token && user) {
			const freshToken = await user.getIdToken();
			setToken(freshToken);
			if (freshToken) return loadBackendProfile(freshToken);
		} else if (token) return loadBackendProfile(token);
		return null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			token,
			profile,
			loading,
			login,
			register,
			logout,
			getIdToken,
			refreshProfile
		},
		children
	});
}
function createLocalDemoUser(email) {
	return {
		email,
		displayName: null,
		getIdToken: async () => getLocalDemoToken(email)
	};
}
function getLocalDemoToken(email) {
	return `local-demo-token:${email}`;
}
function readLocalDemoAccount() {
	if (typeof window === "undefined") return null;
	const stored = window.localStorage.getItem(LOCAL_DEMO_ACCOUNT_KEY);
	if (!stored) return null;
	try {
		const account = JSON.parse(stored);
		return account.email && account.password ? account : null;
	} catch {
		return null;
	}
}
function saveLocalDemoAccount(account) {
	window.localStorage.setItem(LOCAL_DEMO_ACCOUNT_KEY, JSON.stringify(account));
}
function readLocalDemoSession() {
	if (typeof window === "undefined") return null;
	const stored = window.localStorage.getItem(LOCAL_DEMO_SESSION_KEY);
	if (!stored) return null;
	try {
		const session = JSON.parse(stored);
		return session.email ? session : null;
	} catch {
		return null;
	}
}
function saveLocalDemoSession(email) {
	window.localStorage.setItem(LOCAL_DEMO_SESSION_KEY, JSON.stringify({ email }));
}
function clearLocalDemoSession() {
	if (typeof window !== "undefined") window.localStorage.removeItem(LOCAL_DEMO_SESSION_KEY);
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
//#endregion
export { getFriendlyAuthErrorMessage as n, useAuth as r, AuthProvider as t };
