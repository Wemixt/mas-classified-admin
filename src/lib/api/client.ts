import { getApiBaseUrl } from "@/config/env";

/**
 * Get the full API base URL (no trailing slash).
 * Use for building request URLs in the API client.
 */
export function getApiUrl(): string {
  return getApiBaseUrl();
}

export type ApiFetchOptions = RequestInit & {
  /** Path relative to API base (e.g. "/users"). Will be joined with getApiUrl(). */
  path?: string;
  /** Full URL; if set, path is ignored. */
  url?: string;
};

/**
 * Fetch against the backend API. Uses NEXT_PUBLIC_API_URL as base.
 * For path, provide a leading slash (e.g. "/v1/users").
 */
export async function apiFetch<T = unknown>(
  options: ApiFetchOptions
): Promise<T> {
  const { path, url, ...init } = options;
  const base = getApiUrl();
  const finalUrl =
    url ?? (path ? `${base}${path.startsWith("/") ? path : `/${path}`}` : base);
  const headers = new Headers(init.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(finalUrl, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  return res.text() as Promise<T>;
}
