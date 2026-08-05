import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { Section } from '@/components/ui/Section';

/**
 * "About MealFind" — the long-form founder narrative.
 *
 * Set at a wider measure and larger size than the rest of the page: this is the
 * only block on the site anyone reads straight through, so it gets editorial
 * body copy rather than marketing captions. Paragraphs stagger in one after the
 * other, which reads as pacing rather than decoration at this length.
 */
export function AboutStory() {
  return (
    <Section tone="creamDeep" width="narrow" aria-labelledby="story-heading">
      <Reveal stagger>
        <RevealItem>
          <ScriptAccent centered>our story</ScriptAccent>
        </RevealItem>

        <RevealItem>
          <h2
            id="story-heading"
            className="text-balance-heading mt-3 text-center font-display text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.06] font-bold tracking-[-0.04em] text-forest"
          >
            About MealFind
          </h2>
        </RevealItem>
      </Reveal>

      <Reveal stagger delay={0.08}>
        <div className="mt-12 space-y-6 text-[1.0625rem] leading-[1.75] text-ink/85">
          <RevealItem as="p">
            Created by two university students with a shared passion for food
            and a simple goal: to make healthy eating more accessible,
            affordable, and enjoyable.
          </RevealItem>

          <RevealItem as="p">
            Born in university halls, seeing students struggle to find meals
            that fit their budget and knowing what to cook. Healthy eating is
            too often seen as expensive, complicated, or time-consuming, and we
            wanted to change that.
          </RevealItem>

          <RevealItem as="p">
            Food has always mattered to us: one of us spent years cooking
            professionally before coming to university, the other grew up in a
            family where food, cooking, and hospitality were central. That is
            the standard we hold the recipes to: clear technique, timings that
            are actually realistic, and ingredient data you can trust.
          </RevealItem>
        </div>
      </Reveal>

      {/* The quote sits on its own plane — it drifts with the scroll while the
          paragraphs around it stay put. */}
      <ParallaxLayer speed={26}>
        <Reveal>
          <figure className="my-12">
            <blockquote className="border-l-[3px] border-app-green-deep pl-6 sm:pl-8">
              {/* `italic` is explicit: the accent face is loaded italic-only,
                  but the Georgia fallback needs telling. */}
              <p className="font-accent text-[1.25rem] leading-[1.6] text-forest italic sm:text-[1.4375rem]">
                Growing up, my Nani would often tell me, &lsquo;healthy body,
                healthy mind.&rsquo; It&rsquo;s a simple phrase, but one that
                has stayed with me. We believe good food is about much more than
                calories or macros. It&rsquo;s about feeling your best,
                supporting your wellbeing, and building habits that help you
                live a healthier, happier life.
              </p>
            </blockquote>
          </figure>
        </Reveal>
      </ParallaxLayer>

      <Reveal stagger>
        <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-ink/85">
          <RevealItem as="p">
            As the cost of living rises, this challenge extends beyond
            students. More people want to eat well without overspending.
          </RevealItem>

          <RevealItem as="p">
            Whether the goal is saving money, more protein, more fibre, better
            meal prep, or discovering new meals, MealFind is designed to help,
            combining personalised recipe discovery, nutritional insights, and
            budget-conscious meal planning.
          </RevealItem>

          <RevealItem as="p">
            We are building it in Lancaster, in the open, with students testing
            it as we go. Version 1.2 is in the hands of testers now; what they
            tell us decides what gets built next. The core app will stay free,
            because the people who most need help with a food budget are the
            last people who should be asked to pay for it.
          </RevealItem>

          <RevealItem as="p">
            We&rsquo;re only getting started, with ambitious plans, but a simple
            mission: a community that makes healthy eating easier, more
            affordable, and more accessible for everyone.
          </RevealItem>
        </div>

        <RevealItem>
          <p className="mt-12 text-center font-accent text-[1.375rem] text-forest italic sm:text-[1.625rem]">
            Welcome to MealFind.
          </p>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
