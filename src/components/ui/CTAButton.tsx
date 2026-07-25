import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'light' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANT_CLASS: Record<Variant, string> = {
  /** Solid forest pill — the main action on cream backgrounds. */
  primary:
    'bg-forest text-cream hover:bg-forest-dark shadow-[0_1px_2px_rgb(31_61_43/0.2)] hover:shadow-[0_6px_16px_-6px_rgb(31_61_43/0.5)]',
  /** Outlined pill for the secondary action beside a primary. */
  secondary:
    'border border-forest/25 bg-transparent text-forest hover:border-forest/60 hover:bg-forest/5',
  /** Cream pill for use on the forest band. */
  light: 'bg-cream text-forest hover:bg-white shadow-[0_6px_20px_-8px_rgb(0_0_0/0.35)]',
  /** Text-only, for tertiary links that still want the button hit area. */
  ghost: 'bg-transparent text-forest hover:bg-forest/5',
};

const SIZE_CLASS: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-[3.25rem] px-8 text-[0.9375rem]',
};

interface CTAButtonProps {
  children: ReactNode;
  /** Renders an anchor. Omit to render a `<button>`. */
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  /** Opens in a new tab and adds the required rel + assistive-text hint. */
  external?: boolean;
  /** Extra context for screen readers when the label alone is ambiguous. */
  'aria-label'?: string;
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] ' +
  'transition-[background-color,box-shadow,border-color,transform] duration-200 ease-out ' +
  'active:translate-y-px motion-reduce:active:translate-y-0 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 whitespace-nowrap';

/**
 * The site's pill button, as an anchor or a real `<button>`.
 *
 * In-page links (`/#beta`) go through `next/link` and are intercepted by Lenis
 * for smooth scrolling; external links get `target="_blank"` plus the
 * `rel="noopener noreferrer"` pair and a visually-hidden "opens in a new tab".
 *
 * Non-navigational schemes (`mailto:`, `tel:`) render a bare `<a>` — there's no
 * route to prefetch or client-side transition to make, and handing them to the
 * router only invites it to try.
 */
export function CTAButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  onClick,
  external = false,
  ...aria
}: CTAButtonProps) {
  const classes = cn(BASE, VARIANT_CLASS[variant], SIZE_CLASS[size], className);

  if (href) {
    const externalProps = external
      ? { target: '_blank' as const, rel: 'noopener noreferrer' }
      : {};

    if (/^(mailto|tel):/.test(href)) {
      return (
        <a href={href} className={classes} {...aria}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...externalProps} {...aria}>
        {children}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...aria}>
      {children}
    </button>
  );
}
