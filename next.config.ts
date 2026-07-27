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
   * Fully static output — `npm run build` emits `out/`, deployable to any
   * static host (Vercel, Netlify, S3, GitHub Pages, nginx).
   *
   * If you deploy to Vercel and want on-demand image optimisation instead,
   * delete `output` and the `images.unoptimized` flag below.
   */
  output: 'export',

  images: {
    // Required by `output: 'export'` — there is no server to optimise on.
    // Screenshots are served exactly as they ship in `public/screens/`, so
    // export them at 2x the size they render at.
    unoptimized: true,
  },

  // Emits `/about/index.html` rather than `/about.html` so static hosts resolve
  // clean URLs without rewrite rules.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
