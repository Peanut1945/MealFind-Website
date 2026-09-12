'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';

import { CTAButton } from '@/components/ui/CTAButton';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { AppleLogo, ArrowRight, GooglePlayLogo } from '@/components/ui/icons';
import {
  appRecipeUrl,
  readSharedRecipeLink,
  type SharedRecipeLink,
} from '@/lib/sharedRecipeLink';
import { isLiveLink, siteConfig } from '@/lib/site';

/* ---------------------------------------------------------------------------
   The page behind a shared recipe link.

   Someone in the app tapped Share on a recipe and sent
   `https://mealfind.co.uk/r/<id>` to a friend. Two very different people follow
   that link, and this page is only ever seen by the second:

     has the app   → iOS and Android hand the URL straight to MealFind before a
                     browser is ever involved (the associated-domain entitlement
                     plus /.well-known/apple-app-site-association and
                     assetlinks.json). This page isn't drawn at all.
     hasn't        → they land here, and the honest answer is that the recipe
                     lives in the app. So the page names the dish, says what
                     MealFind is, and offers the way in.

   Until a build ships with that entitlement, everybody lands here. So on a
   phone the page tries to open the app by itself the moment it loads (the
   inline script in src/app/r/page.tsx), and "Open in MealFind" stays a real,
   prominent button for when that is blocked or dismissed.
--------------------------------------------------------------------------- */

/*
 * The current URL, as an external store.
 *
 * The URL genuinely is one — it lives outside React, and on this page it is the
 * only input the component has. Reading it through `useSyncExternalStore` is
 * what makes the server snapshot (`null`) explicit: this HTML is built once, at
 * build time, with no idea which recipe it will be serving, so anything read
 * out of the URL has to arrive after hydration or React would be handed markup
 * that doesn't match what it builds on the client.
 *
 * The snapshot is a plain string so it stays referentially equal between
 * renders; parsing it is a `useMemo` below. A `getSnapshot` returning a fresh
 * object every call is an infinite render loop.
 */
const subscribeToUrl = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
};

const currentHref = () => window.location.pathname + window.location.search;

export function RecipeLinkLanding() {
  // null until hydration — see subscribeToUrl above.
  const href = useSyncExternalStore(subscribeToUrl, currentHref, () => null);
  const link = useMemo<SharedRecipeLink | null>(
    () => (href ? readSharedRecipeLink(href) : null),
    [href],
  );

  const heading = link?.name ?? 'This recipe';
  const appStoreLive = isLiveLink(siteConfig.links.appStore);
  const googlePlayLive = isLiveLink(siteConfig.links.googlePlay);

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-5 pt-32 pb-20 text-center sm:px-8 sm:pt-36"
    >
      <ScriptAccent centered>someone sent you this</ScriptAccent>

      {/*
        The dish's name is the headline when the link carries one. `min-h`
        holds the line's height through the swap from the placeholder, so the
        buttons below don't jump the moment hydration finishes.
      */}
      <h1 className="text-balance-heading mt-4 min-h-[1.02em] font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.04em] text-forest">
        {heading}
      </h1>

      <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
        It&rsquo;s a MealFind recipe &mdash; the method, the macros, and what
        every ingredient costs at {siteConfig.retailers.slice(0, -1).join(', ')}{' '}
        and {siteConfig.retailers.at(-1)}. Open it in the app to cook it, scale
        the portions, or send it all to a shopping list.
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {/*
          A plain <a>, never next/link: the router has no business prefetching a
          `vintest://` URL or trying to make a client-side transition out of it.
          Only offered when the link actually named a recipe — a button that
          opens the app on nothing is worse than no button.
        */}
        {link?.id && (
          <a
            href={appRecipeUrl(link.id, link.name)}
            className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-forest px-8 text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap text-cream shadow-[0_1px_2px_rgb(31_61_43/0.2)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-forest-dark hover:shadow-[0_6px_16px_-6px_rgb(31_61_43/0.5)] focus-visible:outline-2 focus-visible:outline-offset-3 active:translate-y-px motion-reduce:active:translate-y-0"
          >
            Open in MealFind
            <ArrowRight className="size-4" />
          </a>
        )}

        {appStoreLive || googlePlayLive ? (
          /* Each store only once its own listing is live — a button to a `#` is a dead end. */
          <>
            {appStoreLive && (
              <CTAButton href={siteConfig.links.appStore} variant="secondary" size="lg" external>
                <AppleLogo className="size-4" />
                App Store
              </CTAButton>
            )}
            {googlePlayLive && (
              <CTAButton href={siteConfig.links.googlePlay} variant="secondary" size="lg" external>
                <GooglePlayLogo className="size-4" />
                Google Play
              </CTAButton>
            )}
          </>
        ) : (
          /*
           * Neither store listing is live yet (both `#` in site.ts). Sending
           * someone to a dead link is worse than telling them the truth, so
           * until they're live the second action is the beta sign-up — which is
           * what the rest of the site offers too.
           */
          <CTAButton href={siteConfig.links.beta} variant="secondary" size="lg">
            Don&rsquo;t have the app?
            <ArrowRight className="size-4" />
          </CTAButton>
        )}
      </div>

      <p className="mt-6 text-[0.8125rem] text-ink-muted">
        <Link className="underline underline-offset-4 hover:text-forest" href="/">
          What is MealFind?
        </Link>
      </p>
    </main>
  );
}
