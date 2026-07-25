'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motion as motionTokens } from '@/lib/tokens';

interface CountUpProps {
  /** The value to land on. */
  to: number;
  /** Where the count starts. Default 0. */
  from?: number;
  /** Seconds. Default 1.6. */
  duration?: number;
  /** Decimal places to render. Default 0. */
  decimals?: number;
  /** Rendered before the number — e.g. a minus sign or currency symbol. */
  prefix?: string;
  /** Rendered after the number — e.g. `%`. */
  suffix?: string;
  className?: string;
}

/**
 * Counts to `to` the first time it scrolls into view.
 *
 * The digits are written straight to the DOM node from the animation callback
 * rather than held in React state. A `setState` per frame would re-render this
 * component (and everything under it) 60 times a second to change one text
 * node — all of it wasted work.
 *
 * The final value is also rendered as real, screen-reader-only text that never
 * changes, so crawlers and assistive tech get "−31%" whether or not the
 * animation runs, and AT isn't made to announce every intermediate frame.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const format = (value: number) => `${prefix}${value.toFixed(decimals)}${suffix}`;
  const finalText = format(to);

  useEffect(() => {
    const node = digitsRef.current;
    if (!node) return;

    if (prefersReducedMotion) {
      node.textContent = finalText;
      return;
    }

    if (!isInView) {
      // Hold at the starting value until the element has actually been seen.
      node.textContent = format(from);
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: motionTokens.ease,
      onUpdate: (value) => {
        node.textContent = format(value);
      },
    });

    return () => controls.stop();
    // `format` is derived from the formatting props, which are all listed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, prefersReducedMotion, from, to, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {/* Stable value for assistive tech and no-JS crawlers. */}
      <span className="sr-only">{finalText}</span>
      {/* Animated digits. Server-renders the final value so there's nothing
          misleading in the HTML if JS never runs. */}
      <span ref={digitsRef} aria-hidden="true">
        {finalText}
      </span>
    </span>
  );
}
