import type { Metadata } from 'next';

import { QrRedirect } from '@/components/QrRedirect';
import { CTAButton } from '@/components/ui/CTAButton';
import { AppleLogo, ArrowRight, GooglePlayLogo } from '@/components/ui/icons';
import { isLiveLink, ogImage, siteConfig } from '@/lib/site';

/*
 * ─── mealfind.co.uk/qr ───────────────────────────────────────────────────────
 *
 * The address behind the printed QR code. One code has to serve every phone,
 * so the phone decides: an iPhone or iPad goes to the App Store, an Android to
 * Google Play, anything else to the home page (src/lib/qrDestination.ts).
 *
 * A page rather than a Firebase Hosting redirect, because hosting redirects
 * can't see what device is asking. What's drawn here shows only for the moment
 * before QrRedirect runs, or for good with JavaScript off, so it is just the
 * way out.
 *
 * ⚠️ Printed codes can't be reprinted cheaply, so this path is permanent.
 */

const title = 'Get the app';
const description =
  'Download MealFind — weekly meal plans, the macros, and what every ingredient costs at the big supermarkets.';

export const metadata: Metadata = {
  title,
  description,
  // A redirect with nothing of its own to index, and absent from sitemap.ts
  // for the same reason.
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    description,
    images: [ogImage('Get the MealFind app.')],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title,
    description,
    images: ['/og.png'],
  },
};

export default function QrPage() {
  const appStoreLive = isLiveLink(siteConfig.links.appStore);
  const googlePlayLive = isLiveLink(siteConfig.links.googlePlay);

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8"
    >
      <QrRedirect />

      <h1 className="font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.04em] text-forest">
        {siteConfig.name}
      </h1>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
        <CTAButton href="/" variant="ghost" size="lg">
          What is MealFind?
          <ArrowRight className="size-4" />
        </CTAButton>
      </div>
    </main>
  );
}
