'use client';

import { MotionConfig } from 'framer-motion';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Switches every Framer Motion animation inside it to an instant state change
 * when the user has `prefers-reduced-motion: reduce` set.
 *
 * This is the *only* thing honouring that preference for `Hero`, `StatBand`,
 * `HowItWorks`, `OurStory`, `RecipeBox` and `ParallaxLayer` — those components
 * animate with raw `motion` elements and do not check the media query
 * themselves. (`Reveal`, `CountUp` and `useParallax` do their own checking and
 * would be fine without it.) So any page rendering one of those must be wrapped
 * in this, or reduced-motion users get the full animation.
 *
 * It lives here rather than in the root layout because `MotionConfig` is a
 * Framer Motion import, and anything the root layout imports is downloaded by
 * every route. Wrapping the layout meant /privacy, /terms, /cookies and the 404
 * — which animate nothing — each paid ~66 KB gzip for a library they never
 * called. Wrap the pages that animate; leave the ones that don't alone.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  );
}
