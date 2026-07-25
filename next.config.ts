import type { NextConfig } from 'next';

/**
 * Sub-path the site is served from, without a trailing slash — `''` for a
 * domain root, `/MealFind-Website` for a GitHub Pages project site.
 *
 * Env-driven so the same tree builds for both: `npm run dev` and `npm run
 * build` stay at the root, and only CI (which sets NEXT_PUBLIC_BASE_PATH)
 * builds the prefixed variant. Moving to mealfind.co.uk later means dropping
 * the variable, not editing code.
 *
 * Exported because `basePath` is a build-time constant that Next only applies
 * to `<Link>` and `_next/*` assets — anything pointing at `public/` by hand
 * has to prefix itself. See `src/lib/asset.ts`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  /**
   * Fully static output — `npm run build` emits `out/`, deployable to any
   * static host (Vercel, Netlify, S3, GitHub Pages, nginx).
   *
   * If you deploy to Vercel and want on-demand image optimisation instead,
   * delete `output` and the `images.unoptimized` flag below.
   */
  output: 'export',

  basePath,
  assetPrefix: basePath,

  images: {
    // Required by `output: 'export'` — there is no server to optimise on.
    // The placeholder art ships as SVG (resolution-independent, ~1KB each), so
    // nothing is lost here. Swap in real PNG/WEBP screenshots and they'll be
    // served as-is; export them at 2x the rendered size.
    unoptimized: true,
  },

  // Emits `/about/index.html` rather than `/about.html` so static hosts resolve
  // clean URLs without rewrite rules.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
