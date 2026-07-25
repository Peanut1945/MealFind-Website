'use client';

import { CountUp } from '@/components/motion/CountUp';
import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Reveal } from '@/components/motion/Reveal';

/**
 * The full-bleed forest band carrying the headline stat.
 *
 * The figure counts up the first time it scrolls into view. `CountUp` keeps the
 * final value in the DOM as real text throughout, so crawlers and screen
 * readers get "19.2%" whether or not the animation runs.
 *
 * This used to read "−31% less food waste", which was invented for the mock. It
 * now carries a published figure with its source named on screen: ONS food and
 * non-alcoholic drink inflation, which peaked at 19.2% in the year to March
 * 2023. The rule is worth keeping — a number on a marketing page either has a
 * source under it or it does not go up. Savings claims especially have to wait
 * for real beta data, because "we saved you £X" is a promise the app then has
 * to be able to prove.
 */
export function StatBand() {
  return (
    <section
      aria-labelledby="stat-heading"
      className="relative overflow-hidden bg-forest py-20 text-cream sm:py-24"
    >
      {/* Oversized decorative glow, drifting slowly behind the copy. */}
      <ParallaxLayer
        speed={60}
        className="pointer-events-none absolute -top-24 left-1/2 -z-0 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-lime-accent/10 blur-[90px]"
      >
        <span />
      </ParallaxLayer>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8 lg:flex-row lg:gap-14 lg:text-left">
        <Reveal direction="right">
          <p
            id="stat-heading"
            className="font-display text-[clamp(3.5rem,11vw,7rem)] leading-none font-bold tracking-[-0.05em] text-lime-accent"
          >
            <CountUp to={19.2} decimals={1} suffix="%" duration={1.8} />
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.12}>
          <div className="max-w-md">
            <p className="font-display text-[clamp(1.25rem,2.6vw,1.75rem)] leading-snug font-semibold tracking-[-0.025em]">
              food price inflation, at its peak
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-cream/60">
              Shopping never quite went back to normal, and eating well got
              quietly harder. That is the problem we started with.
            </p>
            <p className="mt-4 text-[0.75rem] text-cream/40">
              ONS, food and non-alcoholic beverages, year to March 2023.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
