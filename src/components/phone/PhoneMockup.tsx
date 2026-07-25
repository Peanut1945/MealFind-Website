import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface PhoneMockupProps {
  /**
   * What appears on the screen — a `<PhoneScreenshot>`, which pulls its source
   * and description from the `SCREENS` map:
   *
   * ```tsx
   * <PhoneMockup label={SCREENS.weeklyPlan.label}>
   *   <PhoneScreenshot src={SCREENS.weeklyPlan.src} />
   * </PhoneMockup>
   * ```
   */
  children: ReactNode;
  /** Sizing lives here — e.g. `w-[264px] sm:w-[300px]`. Height follows the ratio. */
  className?: string;
  /** Screen-reader description of what the screen shows. Required — the phone
   *  is meaningful content, not decoration. */
  label: string;
  /** Adds the soft diagonal glass reflection. On by default. */
  glare?: boolean;
  /** Drops the drop-shadow, for phones that sit on an already-dark surface. */
  flat?: boolean;
}

/**
 * An iPhone-proportioned device frame with an arbitrary screen inside.
 *
 * The frame is pure CSS — no image asset — so it stays crisp at any size and
 * costs nothing to load. Aspect ratio is locked at 1:2.16 (roughly a modern
 * iPhone), so callers only ever set a width.
 */
export function PhoneMockup({
  children,
  className,
  label,
  glare = true,
  flat = false,
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        'relative aspect-[1/2.16] w-[264px] shrink-0 rounded-phone',
        'bg-gradient-to-b from-[#2A2F2B] via-[#171C18] to-[#20261F]',
        'p-[0.55rem]',
        !flat && 'shadow-phone',
        className,
      )}
      role="img"
      aria-label={label}
    >
      {/* Bezel highlight — a 1px inner rim catches the light like real glass. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-phone ring-1 ring-white/12 ring-inset"
      />

      {/* Screen. The green well shows through while the screenshot decodes,
          which is the app's own background colour — so the frame never flashes
          empty white. */}
      <div className="relative size-full overflow-hidden rounded-screen bg-app-green">
        {/* Decorative for AT: the frame's aria-label already describes it. */}
        <div aria-hidden className="size-full">
          {children}
        </div>

        {/* Dynamic island */}
        <div
          aria-hidden
          className="absolute top-[0.5rem] left-1/2 h-[1.15rem] w-[4.6rem] -translate-x-1/2 rounded-full bg-[#12160F]"
        />

        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/22 via-transparent to-transparent"
          />
        )}
      </div>

      {/* Side buttons */}
      <span
        aria-hidden
        className="absolute top-[7rem] -left-[2px] h-12 w-[3px] rounded-l-sm bg-[#2E332E]"
      />
      <span
        aria-hidden
        className="absolute top-[5.4rem] -left-[2px] h-7 w-[3px] rounded-l-sm bg-[#2E332E]"
      />
      <span
        aria-hidden
        className="absolute top-[6.6rem] -right-[2px] h-16 w-[3px] rounded-r-sm bg-[#2E332E]"
      />
    </div>
  );
}
