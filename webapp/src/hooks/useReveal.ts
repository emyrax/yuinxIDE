import { useEffect } from 'react';

export function useReveal(): void {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal'));
    if (items.length === 0) return;

    items.forEach((item) => {
      const delay = Number((item as HTMLElement).dataset.revealDelay || 0);
      if (Number.isFinite(delay) && delay > 0) {
        (item as HTMLElement).style.transitionDelay = `${delay}ms`;
      }
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -12% 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}
