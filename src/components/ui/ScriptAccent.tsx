import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Tone = 'moss' | 'cream' | 'forest';

const TONE_CLASS: Record<Tone, string> = {
  moss: 'text-moss/80',
  cream: 'text-cream/70',
  forest: 'text-forest/70',
};

interface ScriptAccentProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Centre the accent above a centred heading. */
  centered?: boolean;
}

/**
 * The italic serif eyebrow that sits above each section heading
 * (the slogan on the home hero, then "how it works", "our story").
 *
 * Rendered as a `<p>`, not a heading — it's decorative phrasing that would
 * otherwise pollute the document outline and get announced as a section title.
 */
export function ScriptAccent({
  children,
  tone = 'moss',
  className,
  centered = false,
}: ScriptAccentProps) {
  return (
    <p
      className={cn(
        'font-accent italic tracking-[0.01em]',
        'text-[1.0625rem] sm:text-[1.1875rem]',
        TONE_CLASS[tone],
        centered && 'text-center',
        className,
      )}
    >
      {children}
    </p>
  );
}
