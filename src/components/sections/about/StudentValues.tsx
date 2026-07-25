import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { Section } from '@/components/ui/Section';
import { ValueCard } from '@/components/ui/ValueCard';
import { GraduationCap, Handshake, HeartPulse, People } from '@/components/ui/icons';

/**
 * The app's four values, in the app's own words.
 *
 * Intentionally shorter than the home page's `OurStory` cards: there the copy
 * has to sell the idea cold, here it summarises a page that has already made
 * the argument at length.
 */
const VALUES = [
  {
    icon: GraduationCap,
    title: 'Student built',
    body: 'Designed and developed by students.',
    tint: 'lime' as const,
  },
  {
    icon: HeartPulse,
    title: 'Health focused',
    body: 'Every recipe chosen with health in mind.',
    tint: 'sage' as const,
  },
  {
    icon: People,
    title: 'For everyone',
    body: 'Simple, tasty recipes for any lifestyle.',
    tint: 'butter' as const,
  },
  {
    icon: Handshake,
    title: 'Better together',
    body: 'Building a healthier community, one recipe at a time.',
    tint: 'sky' as const,
  },
];

/** "Made by students, for healthy living" — the italic heading and value grid. */
export function StudentValues() {
  return (
    <Section tone="creamDeep" aria-labelledby="students-heading">
      <Reveal stagger>
        <RevealItem>
          <h2
            id="students-heading"
            className="text-balance-heading mx-auto max-w-3xl text-center font-display text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.08] font-bold tracking-[-0.04em] text-forest"
          >
            Made by{' '}
            <em className="font-accent font-normal tracking-[0.01em] text-moss">
              students
            </em>
            , for healthy living.
          </h2>
        </RevealItem>

        <RevealItem>
          {/* Short rule under the heading — the app screen's divider. */}
          <span
            aria-hidden
            className="mx-auto mt-6 block h-[3px] w-16 rounded-full bg-app-green-deep"
          />
        </RevealItem>

        <RevealItem>
          <p className="mx-auto mt-7 max-w-xl text-center text-[0.9375rem] leading-relaxed text-ink-muted">
            A passionate team of students who believe everyone deserves access
            to nutritious meals and recipes that fit real life.
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
      </Reveal>
    </Section>
  );
}
