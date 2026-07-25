import type { SVGProps } from 'react';

/**
 * Inline SVG icon set.
 *
 * Kept inline rather than as sprite files or an icon package: there are only a
 * dozen glyphs, they inherit `currentColor`, and inlining them costs zero
 * network requests. Every icon here is decorative — the surrounding text always
 * carries the meaning — so they're all `aria-hidden`.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

/**
 * A leaf glyph — the oversized parallax art on /about, and the sustainability
 * icon on the home page.
 *
 * Not the logo: that's `<LogoMark>` in `ui/Logo.tsx`, cropped from the real
 * artwork. This one exists because it inherits `currentColor`, which is what
 * lets it be washed out to `text-app-green/35` behind a headline or tinted to
 * match a card badge.
 */
export function LeafMark({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" {...props}>
      <path
        d="M20 4c0 8.5-4.6 13.2-11.2 13.2H5.6C5.6 9.6 10.7 4.8 20 4Z"
        fill="currentColor"
        opacity={0.9}
      />
      <path
        d="M4 20c1.2-4.4 3.6-7.6 7.4-10"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRight({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowDown({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

export function Check({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

/** Student built. */
export function GraduationCap({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" />
      <path d="M6.5 11.2V16c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.8" />
      <path d="M21.5 9v5" />
    </svg>
  );
}

/** Health focused. */
export function HeartPulse({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
      <path d="M4.8 12.4h3l1.4-2.2 1.9 4 1.5-2.6h4" />
    </svg>
  );
}

/**
 * Plain heart — "what is MealFind".
 *
 * Deliberately distinct from `HeartPulse`: the two appear on the same page, and
 * repeating one glyph for two different ideas makes the set read as arbitrary.
 */
export function Heart({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M12 20.3s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.3a4.1 4.1 0 0 1 7.5 2.6c0 4.8-7.5 9.4-7.5 9.4Z" />
    </svg>
  );
}

/** Knife and fork — the mission card. */
export function Restaurant({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M5.8 3v4.6a2.6 2.6 0 0 0 5.2 0V3" />
      <path d="M8.4 10.2V21" />
      <path d="M16.6 21V3c2.3 1.5 3.2 4.3 3.2 7.1 0 2.4-1.3 4.2-3.2 4.5" />
    </svg>
  );
}

/** Angle brackets — "built with care". */
export function Code({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M8.6 6.6 3.4 12l5.2 5.4M15.4 6.6 20.6 12l-5.2 5.4" />
      <path d="M13.6 4.2 10.4 19.8" />
    </svg>
  );
}

/** For everyone. */
export function People({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <circle cx="9" cy="8.5" r="3.1" />
      <path d="M3.4 19.2a5.8 5.8 0 0 1 11.2 0" />
      <path d="M16.2 6.2a3 3 0 0 1 0 5.9M17.6 14.4a5.2 5.2 0 0 1 3.2 4.8" />
    </svg>
  );
}

/** Better together. */
export function Handshake({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="m9.6 13.4 2 2a1.5 1.5 0 0 0 2.2 0l4.4-4.5" />
      <path d="M2.6 9.3 6 6.1a2 2 0 0 1 2.6-.1l2 1.6a1.4 1.4 0 0 0 1.8 0l1.5-1.2a2 2 0 0 1 2.6.1l4 3.6" />
      <path d="M2.6 9.3 6.3 13m14.9-3.5-3.5 3.8M8.4 15.8l1.6 1.6" />
    </svg>
  );
}

/** Price tag, used on the "watch prices race" step. */
export function PriceTag({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M3.5 11.4V4.6a1 1 0 0 1 1-1h6.8a1 1 0 0 1 .7.3l8 8a1 1 0 0 1 0 1.4l-6.8 6.8a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1-.3-.7Z" />
      <circle cx="7.8" cy="7.8" r="1.4" />
    </svg>
  );
}

export function Sparkle({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M12 3.5 13.8 9 19.5 11 13.8 13 12 18.5 10.2 13 4.5 11 10.2 9 12 3.5Z" />
    </svg>
  );
}

/** Apple logo for the App Store button. Solid mark, not a stroke icon. */
export function AppleLogo({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.83-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.32-3.5ZM14.9 5.9c.6-.74 1.01-1.75.9-2.77-.87.04-1.94.59-2.57 1.31-.56.65-1.05 1.7-.92 2.7.98.08 1.98-.5 2.6-1.24Z"
      />
    </svg>
  );
}

/** Google Play triangle for the Play Store button. */
export function GooglePlayLogo({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" {...props}>
      <g fill="currentColor">
        <path d="M3.3 1.8 13.6 12 3.3 22.2A1.5 1.5 0 0 1 2.6 21V3a1.5 1.5 0 0 1 .7-1.2Z" />
        <path d="M4.6 1.2 17 8.2l-2.6 2.6Z" />
        <path d="M4.6 22.8 14.4 13.2 17 15.8Z" />
        <path d="m18.2 8.9 3 1.7a1.6 1.6 0 0 1 0 2.8l-3 1.7-3.1-3.1 3.1-3.1Z" />
      </g>
    </svg>
  );
}
