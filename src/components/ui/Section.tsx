import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Tone = 'cream' | 'creamDeep' | 'forest' | 'transparent';

const TONE_CLASS: Record<Tone, string> = {
  cream: 'bg-cream text-ink',
  creamDeep: 'bg-cream-deep text-ink',
  forest: 'bg-forest text-cream',
  transparent: '',
};

type Spacing = 'none' | 'tight' | 'normal' | 'loose';

const SPACING_CLASS: Record<Spacing, string> = {
  none: '',
  tight: 'py-16 sm:py-20',
  normal: 'py-20 sm:py-28 lg:py-32',
  loose: 'py-28 sm:py-36 lg:py-44',
};

type Width = 'narrow' | 'default' | 'wide' | 'full';

const WIDTH_CLASS: Record<Width, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
};

interface SectionProps {
  children: ReactNode;
  /** Anchor target. Must match the `href` used in `siteConfig.nav`. */
  id?: string;
  /** Background band. Alternate these to give the page its rhythm. */
  tone?: Tone;
  spacing?: Spacing;
  width?: Width;
  /** Element to render. Use `div` for bands that aren't a real section. */
  as?: ElementType;
  className?: string;
  /** Applied to the inner centred container rather than the outer band. */
  innerClassName?: string;
  /**
   * Accessible name for the section, when the visible heading isn't the right
   * label. Sets `aria-label`; prefer `aria-labelledby` via a heading `id` where
   * a heading already exists.
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/**
 * The page's layout primitive: a full-bleed background band with a centred,
 * padded content column inside it.
 *
 * `overflow-x: clip` (not `hidden`) contains parallax layers that translate
 * outside the band without creating a scroll container — `hidden` would break
 * `position: sticky` for descendants, which the "How it works" section relies on.
 */
export function Section({
  children,
  id,
  tone = 'cream',
  spacing = 'normal',
  width = 'default',
  as: Component = 'section',
  className,
  innerClassName,
  ...aria
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn('relative w-full overflow-x-clip', TONE_CLASS[tone], SPACING_CLASS[spacing], className)}
      {...aria}
    >
      <div className={cn('mx-auto w-full px-5 sm:px-8', WIDTH_CLASS[width], innerClassName)}>
        {children}
      </div>
    </Component>
  );
}
