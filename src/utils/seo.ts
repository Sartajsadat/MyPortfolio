import { profile } from '@/data/profile';

/** Adds canonical + og:url tags based on the configured site URL. */
export function applySeo() {
  const url = profile.siteUrl;
  if (!url) return;
  const ensure = (selector: string, create: () => HTMLElement) => {
    let el = document.head.querySelector(selector) as HTMLElement | null;
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    return el;
  };
  ensure('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).setAttribute('href', url);
  ensure('meta[property="og:url"]', () => {
    const m = document.createElement('meta');
    m.setAttribute('property', 'og:url');
    return m;
  }).setAttribute('content', url);
}
