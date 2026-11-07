/**
 * Content service.
 *
 * Today every section reads from the local TypeScript files in src/data.
 * When a Spring Boot (or any) REST API is ready, set VITE_API_BASE_URL and
 * expose endpoints that return the same JSON shapes as src/types/content.ts:
 *
 *   GET {VITE_API_BASE_URL}/api/content/projects     -> Project[]
 *   GET {VITE_API_BASE_URL}/api/content/experience   -> Experience[]
 *   GET {VITE_API_BASE_URL}/api/content/courses      -> Course[]
 *   ...
 *
 * Components use `useContent(key, localFallback)`, which renders local data
 * immediately and swaps in API data when it arrives. If the API fails, the
 * local data stays — the site never breaks.
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export const isApiEnabled = API_BASE.length > 0;

export async function fetchContent<T>(key: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE}/api/content/${key}`, {
    headers: { Accept: 'application/json' },
    signal,
  });
  if (!res.ok) throw new Error(`Failed to load ${key}: ${res.status}`);
  return (await res.json()) as T;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '';

export const hasContactEndpoint = CONTACT_ENDPOINT.length > 0;

/**
 * Sends the contact form. Works with Formspree-style endpoints or your own
 * Spring Boot controller (POST JSON, return 2xx).
 */
export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  } finally {
    window.clearTimeout(timeout);
  }
}
