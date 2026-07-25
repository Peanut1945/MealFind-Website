import type { ComponentType, ReactNode, SVGProps } from 'react';

import { cn } from '@/lib/cn';

type Tone = 'paper' | 'forest';
type Size = 'md' | 'lg';

const TONE_CLASS: Record<Tone, string> = {
  paper: 'border-line/70 bg-paper text-ink shadow-card',
  forest: 'border-forest bg-forest text-cream shadow-float',
};

const BADGE_CLASS: Record<Tone, string> = {
  paper: 'bg-app-green text-forest',
  forest: 'bg-cream/12 text-app-green',
};

const TITLE_CLASS: Record<Tone, string> = {
  paper: 'text-forest',
  forest: 'text-cream',
};

const BODY_CLASS: Record<Tone, string> = {
  paper: 'text-ink-muted',
  forest: 'text-cream/80',
};

const SIZE_CLASS: Record<Size, { card: string; title: string; body: string }> = {
  md: {
    card: 'p-7 sm:p-8',
    title: 'text-[1.1875rem] sm:text-[1.3125rem]',
    body: 'mt-3 text-[0.9375rem]',
  },
  lg: {
    card: 'p-8 sm:p-12',
    title: 'text-[1.375rem] sm:text-[1.625rem]',
    body: 'mt-4 text-[1.0625rem] sm:text-[1.1875rem]',
  },
};

interface IconCardProps {
  /** One of the icons from `@/components/ui/icons`. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  children: ReactNode;
  /** `forest` is the inverted feature card used for the mission statement. */
  tone?: Tone;
  size?: Size;
  align?: 'left' | 'center';
  /** Wire to the parent `<Section aria-labelledby>` so the band is named. */
  titleId?: string;
  className?: string;
}

/**
 * A statement card: icon in a round badge, heading, body copy.
 *
 * Distinct from `<ValueCard>`, which is the compact grid tile — this one is a
 * full-width block that carries a paragraph rather than a caption, and gains an
 * inverted forest tone for the mission statement.
 *
 * The heading renders as `<h2>`: every use sits directly under the page `<h1>`
 * as its own section.
 */
export function IconCard({
  icon: Icon,
  title,
  children,
  tone = 'paper',
  size = 'md',
  align = 'left',
  titleId,
  className,
}: IconCardProps) {
  const sizing = SIZE_CLASS[size];

  return (
    <div
      className={cn(
        'rounded-card border',
        TONE_CLASS[tone],
        sizing.card,
        align === 'center' && 'text-center',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex size-12 items-center justify-center rounded-full',
          BADGE_CLASS[tone],
          align === 'center' && 'mx-auto',
        )}
      >
        <Icon className="size-6" />
      </span>

      <h2
        id={titleId}
        className={cn(
          'mt-5 font-display font-bold tracking-[-0.03em]',
          TITLE_CLASS[tone],
          sizing.title,
        )}
      >
        {title}
      </h2>

      <div className={cn('leading-relaxed', BODY_CLASS[tone], sizing.body)}>
        {children}
      </div>
    </div>
  );
}
