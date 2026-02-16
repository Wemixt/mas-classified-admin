/**
 * Typed environment variables for the app.
 * Use NEXT_PUBLIC_* for client-visible values only (Next.js exposes these at build time).
 */

function getEnv(key: string, fallback = ""): string {
  const value = process.env[key];
  return (value !== undefined && value !== "" ? value : fallback).trim();
}

/** Backend API base URL (e.g. https://api.example.com), no trailing slash. */
export function getApiBaseUrl(): string {
  return getEnv("NEXT_PUBLIC_API_URL", "").replace(/\/$/, "");
}

export const env = {
  get apiBaseUrl() {
    return getApiBaseUrl();
  },
} as const;
