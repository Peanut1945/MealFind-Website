'use client';

import { useEffect } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Site-wide momentum scrolling.
 *
 * Lenis drives the *real* window scroll position (it does not transform a
 * wrapper), which means `position: sticky`, scroll anchoring and Framer Motion's
 * `useScroll` all keep working normally on top of it.
 *
 * Under `prefers-reduced-motion: reduce` Lenis is never instantiated and the
 * browser's native scrolling takes over untouched. Reduced motion for the
 * *animations* is handled separately by `<MotionProvider>`, which wraps only
 * the pages that have any — this component wraps every route, so it stays free
 * of Framer Motion imports.
 *
 * Lenis is loaded with a dynamic `import()` rather than a top-level one.
 * `SmoothScroll` wraps the root layout, so a static import puts Lenis in the
 * chunk *every* route downloads before it can hydrate — including /privacy,
 * /terms and /cookies, which are pure text and never animate anything. It is
 * useless until the user scrolls, and it cannot run during SSR at all, so
 * nothing is lost by fetching it after hydration.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add('no-lenis');
      return;
    }

    document.documentElement.classList.remove('no-lenis');

    /*
     * The import resolves a tick or two after the effect runs, so the effect
     * may already have been cleaned up by the time it lands (reduced-motion
     * flipping, a fast unmount in dev's double-invoke). `disposed` makes the
     * late arrival a no-op instead of leaking a Lenis instance and an rAF loop
     * that nothing holds a handle to any more.
     */
    let disposed = false;
    let dispose: (() => void) | undefined;

    void import('lenis').then(({ default: Lenis }) => {
      if (disposed) return;
      dispose = startLenis(Lenis);
    });

    return () => {
      disposed = true;
      dispose?.();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}

/**
 * Boots Lenis and the in-page anchor handling, returning the teardown.
 *
 * Split out of the effect purely so the effect body stays readable now that it
 * also has to manage the dynamic import — the behaviour is unchanged.
 */
function startLenis(Lenis: typeof import('lenis').default): () => void {
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
  };
}
