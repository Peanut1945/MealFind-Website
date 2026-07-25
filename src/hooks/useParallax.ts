'use client';

import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type MotionStyle,
} from 'framer-motion';
import { useRef, type RefObject } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motion as motionTokens } from '@/lib/tokens';

export interface ParallaxOptions {
  /**
   * Vertical drift in pixels across the element's full pass through the
   * viewport. Positive moves the element *down* as you scroll down, i.e. it
   * lags behind the page and reads as further away. Negative pulls it ahead.
   *
   * Rough depth scale used across this site:
   *   ±20–40  background texture
   *   ±60–90  phone mockups
   *   ±90–140 floating labels (nearest, so they move most)
   */
  speed?: number;
  /** Horizontal drift in pixels across the same pass. */
  drift?: number;
  /** Degrees to rotate across the pass, as `[atEnter, atExit]`. */
  rotate?: [number, number];
  /** Scale across the pass, as `[atEnter, atExit]`. */
  scale?: [number, number];
  /**
   * Where the pass starts and ends, in Framer's scroll-offset syntax.
   * Default `['start end', 'end start']` = from "element's top hits the bottom
   * of the viewport" to "element's bottom hits the top".
   */
  offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset'];
  /**
   * Spring-smooth the scroll input. On by default — it takes the mechanical
   * edge off wheel-by-wheel tracking and blends well with Lenis. Turn it off
   * for anything that must stay locked to a scroll position exactly (e.g. a
   * progress bar).
   */
  smooth?: boolean;
  /**
   * Track a *different* element's scroll progress than the one being moved.
   * Use when a child should react to its section's position rather than its own
   * — e.g. a phone that drifts based on how far through the section you are.
   */
  track?: RefObject<HTMLElement | null>;
  /**
   * What drives the animation.
   *
   * `'element'` (default) maps the element's own pass through the viewport to
   * 0 → 1. Right for anything below the fold.
   *
   * `'page'` maps raw window scroll across `pageRange` instead. Use this for
   * above-the-fold content: an element that's already mid-viewport on load
   * would sit at ~0.4 progress in `'element'` mode and therefore render
   * pre-displaced, whereas `'page'` mode guarantees it starts at rest.
   */
  source?: 'element' | 'page';
  /** Scroll range in pixels for `source: 'page'`. Default `[0, 800]`. */
  pageRange?: [number, number];
}

export interface ParallaxResult<T extends HTMLElement = HTMLDivElement> {
  /** Attach to the element you want to move (unless `track` is supplied). */
  ref: RefObject<T | null>;
  /** 0 → 1 across the configured offset. Useful for deriving your own values. */
  progress: MotionValue<number>;
  /** Spread onto a `motion.*` element's `style` prop. */
  style: MotionStyle;
}

/**
 * Scroll-linked parallax for a single element.
 *
 * Returns motion values rather than applying them, so the caller decides which
 * element they land on and can compose them with its own styles.
 *
 * Under `prefers-reduced-motion: reduce` every output collapses to its resting
 * value (no translation, no rotation, scale 1) while keeping the same hook call
 * order — the element simply renders where it belongs.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({
  speed = 0,
  drift = 0,
  rotate,
  scale,
  offset = ['start end', 'end start'],
  smooth = true,
  track,
  source = 'element',
  pageRange = [0, 800],
}: ParallaxOptions = {}): ParallaxResult<T> {
  const localRef = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Both are called unconditionally to keep hook order stable; only the one
  // matching `source` is read.
  const elementScroll = useScroll({
    target: (track ?? localRef) as RefObject<HTMLElement>,
    offset,
  });
  const pageScroll = useScroll();

  const pageProgress = useTransform(pageScroll.scrollY, pageRange, [0, 1], {
    clamp: true,
  });
  const rawProgress = source === 'page' ? pageProgress : elementScroll.scrollYProgress;

  // Always call the hook; `smooth: false` just passes the raw value through.
  const smoothed = useSpring(rawProgress, motionTokens.parallaxSpring);
  const progress = smooth ? smoothed : rawProgress;

  // When reduced motion is on, every range collapses to a single value, which
  // makes the resulting MotionValue a constant.
  const still = prefersReducedMotion;

  /**
   * Element mode centres the travel on the element's resting position, so it
   * sits exactly where the layout puts it as it crosses the middle of the
   * viewport. Page mode starts the travel at zero instead — above-the-fold
   * content must be undisplaced at scroll position 0.
   */
  const span = (distance: number): [number, number] =>
    source === 'page' ? [0, distance] : [-distance / 2, distance / 2];

  const y = useTransform(progress, [0, 1], still ? [0, 0] : span(speed));
  const x = useTransform(progress, [0, 1], still ? [0, 0] : span(drift));
  const rotateZ = useTransform(
    progress,
    [0, 1],
    still || !rotate ? [0, 0] : rotate,
  );
  const scaleValue = useTransform(
    progress,
    [0, 1],
    still || !scale ? [1, 1] : scale,
  );

  const style: MotionStyle = { y };
  if (drift) style.x = x;
  if (rotate) style.rotate = rotateZ;
  if (scale) style.scale = scaleValue;

  return { ref: localRef, progress, style };
}
