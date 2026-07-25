import type { Metadata } from 'next';

import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteNav } from '@/components/sections/SiteNav';
import { CTAButton } from '@/components/ui/CTAButton';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { ArrowRight } from '@/components/ui/icons';

/*
 * Next injects `noindex` on 404 responses automatically, so only the title
 * needs declaring — it picks up the root layout's `%s — MealFind` template.
 */
export const metadata: Metadata = {
  title: 'Page not found',
};

/**
 * The site-wide 404, exported as `out/404.html` under `output: 'export'`.
 *
 * Most static hosts (Netlify, GitHub Pages, Cloudflare Pages) serve `404.html`
 * for unmatched paths automatically; S3/CloudFront needs it set as the error
 * document.
 *
 * No entrance animations: someone landing here followed a broken link, and the
 * only job is to show them the way out immediately. The nav and footer keep
 * every path off the page one click away.
 */
export default function NotFound() {
  return (
    <>
      <SiteNav />

      <main
        id="main"
        className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-5 pt-32 pb-20 text-center sm:px-8 sm:pt-36"
      >
        {/* Decorative — the h1 below carries the real message. */}
        <p
          aria-hidden
          className="font-display text-[clamp(5rem,18vw,9rem)] leading-none font-bold tracking-[-0.05em] text-forest/15"
        >
          404
        </p>

        <ScriptAccent centered className="mt-2">
          lost in the aisles
        </ScriptAccent>

        <h1 className="text-balance-heading mt-4 font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.04em] text-forest">
          Page not found.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
          This page isn&rsquo;t on the list — it may have moved, or the link
          you followed is out of date. Everything worth cooking is still on the
          home page.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/" size="lg">
            Back to the home page
          </CTAButton>
          <CTAButton href="/about" variant="secondary" size="lg">
            Read our story
            <ArrowRight className="size-4" />
          </CTAButton>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
