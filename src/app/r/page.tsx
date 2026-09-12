import type { Metadata } from 'next';

import { RecipeLinkLanding } from '@/components/sections/RecipeLinkLanding';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteNav } from '@/components/sections/SiteNav';
import { openRecipeInAppScript } from '@/lib/redirectScripts';
import { ogImage, siteConfig } from '@/lib/site';

/*
 * ─── Shared recipe links ─────────────────────────────────────────────────────
 *
 * One page serves every `/r/<recipe id>` URL the app has ever sent.
 *
 * It is NOT a dynamic route. Under `output: 'export'` a `[id]` segment has to
 * be enumerated at build time by `generateStaticParams`, and the ids here are
 * Firebase push keys for recipes that are generated after this site is built —
 * there is no list to enumerate, and there never will be. So a single static
 * page is built and Firebase Hosting rewrites `/r/**` onto it (see
 * firebase.json); the id is read from the URL on the client.
 *
 * ⚠️ The path is load-bearing in three other places, none of them in this repo:
 * the app builds these links in `lib/shareLink.ts`, receives them at
 * `app/r/[id].tsx`, and matches `/r` in its Android intent filter. And links
 * already sent are permanent — someone's WhatsApp message from last year is
 * still a URL this page has to answer. Do not move or rename it.
 */

const title = 'A recipe on MealFind';
const description =
  'Someone shared a MealFind recipe with you — the method, the macros, and what every ingredient costs at the big supermarkets.';

export const metadata: Metadata = {
  title,
  description,
  /*
   * Every one of these URLs is a different recipe, and none of them has any
   * content a crawler could index — the recipe itself is in the app. Indexed,
   * they would be thousands of identical pages, which is the textbook shape of
   * a thin-content penalty. `noindex, follow` keeps them out of the index while
   * still letting the links out of here be crawled.
   *
   * They are absent from sitemap.ts for the same reason: a noindex URL in a
   * sitemap tells a crawler two contradictory things.
   */
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    description,
    images: [ogImage('A recipe shared from MealFind.')],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title,
    description,
    images: ['/og.png'],
  },
};

export default function SharedRecipePage() {
  return (
    <>
      {/*
        Opens the recipe in the app as soon as the HTML arrives, without
        waiting for the "Open in MealFind" tap. First in the page so it runs
        before anything else is parsed. A build-time constant: it reads the
        recipe id off the URL itself and validates it — see redirectScripts.ts.
      */}
      <script dangerouslySetInnerHTML={{ __html: openRecipeInAppScript() }} />
      <SiteNav />
      <RecipeLinkLanding />
      <SiteFooter />
    </>
  );
}
