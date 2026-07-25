'use client';

import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { PhoneMockup } from '@/components/phone/PhoneMockup';
import { PhoneScreenshot, SCREENS } from '@/components/phone/PhoneScreenshot';
import { CTAButton } from '@/components/ui/CTAButton';
import { FloatingLabel } from '@/components/ui/FloatingLabel';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { ArrowRight } from '@/components/ui/icons';
import { siteConfig } from '@/lib/site';

/**
 * Above-the-fold hero.
 *
 * Two deliberate choices here, both about not making visible content wait:
 *
 * 1. Parallax is driven by raw page scroll (`source: 'page'`), not the elements'
 *    own viewport intersection. These elements are already in view on load, so
 *    element-relative progress would start mid-range and render them
 *    pre-displaced. Page mode guarantees they sit exactly where the layout puts
 *    them at scroll position 0, then drift apart as you leave.
 *
 * 2. Reveals use `trigger="mount"` rather than waiting for an
 *    IntersectionObserver. The hero contains the LCP element; making it depend
 *    on an observer callback risks a blank hero for no benefit.
 *
 * Depth ordering, nearest to furthest: floating labels (largest travel), then
 * the phone, then the headline block (smallest). That inversion, with the
 * foreground moving most, is what sells the sense of layers.
 */
export function Hero() {
  return (
    <section
      className="relative overflow-x-clip pt-32 pb-16 sm:pt-40 sm:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Soft radial wash behind the phone. Decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[22rem] -z-10 mx-auto h-[34rem] max-w-3xl rounded-full bg-app-green/25 blur-[110px]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Copy block, drifting up gently as it leaves. */}
        <ParallaxLayer source="page" speed={-56} pageRange={[0, 700]}>
          <Reveal stagger trigger="mount">
            <RevealItem>
              <ScriptAccent centered>{siteConfig.slogan}</ScriptAccent>
            </RevealItem>

            <RevealItem>
              <h1
                id="hero-heading"
                className="text-balance-heading mt-4 text-center font-display text-[clamp(2.75rem,8.5vw,5.25rem)] leading-[0.94] font-bold tracking-[-0.045em] text-forest"
              >
                Good food,
                <br />
                priced right.
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="mx-auto mt-6 max-w-lg text-center text-[0.9375rem] leading-relaxed text-ink-muted sm:text-base">
                Find a recipe you actually want to cook, see what the whole
                thing costs at each supermarket, and shop from one list. Free.
              </p>
            </RevealItem>

            <RevealItem>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTAButton href={siteConfig.links.beta} size="lg">
                  Join the beta
                </CTAButton>
                <CTAButton href="#how-it-works" variant="secondary" size="lg">
                  See what it does
                  <ArrowRight className="size-4" />
                </CTAButton>
              </div>
            </RevealItem>
          </Reveal>
        </ParallaxLayer>

        {/* Phone + floating labels */}
        <div className="relative mt-12 flex justify-center sm:mt-14">
          <ParallaxLayer source="page" speed={-88} pageRange={[0, 900]}>
            <Reveal direction="up" delay={0.25} trigger="mount">
              <PhoneMockup
                className="w-[256px] sm:w-[296px]"
                label={SCREENS.weeklyPlan.label}
              >
                <PhoneScreenshot src={SCREENS.weeklyPlan.src} priority />
              </PhoneMockup>
            </Reveal>
          </ParallaxLayer>

          {/* Floating callouts. Nearest layer, so they travel furthest.
              Hidden below `sm`: at phone widths they would cover the screen. */}
          <ParallaxLayer
            source="page"
            speed={-150}
            drift={26}
            pageRange={[0, 900]}
            className="pointer-events-none absolute top-[14%] right-[calc(50%-13.5rem)] hidden sm:block lg:right-[calc(50%-17rem)]"
          >
            <Reveal direction="left" delay={0.55} trigger="mount">
              <FloatingLabel
                leading={<span className="size-1.5 rounded-full bg-app-green-deep" />}
              >
                Macros on every card
              </FloatingLabel>
            </Reveal>
          </ParallaxLayer>

          <ParallaxLayer
            source="page"
            speed={-118}
            drift={-22}
            pageRange={[0, 900]}
            className="pointer-events-none absolute bottom-[24%] left-[calc(50%-14rem)] hidden sm:block lg:left-[calc(50%-17.5rem)]"
          >
            <Reveal direction="right" delay={0.68} trigger="mount">
              <FloatingLabel leading={<span aria-hidden>&pound;</span>} tone="lime">
                Priced by supermarket
              </FloatingLabel>
            </Reveal>
          </ParallaxLayer>
        </div>

        {/* Retailer strip */}
        <Reveal delay={0.35} trigger="mount">
          <div className="mt-14 flex flex-col items-center gap-3 sm:mt-16">
            <p className="text-[0.6875rem] font-medium tracking-[0.14em] text-ink-muted/70 uppercase">
              Comparing prices across
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {siteConfig.retailers.map((retailer) => (
                <li
                  key={retailer}
                  className="font-display text-[0.9375rem] font-semibold tracking-[-0.02em] text-forest/35"
                >
                  {retailer}
                </li>
              ))}
            </ul>
            <p className="text-[0.75rem] text-ink-muted/70">
              More supermarkets as we add them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
