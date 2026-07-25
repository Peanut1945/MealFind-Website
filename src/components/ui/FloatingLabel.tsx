import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface FloatingLabelProps {
  children: ReactNode;
  /** Small leading glyph — a dot, price or icon. */
  leading?: ReactNode;
  className?: string;
  tone?: 'paper' | 'forest' | 'lime';
}

const TONE_CLASS: Record<NonNullable<FloatingLabelProps['tone']>, string> = {
  paper: 'bg-paper text-forest border-line/80',
  forest: 'bg-forest text-cream border-forest',
  lime: 'bg-app-green text-forest border-app-green-deep/40',
};

/**
 * The small callout pills that hover around the hero phone
 * ("Supermarket 1", "Cheaper for real").
 *
 * Purely decorative — the copy restates what the hero already says — so the
 * whole thing is hidden from assistive tech. Position it with the parent's
 * absolute coordinates and wrap it in a `<ParallaxLayer>` to give it depth.
 */
export function FloatingLabel({
  children,
  leading,
  className,
  tone = 'paper',
}: FloatingLabelProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-2',
        'text-[0.6875rem] font-semibold tracking-[-0.01em] whitespace-nowrap',
        'shadow-float backdrop-blur-[2px]',
        TONE_CLASS[tone],
        className,
      )}
    >
      {leading}
      {children}
    </span>
  );
}
