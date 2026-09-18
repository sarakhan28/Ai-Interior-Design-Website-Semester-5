import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  updateProfile,
  type User,
} from "./firebase";
import { fetchCurrentUserProfile, type UserProfileResponse } from "./api";

const LOCAL_DEMO_ACCOUNT_KEY = "interiorai-demo-account";
const LOCAL_DEMO_SESSION_KEY = "interiorai-demo-session";

type AuthUser = Pick<User, "email" | "displayName" | "getIdToken">;

interface LocalDemoAccount {
  email: string;
  password: string;
}

interface LocalDemoSession {
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  profile: UserProfileResponse | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (email: string, password: string, displayName?: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  refreshProfile: () => Promise<UserProfileResponse | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Synchronize backend profile when token changes
  const loadBackendProfile = async (idToken: string): Promise<UserProfileResponse | null> => {
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

  useEffect(() => {
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
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();
          setToken(idToken);
          await loadBackendProfile(idToken);
        } catch (err) {
          console.error("Error retrieving ID token:", err);
          setToken(null);
          setProfile(null);
        }
      } else {
        setToken(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<AuthUser> => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      throw new Error("Please enter both email and password.");
    }

    if (!auth) {
      const account = readLocalDemoAccount();
      if (!account || account.email !== normalizedEmail || account.password !== password) {
        throw new Error("No matching local demo account found. Create an account first.");
      }

      const localUser = createLocalDemoUser(normalizedEmail);
      saveLocalDemoSession(normalizedEmail);
      setUser(localUser);
      setToken(getLocalDemoToken(normalizedEmail));
      return localUser;
    }

    const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
    const loggedInUser = userCredential.user;
    const idToken = await loggedInUser.getIdToken();

    setUser(loggedInUser);
    setToken(idToken);
    await loadBackendProfile(idToken);
    return loggedInUser;
  };

  const register = async (email: string, password: string, displayName?: string): Promise<AuthUser> => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      throw new Error("Please enter both email and password.");
    }

    if (!auth) {
      const localUser = createLocalDemoUser(normalizedEmail);
      saveLocalDemoAccount({ email: normalizedEmail, password });
      saveLocalDemoSession(normalizedEmail);
      setUser(localUser);
      setToken(getLocalDemoToken(normalizedEmail));
      return localUser;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
    const newUser = userCredential.user;

    if (displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
    }

    const idToken = await newUser.getIdToken();
    setUser(newUser);
    setToken(idToken);
    await loadBackendProfile(idToken);
    return newUser;
  };

  const logout = async (): Promise<void> => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    setToken(null);
    setProfile(null);
    clearLocalDemoSession();
  };

  const getIdToken = async (forceRefresh = false): Promise<string | null> => {
    if (!user) return null;
    const freshToken = await user.getIdToken(forceRefresh);
    setToken(freshToken);
    return freshToken;
  };

  const refreshProfile = async (): Promise<UserProfileResponse | null> => {
    if (!token && user) {
      const freshToken = await user.getIdToken();
      setToken(freshToken);
      if (freshToken) return loadBackendProfile(freshToken);
    } else if (token) {
      return loadBackendProfile(token);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        loading,
        login,
        register,
        logout,
        getIdToken,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function createLocalDemoUser(email: string): AuthUser {
  return {
    email,
    displayName: null,
    getIdToken: async () => getLocalDemoToken(email),
  };
}

function getLocalDemoToken(email: string): string {
  return `local-demo-token:${email}`;
}

function readLocalDemoAccount(): LocalDemoAccount | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(LOCAL_DEMO_ACCOUNT_KEY);
  if (!stored) return null;

  try {
    const account = JSON.parse(stored) as LocalDemoAccount;
    return account.email && account.password ? account : null;
  } catch {
    return null;
  }
}

function saveLocalDemoAccount(account: LocalDemoAccount): void {
  window.localStorage.setItem(LOCAL_DEMO_ACCOUNT_KEY, JSON.stringify(account));
}

function readLocalDemoSession(): LocalDemoSession | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(LOCAL_DEMO_SESSION_KEY);
  if (!stored) return null;

  try {
    const session = JSON.parse(stored) as LocalDemoSession;
    return session.email ? session : null;
  } catch {
    return null;
  }
}

function saveLocalDemoSession(email: string): void {
  window.localStorage.setItem(LOCAL_DEMO_SESSION_KEY, JSON.stringify({ email }));
}

function clearLocalDemoSession(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(LOCAL_DEMO_SESSION_KEY);
  }
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
