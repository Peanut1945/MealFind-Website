import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Reveal } from '@/components/motion/Reveal';
import { IconCard } from '@/components/ui/IconCard';
import { Section } from '@/components/ui/Section';
import { Restaurant } from '@/components/ui/icons';

/**
 * The mission statement, as the page's one inverted forest card.
 *
 * Drifts against the scroll (`speed: -28`) so it lifts slightly out of the band
 * as it passes — enough to read as a separate plane, small enough not to look
 * like a layout bug. The layer collapses to zero travel under reduced motion.
 */
export function OurMission() {
  return (
    <Section tone="cream" width="narrow" aria-labelledby="mission-heading">
      <ParallaxLayer speed={-28}>
        <Reveal>
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
        </Reveal>
      </ParallaxLayer>
    </Section>
  );
}
