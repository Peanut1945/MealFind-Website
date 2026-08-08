import type { NextConfig } from 'next';

/**
 * The site is served from the root of its own domain (mealfind.co.uk), so
 * there is deliberately no `basePath` / `assetPrefix` here.
 *
 * ⚠️ Do not reintroduce them. They were added when the site lived at the
 * GitHub Pages project URL (`peanut1945.github.io/MealFind-Website/`), and
 * they are baked into the HTML at build time: with a base path set, every
 * stylesheet, script and image is emitted as `/MealFind-Website/...`, which
 * 404s at the domain root and leaves the page unstyled with broken images.
 * A sub-path build is only ever correct if the site is actually served from
 * that sub-path.
 */
const nextConfig: NextConfig = {
  /**
   * Self-contained server bundle at `.next/standalone`, which is what Firebase
   * App Hosting packages into its Cloud Run container.
   *
   * ⚠️ Do not set this back to `'export'`. `output` takes a single value, so
   * `'export'` and `'standalone'` are mutually exclusive — with `'export'` the
   * build emits `out/` and no server at all, and the App Hosting adapter dies
   * with `ENOENT: .next/standalone/.next/routes-manifest.json` *after* the
   * compile step reports success. The build log looks green; the rollout is
   * skipped and the backend serves 404s.
   *
   * A static export is still the right shape for this site's content. If you
   * ever move back to a static host (Firebase Hosting, GitHub Pages, S3),
   * switch this to `'export'` and re-read the notes in `firebase.json`.
   */
  output: 'standalone',

  images: {
    // App Hosting ships with Next's image optimiser disabled, so leaving the
    // default loader on would 500 every `next/image` request at runtime.
    // Screenshots are served exactly as they ship in `public/screens/`, so
    // export them at 2x the size they render at.
    unoptimized: true,
  },

  // Canonical URLs carry a trailing slash (`/about/`), and `/about` 301s to it.
  // Kept from the static-export era so existing links and indexed URLs don't
  // move; changing it now would 301 every crawled URL to a new address.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
