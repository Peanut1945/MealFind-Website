import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { IconCard } from '@/components/ui/IconCard';
import { Section } from '@/components/ui/Section';
import { Heart } from '@/components/ui/icons';

/** "What is MealFind?" — the one-paragraph answer, as a heart-icon card. */
export function WhatIsMealFind() {
  return (
    <Section tone="cream" spacing="tight" width="narrow" aria-labelledby="what-is-heading">
      <Reveal stagger>
        <RevealItem>
          <IconCard icon={Heart} title="What is MealFind?" titleId="what-is-heading">
            <p>
              MealFind is a recipe app that knows what things cost. Find meals
              worth cooking, see the whole recipe priced at each supermarket,
              shop from one list, and watch the nutrition and the savings add up
              — all in one place, and free to use.
            </p>
          </IconCard>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
