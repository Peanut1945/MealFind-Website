'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Reveal } from '@/components/motion/Reveal';
import { PhoneMockup } from '@/components/phone/PhoneMockup';
import { PhoneScreenshot, SCREENS } from '@/components/phone/PhoneScreenshot';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { cn } from '@/lib/cn';
import { motion as motionTokens } from '@/lib/tokens';

const STEPS = [
  {
    id: 'swipe',
    title: 'Swipe your week',
    body: 'Swipe through dinners picked for your tastes, your macros and your budget. Keep the ones you like and they drop straight into the week — breakfast, lunch and dinner, day by day.',
    screen: SCREENS.weeklyPlan,
  },
  {
    id: 'prices',
    title: 'Price the whole meal',
    body: 'Not one product at a time — the entire recipe, totalled at each supermarket, so you can see at a glance which shop is cheapest for what you are actually cooking.',
    screen: SCREENS.shoppingListPrices,
  },
  {
    id: 'shop',
    title: 'Shop once, waste nothing',
    body: 'One list, sorted by recipe or grouped by ingredient type, with the exact quantities your plan needs. Tick items off as you go.',
    screen: SCREENS.shoppingListAisles,
  },
] as const;

/**
 * "How it works" — three steps beside a phone that stays pinned while they
 * scroll past, swapping its screen to match the step you're reading.
 *
 * The pinning is plain `position: sticky` rather than a scroll-jacking library:
 * it costs nothing, survives resize, and leaves the scrollbar honest. The
 * active step is derived from the section's scroll progress, split into three
 * equal bands.
 *
 * Below `lg` the phone un-pins and sits under the steps as a single static
 * mockup — a sticky element inside a short column just judders on mobile.
 */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start counting when the section's top reaches 70% down the viewport, and
    // finish when its bottom passes 70% — keeps the swap points aligned with
    // where the text actually is on screen.
    offset: ['start 0.7', 'end 0.7'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const index = Math.min(STEPS.length - 1, Math.max(0, Math.floor(progress * STEPS.length)));
    setActiveStep(index);
  });

  const activeScreen = STEPS[activeStep].screen;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-it-works-heading"
      className="relative overflow-x-clip bg-cream py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <ScriptAccent>how it works</ScriptAccent>
          {/* The design has no visible h2 here — the script accent above plays
              that role visually. A real heading still belongs in the outline,
              so it's present and hidden rather than omitted. */}
          <h2 id="how-it-works-heading" className="sr-only">
            How MealFind works
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          {/*
            Steps.

            On `lg` each step claims ~68vh and centres its own content rather
            than sitting in a flow with gaps. That gives the column enough total
            height for the sticky phone to stay pinned across all three steps —
            with ordinary gaps the column was barely taller than the phone, so
            the phone un-pinned and scrolled away while step 3 was still being
            read. A sticky element can only travel as far as its containing
            block is tall.
          */}
          <ol className="flex flex-col gap-14 sm:gap-20 lg:gap-0">
            {STEPS.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <li
                  key={step.id}
                  className="lg:flex lg:min-h-[68vh] lg:flex-col lg:justify-center"
                >
                  <Reveal>
                    <h3
                      className={cn(
                        'font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight font-bold tracking-[-0.035em]',
                        'transition-colors duration-500',
                        isActive ? 'text-forest' : 'text-forest/30',
                      )}
                    >
                      <span className="tabular-nums">{index + 1}</span>
                      <span aria-hidden className="mx-2 font-normal opacity-50">
                        ·
                      </span>
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-4 max-w-md text-[0.9375rem] leading-relaxed transition-colors duration-500',
                        isActive ? 'text-ink-muted' : 'text-ink-muted/45',
                      )}
                    >
                      {step.body}
                    </p>

                    {/* Progress rail — fills as the step becomes active. */}
                    <span
                      aria-hidden
                      className="mt-6 block h-px w-full max-w-md overflow-hidden bg-line"
                    >
                      <motion.span
                        className="block h-full origin-left bg-forest"
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: motionTokens.ease }}
                      />
                    </span>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* Pinned phone. Offset to the right per the design. */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <ParallaxLayer track={sectionRef} speed={54} rotate={[2.5, -2.5]}>
                <PhoneMockup className="w-[300px]" label={activeScreen.label}>
                  {/* Crossfade between step screens. `mode="wait"` would leave a
                      blank frame mid-scroll, so both screens overlap briefly. */}
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={STEPS[activeStep].id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: motionTokens.ease }}
                    >
                      <PhoneScreenshot src={activeScreen.src} />
                    </motion.div>
                  </AnimatePresence>
                </PhoneMockup>
              </ParallaxLayer>
            </div>
          </div>

          {/* Static phone for narrow screens. */}
          <div className="flex justify-center lg:hidden">
            <ParallaxLayer speed={40}>
              <PhoneMockup className="w-[260px]" label={SCREENS.shoppingListPrices.label}>
                <PhoneScreenshot src={SCREENS.shoppingListPrices.src} />
              </PhoneMockup>
            </ParallaxLayer>
          </div>
        </div>
      </div>
    </section>
  );
}
