import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface FloatingLabelProps {
  children: ReactNode;
  /** Small leading glyph — a dot, price or icon. */
  leading?: ReactNode;
  /**
   * Draw the card behind the text: paper fill, hairline border, soft float
   * shadow. On by default only in the hero, where the labels overlap the radial
   * wash and the phone and need to lift off the background to stay readable.
   * Elsewhere they sit on flat cream, where bare text is enough.
   */
  chrome?: boolean;
  className?: string;
}

/**
 * The small callouts that hover around the hero phone
 * ("Macros on every card", "Priced by supermarket").
 *
 * Bare text by default — everything sits on cream, so a single forest weight
 * carries them without a badge around each one. `chrome` puts the card back.
 *
 * Purely decorative — the copy restates what the hero already says — so the
 * whole thing is hidden from assistive tech. Position it with the parent's
 * absolute coordinates and wrap it in a `<ParallaxLayer>` to give it depth.
 */
export function FloatingLabel({
  children,
  leading,
  chrome = false,
  className,
}: FloatingLabelProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center gap-2 text-[0.75rem] font-semibold',
        'tracking-[-0.01em] whitespace-nowrap text-forest',
        // `rounded-xl` rather than the full pill this used to be: squared off
        // enough to echo the cards further down the page, still soft enough not
        // to read as a box.
        chrome &&
          'rounded-xl border border-line/80 bg-paper px-3.5 py-2 shadow-float backdrop-blur-[2px]',
        className,
      )}
    >
      {leading}
      {children}
    </span>
  );
}
