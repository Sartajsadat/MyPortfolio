import { useEffect, useState } from 'react';
import { fetchContent, isApiEnabled } from '@/services/contentApi';

/**
 * Returns local content instantly; if an API is configured, replaces it with
 * remote content once loaded. Falls back silently to local data on error.
 */
export function useContent<T>(key: string, local: T): { data: T; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T>(local);
  const [loading, setLoading] = useState(isApiEnabled);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isApiEnabled) return;
    const controller = new AbortController();
    fetchContent<T>(key, controller.signal)
      .then((remote) => setData(remote))
      .catch((err: unknown) => {
        if ((err as Error).name !== 'AbortError') setError(err as Error);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [key]);

  return { data, loading, error };
}
