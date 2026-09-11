import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { IconCard } from '@/components/ui/IconCard';
import { Section } from '@/components/ui/Section';
import { Restaurant } from '@/components/ui/icons';

/**
 * The mission statement, as the page's one inverted forest card.
 *
 * Drifts against the scroll (`speed: -28`) so it lifts slightly out of the band
 * as it passes — enough to read as a separate plane, small enough not to look
 * like a layout bug. The layer collapses to zero travel under reduced motion.
 *
 * That drift is the card's entrance; there is no `<Reveal>` on top of it. A
 * fade *and* a lift on the same element cancelled each other out — the card
 * spent the first half of its travel invisible.
 */
export function OurMission() {
  return (
    <Section tone="cream" width="narrow" aria-labelledby="mission-heading">
      <ParallaxLayer speed={-28}>
        <IconCard
          icon={Restaurant}
          title="Our mission"
          titleId="mission-heading"
          tone="forest"
          size="lg"
          align="center"
        >
          <p className="text-balance-heading mx-auto max-w-xl font-display font-medium tracking-[-0.02em]">
            To inspire better eating habits through simple recipes, smart
            features and a love for real food.
          </p>
        </IconCard>
      </ParallaxLayer>
    </Section>
  );
}
