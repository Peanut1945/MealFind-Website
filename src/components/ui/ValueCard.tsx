import type { ComponentType, SVGProps } from 'react';

import { cn } from '@/lib/cn';

interface ValueCardProps {
  /** One of the icons from `@/components/ui/icons`. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  /** Tint for the icon badge — lets the four cards read as a set, not a row. */
  tint?: 'lime' | 'sage' | 'butter' | 'sky';
  className?: string;
}

const TINT_CLASS: Record<NonNullable<ValueCardProps['tint']>, string> = {
  lime: 'bg-app-green text-forest',
  sage: 'bg-app-green-light text-forest',
  butter: 'bg-[#F3E7C4] text-[#6B5A26]',
  sky: 'bg-[#D9E8EC] text-[#2C5561]',
};

/**
 * One of the four "our story" value cards.
 *
 * Renders a plain `<div>`: the four cards are a list of related claims, but the
 * `<li>` belongs to the animation wrapper that positions each one, and
 * `ul > div > li` is invalid. Callers put this inside their own list item.
 */
export function ValueCard({
  icon: Icon,
  title,
  body,
  tint = 'lime',
  className,
}: ValueCardProps) {
  return (
    <div
      className={cn(
        'group flex h-full flex-col rounded-card border border-line/70 bg-paper p-6',
        'shadow-card transition-[transform,box-shadow] duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-float motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <span
        className={cn(
          'mb-5 inline-flex size-11 items-center justify-center rounded-full',
          TINT_CLASS[tint],
        )}
      >
        <Icon className="size-5" />
      </span>

      <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-forest">
        {title}
      </h3>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
