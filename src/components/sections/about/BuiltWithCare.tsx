import { IconCard } from '@/components/ui/IconCard';
import { Section } from '@/components/ui/Section';
import { Code } from '@/components/ui/icons';

/**
 * The sign-off card that closes the story.
 *
 * Still, deliberately. It is the last thing before the call to action, and
 * giving both of them an entrance meant the CTA arrived as one more fade in a
 * queue rather than as the page's final beat.
 */
export function BuiltWithCare() {
  return (
    <Section tone="cream" spacing="tight" width="narrow" aria-labelledby="built-heading">
      <IconCard icon={Code} title="Built with care" titleId="built-heading">
        <p>
          Built with passion, lots of coffee, and the goal of making healthy
          eating easier for students and everyone on the go.
        </p>
      </IconCard>

      <p className="mt-8 text-center text-[0.9375rem] leading-relaxed text-ink-muted">
        Thank you for being part of our journey!
      </p>
    </Section>
  );
}
