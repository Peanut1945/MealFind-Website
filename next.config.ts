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
   * Fully static output — `npm run build` emits `out/`, which Firebase Hosting
   * serves straight from its CDN. No server, no container, no billing account
   * in the request path.
   *
   * ⚠️ `output` takes a single value: `'export'` and `'standalone'` are
   * mutually exclusive, never both. Firebase *App* Hosting needs
   * `'standalone'`, and with `'export'` set it fails in a genuinely misleading
   * way — the compile step reports success, then the adapter dies on
   * `ENOENT: .next/standalone/.next/routes-manifest.json` and the backend
   * serves 404s behind a green build log. If you move to App Hosting, switch
   * this value and restore the `apphosting` block in `firebase.json`.
   *
   * Nothing here needs a server: Firebase Auth email verification and sign-in
   * links are issued by Firebase's own backend from the client SDK. Server-side
   * auth (session cookies, Admin SDK, SSR-protected routes) would be the reason
   * to switch.
   */
  output: 'export',

  images: {
    // Required by `output: 'export'` — there is no server to optimise on.
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
