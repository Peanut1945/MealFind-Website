import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { LogoMark } from '@/components/ui/Logo';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { LeafMark } from '@/components/ui/icons';

/**
 * The /about masthead — the page's single `<h1>`.
 *
 * Follows the home hero's two above-the-fold rules: reveals fire on mount
 * rather than waiting for an IntersectionObserver, and parallax is driven by
 * raw page scroll (`source: 'page'`) so nothing renders pre-displaced at scroll
 * position 0. See `Hero.tsx` for the full reasoning.
 */
export function AboutHero() {
  return (
    <section
      className="relative overflow-x-clip pt-32 pb-16 sm:pt-40 sm:pb-20"
      aria-labelledby="about-heading"
    >
      {/* Soft radial wash, mirroring the home hero. Decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[26rem] max-w-2xl rounded-full bg-app-green/25 blur-[110px]"
      />

      {/* Oversized leaf drifting behind the headline. Furthest layer, so it
          travels least and stays out of the reading path. */}
      <ParallaxLayer
        source="page"
        speed={64}
        rotate={[-8, 4]}
        pageRange={[0, 900]}
        className="pointer-events-none absolute top-16 right-[calc(50%-22rem)] -z-10 hidden lg:block"
      >
        <LeafMark aria-hidden className="size-56 text-app-green/35" />
      </ParallaxLayer>

      <ParallaxLayer
        source="page"
        speed={-100}
        rotate={[6, -3]}
        pageRange={[0, 900]}
        className="pointer-events-none absolute bottom-4 left-[calc(50%-24rem)] -z-10 hidden lg:block"
      >
        <LeafMark aria-hidden className="size-32 -scale-x-100 text-app-green-deep/25" />
      </ParallaxLayer>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <ParallaxLayer source="page" speed={-48} pageRange={[0, 700]}>
          <Reveal stagger trigger="mount">
            <RevealItem>
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-app-green/60 ring-8 ring-app-green/20">
                <LogoMark className="size-9" />
              </span>
            </RevealItem>

            <RevealItem>
              <h1
                id="about-heading"
                className="mt-8 text-center font-display text-[clamp(2.75rem,8.5vw,5.25rem)] leading-[0.94] font-bold tracking-[-0.045em] text-forest"
              >
                About
              </h1>
            </RevealItem>

            <RevealItem>
              <ScriptAccent centered className="mt-5">
                healthy body, healthy mind
              </ScriptAccent>
            </RevealItem>

            <RevealItem>
              <p className="text-balance-heading mx-auto mt-6 max-w-xl text-center text-[1.0625rem] leading-relaxed text-ink-muted sm:text-[1.1875rem]">
                We&rsquo;re on a mission to make healthy eating simple,
                delicious and accessible for everyone.
              </p>
            </RevealItem>
          </Reveal>
        </ParallaxLayer>
      </div>
    </section>
  );
}
