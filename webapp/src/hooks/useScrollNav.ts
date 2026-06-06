import { useEffect } from 'react';

export function useScrollNav(navId = 'topNav'): void {
  useEffect(() => {
    const nav = document.getElementById(navId);
    if (!nav) return;

    const sync = () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, [navId]);
}
