import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface FloatingLabelProps {
  children: ReactNode;
  /** Small leading glyph — a dot, price or icon. */
  leading?: ReactNode;
  className?: string;
}

/**
 * The small callouts that hover around the hero phone
 * ("Macros on every card", "Priced by supermarket").
 *
 * Bare text, no chrome — everything sits on cream, so a single forest weight
 * carries them without a badge around each one.
 *
 * Purely decorative — the copy restates what the hero already says — so the
 * whole thing is hidden from assistive tech. Position it with the parent's
 * absolute coordinates and wrap it in a `<ParallaxLayer>` to give it depth.
 */
export function FloatingLabel({ children, leading, className }: FloatingLabelProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center gap-2 text-[0.75rem] font-semibold',
        'tracking-[-0.01em] whitespace-nowrap text-forest',
        className,
      )}
    >
      {leading}
      {children}
    </span>
  );
}
