import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  onIdTokenChanged,
  updateProfile,
  type Auth,
  type User,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"],
  authDomain: import.meta.env["VITE_FIREBASE_AUTH_DOMAIN"],
  projectId: import.meta.env["VITE_FIREBASE_PROJECT_ID"],
  storageBucket: import.meta.env["VITE_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: import.meta.env["VITE_FIREBASE_MESSAGING_SENDER_ID"],
  appId: import.meta.env["VITE_FIREBASE_APP_ID"],
};

const demoConfigValues = new Set([
  "AIzaSyDemoKeyInteriorAiStudioClient",
  "interiorai-studio.firebaseapp.com",
  "interiorai-studio",
  "interiorai-studio.appspot.com",
  "123456789012",
  "1:123456789012:web:abcdef1234567890",
]);

const missingConfig = Object.entries(firebaseConfig)
  .filter(([, value]) => !value || demoConfigValues.has(value))
  .map(([key]) => key);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (typeof window !== "undefined" && missingConfig.length === 0) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  onAuthStateChanged,
  updateProfile,
  type User,
  type UserCredential,
};

/**
 * Translates Firebase Auth error codes into clean, user-friendly messages.
 */
export function getFriendlyAuthErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    if (!auth && missingConfig.length > 0) {
      return "Firebase authentication is not configured. Add the VITE_FIREBASE_* values to the frontend environment.";
    }
    return "An unexpected error occurred. Please try again.";
  }

  const err = error as { code?: string; message?: string };
  const code = err.code || "";
  if (!code && err.message) {
    return err.message;
  }

  if (!auth && missingConfig.length > 0) {
    return "Firebase authentication is not configured. Add the VITE_FIREBASE_* values to the frontend environment.";
  }

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please check your details and try again.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please log in instead.";
    case "auth/weak-password":
      return "Password should be at least 8 characters long.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet connection.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/operation-not-allowed":
      return "Email/Password sign-in is not enabled for this project.";
    default:
      return err.message || "Authentication failed. Please check your input.";
  }
}
