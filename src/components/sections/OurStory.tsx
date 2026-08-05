import Link from 'next/link';

import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { Section } from '@/components/ui/Section';
import { ValueCard } from '@/components/ui/ValueCard';
import { ArrowRight, GraduationCap, HeartPulse, People, PriceTag } from '@/components/ui/icons';

const VALUES = [
  {
    icon: GraduationCap,
    title: 'Student built',
    body: 'Designed and maintained by people who lived the problem: cooking well on a loan that ran out in week six.',
    tint: 'lime' as const,
  },
  {
    icon: PriceTag,
    title: 'Priced by supermarket',
    body: 'Every recipe is costed at Tesco, Sainsbury’s and ASDA, so you know what the whole thing comes to before you shop.',
    tint: 'sage' as const,
  },
  {
    icon: HeartPulse,
    title: 'Health focused',
    body: 'Every recipe carries real macros and portion sizes, so eating cheaply never has to mean eating badly.',
    tint: 'butter' as const,
  },
  {
    icon: People,
    title: 'Free to use',
    body: 'The core app costs nothing. The people who most need help with a food budget should not have to pay for it.',
    tint: 'sky' as const,
  },
];

/**
 * "Made by students, for healthy living" — the story block and its four value
 * cards.
 *
 * No scroll-linked motion here beyond the entrance reveals, so this file stays
 * free of `'use client'`; only `<Reveal>` crosses into the client bundle.
 */
export function OurStory() {
  return (
    <Section id="our-story" tone="cream" aria-labelledby="our-story-heading">
      <Reveal stagger>
        <RevealItem>
          <ScriptAccent centered>our story</ScriptAccent>
        </RevealItem>

        <RevealItem>
          <h2
            id="our-story-heading"
            className="text-balance-heading mx-auto mt-3 max-w-3xl text-center font-display text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.04] font-bold tracking-[-0.04em] text-forest"
          >
            Made by students, for healthy living.
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mx-auto mt-6 max-w-xl text-center text-[0.9375rem] leading-relaxed text-ink-muted">
            Two students, one of them a chef, who got tired of juggling a recipe
            site, a macro tracker and three supermarket tabs just to answer one
            question: what should I cook this week that I can actually afford?
          </p>
        </RevealItem>
      </Reveal>

      <Reveal stagger delay={0.1}>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <RevealItem key={value.title} as="li" className="h-full">
              <ValueCard {...value} />
            </RevealItem>
          ))}
        </ul>

        <RevealItem>
          <div className="mt-10 flex justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full text-[0.875rem] font-medium text-forest transition-colors hover:text-forest-dark"
            >
              Read our full story
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
