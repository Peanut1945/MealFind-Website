/**
 * Central design tokens for the MealFind marketing site.
 *
 * These values are the single source of truth. They are mirrored into Tailwind
 * via the `@theme` block in `src/app/globals.css` — if you change a colour here,
 * change it there too (Tailwind v4 reads its tokens from CSS, not JS).
 *
 * Import from here when you need a raw value in JS/TS (canvas, SVG fills,
 * `theme-color` meta, motion interpolation, etc.).
 */

export const colors = {
  /** Page background — warm cream / off-white. */
  cream: '#F5F3EC',
  /** Slightly deeper cream used for alternating bands. */
  creamDeep: '#EFEDE3',
  /** Card and phone-bezel white. */
  paper: '#FFFFFF',

  /** Primary brand — deep forest green. Buttons, headlines, the stat band. */
  forest: '#1F3D2B',
  /** Hover/pressed state for forest surfaces. */
  forestDark: '#162C1F',
  /** Mid green for secondary text on cream. */
  moss: '#3F5F4A',

  /** Soft green used for the in-app screen backgrounds. */
  appGreen: '#C9E4A4',
  /** Lighter tint for app cards / rows. */
  appGreenLight: '#DCEDC1',
  /** Deeper tint for app chips and active states. */
  appGreenDeep: '#A8D178',
  /** Accent green that reads bright against forest (the "−31%" figure). */
  limeAccent: '#B7E36B',

  /** Body copy on cream. */
  ink: '#25302A',
  /** Muted body copy / captions. */
  inkMuted: '#6B7A70',
  /** Hairline borders. */
  line: '#E2DFD3',
} as const;

export const radii = {
  pill: '9999px',
  card: '1.25rem',
  phone: '2.75rem',
  screen: '2.25rem',
} as const;

export const shadows = {
  card: '0 1px 2px rgba(31,61,43,0.04), 0 8px 24px -12px rgba(31,61,43,0.12)',
  float: '0 2px 6px rgba(31,61,43,0.06), 0 18px 40px -18px rgba(31,61,43,0.28)',
  phone: '0 40px 80px -32px rgba(31,61,43,0.45), 0 8px 24px -12px rgba(31,61,43,0.25)',
} as const;

/**
 * Motion constants. Every animated component reads its timing from here so the
 * whole page shares one rhythm. All of it is bypassed when the user has
 * `prefers-reduced-motion: reduce` set — see `useReducedMotion`.
 */
export const motion = {
  /** Standard ease for entrance animations (gentle, slightly overshoot-free). */
  ease: [0.22, 1, 0.36, 1] as const,
  /** Duration for a section entrance, in seconds. */
  enter: 0.75,
  /** Delay between staggered children, in seconds. */
  stagger: 0.09,
  /** Spring used to smooth scroll-linked parallax values. */
  parallaxSpring: { stiffness: 90, damping: 26, mass: 0.45 },
} as const;

export type ThemeColor = keyof typeof colors;
