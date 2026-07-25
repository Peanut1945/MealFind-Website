import Script from 'next/script';

import { siteConfig } from '@/lib/site';

/**
 * Cloudflare Web Analytics — the site's only tracking.
 *
 * Chosen because it is free and *cookieless*: the beacon stores nothing on the
 * visitor's device, so no consent banner is required and the cookie policy
 * stays truthful as written. The dashboard lives under Analytics & Logs → Web
 * Analytics on the Cloudflare account that owns the token.
 *
 * Renders nothing until `CF_ANALYTICS_TOKEN` in `src/lib/site.ts` is set, so
 * local dev and preview builds never send traffic to the production property.
 *
 * `afterInteractive` (the default strategy) injects the beacon after hydration
 * — the right trade for analytics, which should never compete with the page
 * for bandwidth. Placed in the root layout so every route reports, including
 * the 404 page — broken-link hits are exactly the traffic worth knowing about.
 */
export function Analytics() {
  const token = siteConfig.cloudflareAnalyticsToken;
  if (!token) return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
