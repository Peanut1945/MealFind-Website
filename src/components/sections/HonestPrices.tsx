import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { Section } from '@/components/ui/Section';

/**
 * "Two numbers, both true" — the pricing methodology, explained on the
 * marketing site rather than buried in the app.
 *
 * This is the section that earns the rest of the page. A recipe needs 50g of
 * butter and the shop sells 250g, so there are two honest answers to "what does
 * this cost" and every comparison tool that quietly picks one looks like it is
 * hiding something. Showing both, and saying why, is the product's whole
 * argument for being trusted with the numbers.
 *
 * Deliberately not a claim about being cheapest — it's a claim about being
 * straight with people, which is the one competitors can't copy by dropping a
 * price.
 */
export function HonestPrices() {
  return (
    <Section tone="cream" aria-labelledby="prices-heading">
      <Reveal stagger>
        <RevealItem>
          <ScriptAccent centered>no funny business</ScriptAccent>
        </RevealItem>

        <RevealItem>
          <h2
            id="prices-heading"
            className="text-balance-heading mx-auto mt-3 max-w-3xl text-center font-display text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.04] font-bold tracking-[-0.04em] text-forest"
          >
            Two numbers, and both of them true.
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mx-auto mt-6 max-w-xl text-center text-[0.9375rem] leading-relaxed text-ink-muted">
            Your recipe needs 50g of butter. The shop sells it in 250g blocks.
            So what did the recipe cost? There are two honest answers, and
            MealFind shows you both.
          </p>
        </RevealItem>
      </Reveal>

      <Reveal stagger delay={0.1}>
        <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <RevealItem as="li" className="h-full">
            <PriceCard
              label="Basket cost"
              body="What you actually hand over at the till — whole packs, real prices, no pretending you can buy 50g of butter."
            />
          </RevealItem>
          <RevealItem as="li" className="h-full">
            <PriceCard
              label="Per-recipe cost"
              body="The share of each pack the recipe really uses, so you can compare one dinner against another without the maths."
            />
          </RevealItem>
        </ul>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-10 max-w-xl text-center text-[0.8125rem] leading-relaxed text-ink-muted/80">
          Prices refresh daily and every comparison carries the time it was last
          checked. Spot one that looks wrong and you can report it in a tap.
        </p>
      </Reveal>
    </Section>
  );
}

function PriceCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex h-full flex-col rounded-card border border-line/70 bg-paper p-7 shadow-card">
      <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-forest">
        {label}
      </p>
      <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
