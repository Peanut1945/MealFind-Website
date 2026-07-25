import type { Metadata } from 'next';

import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutStory } from '@/components/sections/about/AboutStory';
import { BuiltWithCare } from '@/components/sections/about/BuiltWithCare';
import { OurMission } from '@/components/sections/about/OurMission';
import { StudentValues } from '@/components/sections/about/StudentValues';
import { WhatIsMealFind } from '@/components/sections/about/WhatIsMealFind';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteNav } from '@/components/sections/SiteNav';
import { siteConfig } from '@/lib/site';

const title = 'About & our mission';
const description =
  'MealFind was built by two university students to make healthy eating simple, affordable and accessible. Read our story, our values and the mission behind the app.';
const url = `${siteConfig.url}/about/`;

/**
 * `openGraph` and `twitter` are declared in full rather than partially.
 * Metadata merges *shallowly*, so naming either key here replaces the root
 * layout's object outright — listing only a title would silently drop the OG
 * image, site name and locale from this page's tags.
 */
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url,
    siteName: siteConfig.name,
    title: `${title} — ${siteConfig.name}`,
    description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — made by students, for healthy living.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${title} — ${siteConfig.name}`,
    description,
    images: ['/og.png'],
  },
};

/**
 * Structured data for this page.
 *
 * The `Organization` and `WebSite` nodes already ship from the root layout on
 * every route, so they're referenced by `@id` here instead of being redefined —
 * two nodes sharing an `@id` with different properties is a conflict, not a
 * merge.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${url}#aboutpage`,
  url,
  name: `${title} — ${siteConfig.name}`,
  description,
  inLanguage: 'en-GB',
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  about: { '@id': `${siteConfig.url}/#org` },
  publisher: { '@id': `${siteConfig.url}/#org` },
  primaryImageOfPage: `${siteConfig.url}/og.png`,
};

/**
 * /about — the web adaptation of the app's About screen.
 *
 * `AboutHero` owns the page's single `<h1>`; every section below opens with an
 * `<h2>` (several of them supplied by `<IconCard>`), each wired to its band via
 * `aria-labelledby`, so the outline stays flat and complete.
 */
export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <main id="main">
        <AboutHero />
        <WhatIsMealFind />
        <StudentValues />
        <OurMission />
        <AboutStory />
        <BuiltWithCare />
        <FinalCTA />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        // Build-time constant, and `<` is escaped per the Next JSON-LD guide.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
