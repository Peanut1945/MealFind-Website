import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { Section } from '@/components/ui/Section';
import { ValueCard } from '@/components/ui/ValueCard';
import { Check, HeartPulse, LeafMark, Sparkle } from '@/components/ui/icons';

/**
 * The parts of the app that aren't the price comparison.
 *
 * The page above this sells one idea hard — see what a meal costs. This is the
 * "and it's a proper cooking app too" beat, which is what stops MealFind
 * reading as a price widget people open once a month.
 */
const FEATURES = [
  {
    icon: Sparkle,
    title: 'AI Sous Chef',
    body: 'Stuck mid-recipe? Ask. It explains a technique, rescues a split sauce, or talks a nervous beginner through a step, like a calm colleague rather than a chatbot.',
    tint: 'lime' as const,
  },
  {
    icon: HeartPulse,
    title: 'Nutrition that adds up',
    body: 'Protein, fibre, carbs and calories on every recipe, tracked across the week, calculated from ingredient data rather than guessed.',
    tint: 'sage' as const,
  },
  {
    icon: LeafMark,
    title: 'Less in the bin',
    body: 'Your week is sequenced so the ingredients that spoil first get cooked first, and the list only buys what the plan actually needs.',
    tint: 'butter' as const,
  },
  {
    icon: Check,
    title: 'Progress worth watching',
    body: 'Cooking streaks, nutrition trends, money saved, and a map of the cuisines you have worked your way through.',
    tint: 'sky' as const,
  },
];

export function InTheApp() {
  return (
    <Section tone="creamDeep" aria-labelledby="in-the-app-heading">
      <Reveal stagger>
        <RevealItem>
          <ScriptAccent centered>in the app</ScriptAccent>
        </RevealItem>

        <RevealItem>
          <h2
            id="in-the-app-heading"
            className="text-balance-heading mx-auto mt-3 max-w-3xl text-center font-display text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.04] font-bold tracking-[-0.04em] text-forest"
          >
            Three apps&rsquo; worth, in one.
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mx-auto mt-6 max-w-xl text-center text-[0.9375rem] leading-relaxed text-ink-muted">
            Recipe discovery, nutrition tracking and supermarket prices have
            always lived in separate apps that never talk to each other. That is
            the whole reason MealFind exists.
          </p>
        </RevealItem>
      </Reveal>

      <Reveal stagger delay={0.1}>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <RevealItem key={feature.title} as="li" className="h-full">
              <ValueCard {...feature} />
            </RevealItem>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
