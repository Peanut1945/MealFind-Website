import type { Metadata } from 'next';

import { MotionProvider } from '@/components/motion/MotionProvider';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { HonestPrices } from '@/components/sections/HonestPrices';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { InTheApp } from '@/components/sections/InTheApp';
import { OurStory } from '@/components/sections/OurStory';
import { RecipeBox } from '@/components/sections/RecipeBox';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteNav } from '@/components/sections/SiteNav';
import { StatBand } from '@/components/sections/StatBand';

/**
 * Only the canonical URL. Title, description, Open Graph and Twitter all come
 * from the root layout, which describes the home page already — and because
 * metadata merges shallowly, naming `openGraph` here just to repeat it would
 * replace the layout's object wholesale and drop anything not restated.
 *
 * The canonical is declared here rather than inherited so that no route can
 * pick one up by accident — see the note in `layout.tsx`.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * The whole marketing page, in the order the design lays it out.
 *
 * Section order is also the heading order: Hero owns the single `<h1>`, and
 * every section below it opens with an `<h2>` (visible or screen-reader-only)
 * so the document outline stays flat and complete.
 *
 * `MotionProvider` wraps the animated sections rather than the root layout, so
 * that Framer Motion ships with the pages that use it instead of with every
 * route — see the note in that component.
 */
export default function HomePage() {
  return (
    <>
      <SiteNav />

      <MotionProvider>
        <main id="main">
          <Hero />
          <HowItWorks />
          <RecipeBox />
          <HonestPrices />
          <InTheApp />
          <OurStory />
          <StatBand />
          <FinalCTA />
        </main>
      </MotionProvider>

      <SiteFooter />
    </>
  );
}
