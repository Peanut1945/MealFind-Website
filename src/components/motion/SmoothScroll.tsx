'use client';

import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Site-wide momentum scrolling.
 *
 * Lenis drives the *real* window scroll position (it does not transform a
 * wrapper), which means `position: sticky`, scroll anchoring and Framer Motion's
 * `useScroll` all keep working normally on top of it.
 *
 * Under `prefers-reduced-motion: reduce` Lenis is never instantiated — the
 * browser's native scrolling takes over untouched — and `MotionConfig` switches
 * every Framer animation to an instant state change.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add('no-lenis');
      return;
    }

    document.documentElement.classList.remove('no-lenis');

    const lenis = new Lenis({
      duration: 1.1,
      // Exponential ease-out: fast pickup, long soft tail.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have native momentum; hijacking it feels worse.
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    /**
     * In-page anchors: let Lenis animate to the target instead of the browser
     * jumping, and keep the URL hash so the link is still shareable.
     * Also moves focus to the target so keyboard and screen-reader users land
     * in the right place — the part most smooth-scroll setups drop.
     *
     * The href is resolved against the current document rather than string-
     * matched on a leading `#`, so the nav's root-relative `/#features` is
     * treated as an in-page anchor while browsing the home page, and left alone
     * (a real navigation) from anywhere else.
     */
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.('a');
      if (!anchor || (anchor.target && anchor.target !== '_self')) return;
      if (!anchor.getAttribute('href')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === '#') return;

      // `getElementById`, not `querySelector`: a hash is an arbitrary string and
      // one that isn't a valid selector (`#2024`, `#a b`) would throw.
      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, {
        offset: -88, // clear the sticky nav
        onComplete: () => {
          window.history.replaceState(null, '', url.hash);
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        },
      });
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  );
}
