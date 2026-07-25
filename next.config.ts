import type { NextConfig } from 'next';

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
