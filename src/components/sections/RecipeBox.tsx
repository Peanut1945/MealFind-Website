'use client';

import { useRef } from 'react';

import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { PhoneMockup } from '@/components/phone/PhoneMockup';
import { PhoneScreenshot, SCREENS } from '@/components/phone/PhoneScreenshot';
import { ScriptAccent } from '@/components/ui/ScriptAccent';

/** The app's own browse categories and filters. */
const FEATURE_TAGS = [
  'High protein',
  'Budget meals',
  'Quick meals',
  'Vegetarian',
  'Blue Zone friendly',
  'Seasonal favourites',
];

/**
 * "A recipe box that knows your budget."
 *
 * The phone enters the viewport tilted and un-tilts toward upright as it
 * crosses the middle, then keeps drifting. Rotation and vertical drift are
 * driven by the section's own scroll progress, so the phone reaches upright at
 * roughly the moment the copy beside it is centred.
 */
export function RecipeBox() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="recipe-box-heading"
      className="relative overflow-x-clip bg-cream-deep py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Angled phone. Tilted -9° on entry, upright as it passes the middle
              of the viewport, then a touch past as it leaves. */}
          <div className="relative flex justify-center lg:justify-start">
            <ParallaxLayer
              track={sectionRef}
              speed={70}
              rotate={[-9, 3]}
              className="origin-center"
            >
              <PhoneMockup
                className="w-[280px] sm:w-[320px] lg:w-[340px]"
                label={SCREENS.discover.label}
              >
                <PhoneScreenshot src={SCREENS.discover.src} />
              </PhoneMockup>
            </ParallaxLayer>
          </div>

          {/* Copy */}
          <div>
            <Reveal stagger>
              <RevealItem>
                <ScriptAccent>discover</ScriptAccent>
              </RevealItem>

              <RevealItem>
                <h2
                  id="recipe-box-heading"
                  className="text-balance-heading mt-3 font-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.04em] text-forest"
                >
                  A recipe box that knows your budget.
                </h2>
              </RevealItem>

              <RevealItem>
                <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
                  Browse a personalised feed, search the library, or filter by
                  cost, protein, fibre, cook time or ingredient count. Every
                  recipe carries its full ingredient list, timings and macros
                  up front, so you know what you are committing to before you
                  start.
                </p>
              </RevealItem>

              <RevealItem>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                  {FEATURE_TAGS.map((tagLabel) => (
                    <li
                      key={tagLabel}
                      className="text-[0.8125rem] font-medium text-forest/80"
                    >
                      {tagLabel}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
