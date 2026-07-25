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
 * The whole marketing page, in the order the design lays it out.
 *
 * Section order is also the heading order: Hero owns the single `<h1>`, and
 * every section below it opens with an `<h2>` (visible or screen-reader-only)
 * so the document outline stays flat and complete.
 */
export default function HomePage() {
  return (
    <>
      <SiteNav />

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

      <SiteFooter />
    </>
  );
}
