/** Tiny className joiner */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Resolve a path in /public against the configured base URL */
export function asset(path: string): string {
  if (/^(https?:|mailto:|tel:|data:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
