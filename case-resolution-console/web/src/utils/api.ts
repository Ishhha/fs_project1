/**
 * api.ts
 * Generic API utility for GET/POST with base URL and headers.
 */

const BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:4000/api";

export async function apiGet(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "x-api-key": "local-dev-key",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function apiPost(endpoint: string, body: any) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "x-api-key": "local-dev-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API Error ${res.status}`);
  return res.json();
}
