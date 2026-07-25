'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motion as motionTokens } from '@/lib/tokens';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * The intrinsic elements a Reveal is allowed to render as, resolved once at
 * module load to Framer's pre-built motion components.
 *
 * Built as a static table rather than a `motion[tag]` lookup or a
 * `motion.create()` call inside the component. Anything that produces a
 * component *type* during render is treated by React as a brand-new component
 * on every pass — the subtree remounts and any animation inside it restarts.
 * Resolving them up front makes each one referentially stable for the app's
 * lifetime.
 */
const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type RevealTag = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Which way the element travels in from. Default `up`. */
  direction?: Direction;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  /** Render as something other than a `div` — e.g. `h2`, `p`, `ul`. */
  as?: RevealTag;
  /**
   * Stagger direct children instead of animating the wrapper as one block.
   * Each child should be a `<RevealItem>`.
   */
  stagger?: boolean;
  /** How much of the element must be visible before it fires. Default 0.2. */
  amount?: number;
  /**
   * What starts the animation.
   *
   * `'view'` (default) waits for the element to scroll into view — right for
   * everything below the fold.
   *
   * `'mount'` runs as soon as the component hydrates. Use it for above-the-fold
   * content: that content is already visible, so making it wait on an
   * IntersectionObserver callback adds a frame of risk for no benefit, and if
   * the observer is delayed the hero — usually the LCP element — is left blank.
   */
  trigger?: 'view' | 'mount';
}

/**
 * Fade-and-slide entrance, fired once when the element scrolls into view.
 *
 * Under reduced motion the wrapper renders as a plain element with no variants
 * at all, so content is present and fully opaque from first paint — never left
 * stranded at `opacity: 0` if an observer fails to fire.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  as = 'div',
  stagger = false,
  amount = 0.2,
  trigger = 'view',
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = MOTION_TAGS[as];
  const { x, y } = OFFSET[direction];

  const variants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: motionTokens.stagger,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: motionTokens.enter,
            ease: motionTokens.ease,
            delay,
          },
        },
      };

  const triggerProps =
    trigger === 'mount'
      ? { animate: 'visible' as const }
      : { whileInView: 'visible' as const, viewport: { once: true, amount } };

  return (
    <Component
      className={className}
      data-reveal=""
      variants={variants}
      initial="hidden"
      {...triggerProps}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: RevealTag;
}

/**
 * A single staggered child. Only meaningful inside `<Reveal stagger>` — it
 * inherits the `hidden`/`visible` state from the parent rather than running its
 * own viewport observer.
 *
 * Exported as its own named component rather than hung off `Reveal` as
 * `Reveal.Item`. A server component that imports a client component receives a
 * client *reference*, not the function itself, so static properties attached to
 * it resolve to `undefined` and React fails with "Element type is invalid".
 * A plain named export crosses the boundary correctly from either side.
 */
export function RevealItem({
  children,
  className,
  direction = 'up',
  as = 'div',
}: RevealItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = MOTION_TAGS[as];
  const { x, y } = OFFSET[direction];

  return (
    <Component
      className={className}
      data-reveal=""
      variants={{
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: motionTokens.enter, ease: motionTokens.ease },
        },
      }}
    >
      {children}
    </Component>
  );
}
