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
/** True only inside App Hosting's build — the variable is set in apphosting.yaml. */
const FOR_APP_HOSTING = process.env.MEALFIND_BUILD_TARGET === 'apphosting';

const nextConfig: NextConfig = {
  /**
   * Two build targets from one codebase:
   *
   * - Default: a fully static `out/`, for `firebase deploy --only hosting`
   *   (vinapp-951d6.web.app).
   * - App Hosting (backend `mealfindweb`, which is what mealfind.co.uk points
   *   at, auto-built from `main`): a `standalone` server, the only thing its
   *   adapter can package.
   *
   * ⚠️ `output` takes a single value, and App Hosting cannot take `'export'`.
   * It fails in a genuinely misleading way: the compile step reports success,
   * then the adapter dies on `ENOENT: .next/standalone/.next/routes-manifest.json`
   * and the domain silently stays on the last good build. That is what froze
   * mealfind.co.uk on the 8 Aug 2026 build until this switch existed.
   */
  output: FOR_APP_HOSTING ? 'standalone' : 'export',

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

  experimental: {
    /*
     * `framer-motion` is a barrel: `import { motion } from 'framer-motion'`
     * pulls the package's whole entry graph into whichever chunk needs it, and
     * the bundler can only drop what it proves unreachable. This rewrites those
     * named imports to their individual modules first, so the parts the site
     * never touches (drag, layout projection, the SVG path helpers) aren't
     * dragged in behind the parts it does.
     *
     * Nothing about the import statements themselves changes — this is purely a
     * build-time rewrite.
     */
    optimizePackageImports: ['framer-motion'],
  },

  /*
   * Firebase Hosting does these two in firebase.json. A server build never sees
   * firebase.json, so they are repeated here — and only for that build, because
   * a static export doesn't support rewrites or headers.
   */
  ...(FOR_APP_HOSTING
    ? {
        async rewrites() {
          // One static page answers every shared recipe id — see src/app/r/page.tsx.
          // The trailing slash is required under `trailingSlash: true`.
          return [{ source: '/r/:path+/', destination: '/r/' }];
        },
        async headers() {
          // iOS ignores the association file unless it is served as JSON — see
          // the matching block in firebase.json.
          return [
            {
              source: '/.well-known/apple-app-site-association',
              headers: [
                { key: 'Content-Type', value: 'application/json' },
                { key: 'Cache-Control', value: 'public, max-age=300' },
              ],
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
