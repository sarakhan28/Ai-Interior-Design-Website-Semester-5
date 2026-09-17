export const BACKEND_URL = import.meta.env["VITE_BACKEND_URL"] || "http://localhost:8080";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: number;
}

export interface UserProfileResponse {
  uid: string;
  email: string;
  name: string;
  picture: string | null;
  active: boolean;
}

/**
 * Fetch current user profile from Spring Boot backend using Firebase ID token
 * Calls GET /api/auth/me with Authorization: Bearer <token>
 */
export async function fetchCurrentUserProfile(token: string): Promise<ApiResponse<UserProfileResponse>> {
  const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Backend authentication failed (${response.status}): ${errorBody || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Validates active session / ID token with the backend
 * Calls POST /api/auth/verify with Authorization: Bearer <token>
 */
export async function verifyBackendSession(token: string): Promise<ApiResponse<UserProfileResponse>> {
  const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Backend session verification failed (${response.status}): ${errorBody || response.statusText}`
    );
  }

  return response.json();
}
