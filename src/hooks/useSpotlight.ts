import { useCallback, type MouseEvent } from 'react';

/** Sets --mx/--my CSS variables so `.spotlight` cards glow under the cursor. */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  return useCallback((e: MouseEvent<T>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);
}
