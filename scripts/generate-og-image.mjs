/**
 * Renders the social share card to `public/og.png`.
 *
 *   node scripts/generate-og-image.mjs
 *
 * Runs automatically via the `prebuild` npm script, so `npm run build` always
 * ships a current card.
 *
 * ── WHY NOT `opengraph-image.tsx`? ──────────────────────────────────────────
 * Originally because the site was a static export: the file convention emitted
 * an *extensionless* `out/opengraph-image`, static hosts guessed
 * `application/octet-stream`, and Facebook, X, LinkedIn and iMessage all refuse
 * an og:image that isn't served as `image/*`.
 *
 * On App Hosting there's a server, so the convention would set the right
 * content type on its own. This script stays because a pre-rendered `.png` is
 * still the cheaper and more predictable option — the card is baked once at
 * build time instead of rendered per request, and crawlers that don't follow
 * redirects or execute the route get a plain static file.
 *
 * Layout note: this is Satori, not a browser. Only flexbox is supported, every
 * element needs an explicit `display`, and there's no cascade — style each node
 * directly.
 */

import { createElement as h } from 'react';
// `next/og.js`, not `next/og`: outside the bundler there's no extension
// resolution, so the explicit filename is required.
import { ImageResponse } from 'next/og.js';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

/*
 * The logo mark, inlined as a data URI. Satori has no filesystem access, so a
 * path or a bare `/logo-mark.png` would silently render nothing.
 *
 * Committed to `public/` by `scripts/generate-logo-assets.mjs` — this script
 * only reads it, so the build never needs sharp.
 */
const LOGO_MARK = `data:image/png;base64,${readFileSync(join(PUBLIC_DIR, 'logo-mark.png')).toString('base64')}`;

// Kept in sync with src/lib/tokens.ts by hand — this script runs outside the
// TS build, so it can't import the tokens module directly.
const CREAM = '#F5F3EC';
const FOREST = '#1F3D2B';
const INK_MUTED = '#6B7A70';

const div = (style, children) => h('div', { style: { display: 'flex', ...style } }, children);

const card = div(
  {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: CREAM,
    padding: '72px 80px',
  },
  [
    // Wordmark, with the slogan signing off the opposite corner.
    // Keep the slogan in step with `siteConfig.slogan` — this script runs
    // outside the TS build, so it can't import it.
    div({ key: 'mark', alignItems: 'center', justifyContent: 'space-between' }, [
      div({ key: 'lockup', alignItems: 'center' }, [
        h('img', {
          key: 'logo',
          src: LOGO_MARK,
          width: 56,
          height: 56,
          style: { marginRight: 16 },
        }),
        div(
          { key: 'name', fontSize: 30, fontWeight: 700, color: FOREST, letterSpacing: '-0.02em' },
          'MealFind',
        ),
      ]),
      div(
        { key: 'slogan', fontSize: 24, color: INK_MUTED, letterSpacing: '-0.01em' },
        'Plan well. Eat well. Live well.',
      ),
    ]),

    // Headline
    div({ key: 'copy', flexDirection: 'column' }, [
      div(
        {
          key: 'h1',
          fontSize: 96,
          fontWeight: 700,
          color: FOREST,
          letterSpacing: '-0.045em',
          lineHeight: 1.02,
        },
        'Good food, priced right.',
      ),
      div(
        {
          key: 'sub',
          marginTop: 26,
          fontSize: 32,
          color: INK_MUTED,
          letterSpacing: '-0.01em',
          maxWidth: 860,
          lineHeight: 1.35,
        },
        'Plan a week of meals, see what each recipe costs at every supermarket, and shop once.',
      ),
    ]),

    // Footer strip
    div({ key: 'foot', alignItems: 'center' }, [
      div(
        {
          key: 'cta',
          alignItems: 'center',
          backgroundColor: FOREST,
          color: CREAM,
          borderRadius: 999,
          padding: '14px 30px',
          fontSize: 24,
          fontWeight: 600,
          marginRight: 28,
        },
        'Join the beta',
      ),
      // Keep in step with `siteConfig.retailers` — this script runs outside the
      // TS build, so it can't import it.
      div({ key: 'stores', fontSize: 24, color: INK_MUTED }, 'Tesco · Sainsbury’s · ASDA'),
    ]),
  ],
);

mkdirSync(PUBLIC_DIR, { recursive: true });

// The app icons used to be drawn here too; they're cropped from the real logo
// by `scripts/generate-logo-assets.mjs` now.
const buffer = Buffer.from(
  await new ImageResponse(card, { width: 1200, height: 630 }).arrayBuffer(),
);
writeFileSync(join(PUBLIC_DIR, 'og.png'), buffer);
console.log(`Wrote public/og.png (${(buffer.length / 1024).toFixed(1)} KB)`);
