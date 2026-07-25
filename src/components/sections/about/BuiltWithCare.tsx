import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { IconCard } from '@/components/ui/IconCard';
import { Section } from '@/components/ui/Section';
import { Code } from '@/components/ui/icons';

/** The sign-off card that closes the story. */
export function BuiltWithCare() {
  return (
    <Section tone="cream" spacing="tight" width="narrow" aria-labelledby="built-heading">
      <Reveal stagger>
        <RevealItem>
          <IconCard icon={Code} title="Built with care" titleId="built-heading">
            <p>
              Built with passion, lots of coffee, and the goal of making healthy
              eating easier for students and everyone on the go.
            </p>
          </IconCard>
        </RevealItem>

        <RevealItem>
          <p className="mt-8 text-center text-[0.9375rem] leading-relaxed text-ink-muted">
            Thank you for being part of our journey!
          </p>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
