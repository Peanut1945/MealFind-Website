'use client';

import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode, RefObject } from 'react';

import { useParallax, type ParallaxOptions } from '@/hooks/useParallax';

interface ParallaxLayerProps extends ParallaxOptions {
  children: ReactNode;
  className?: string;
  /** Static styles merged under the scroll-linked ones. */
  style?: CSSProperties;
  /** Render as an inline element instead of a block. */
  as?: 'div' | 'span';
}

/**
 * Declarative wrapper around `useParallax`.
 *
 * ```tsx
 * <ParallaxLayer speed={90} rotate={[-6, 2]}>
 *   <PhoneMockup />
 * </ParallaxLayer>
 * ```
 *
 * Nest layers with different `speed` values to build depth — the further the
 * element is meant to feel, the smaller (and usually positive) the speed.
 * `will-change: transform` is set so the compositor keeps each layer on its own
 * GPU texture instead of repainting the section on every frame.
 */
export function ParallaxLayer({
  children,
  className,
  style,
  as = 'div',
  ...options
}: ParallaxLayerProps) {
  const { ref, style: parallaxStyle } = useParallax<HTMLDivElement>(options);
  const Component = as === 'span' ? motion.span : motion.div;

  return (
    <Component
      ref={ref as RefObject<HTMLDivElement & HTMLSpanElement>}
      className={className}
      style={{ ...style, ...parallaxStyle, willChange: 'transform' }}
    >
      {children}
    </Component>
  );
}
