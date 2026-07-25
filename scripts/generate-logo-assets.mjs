/**
 * Derives every logo/icon asset in `public/` from the master artwork
 * `assets/Logo.png`.
 *
 *   npm run assets:logo
 *
 * ── WHY THIS ISN'T IN `prebuild` ────────────────────────────────────────────
 * It needs `sharp`, which is only an *optional* dependency of Next. It happens
 * to be installed here, but a fresh `npm ci` on a platform without a prebuilt
 * binary would skip it — and a build that dies because an icon can't be redrawn
 * is a bad trade. The outputs are committed instead; rerun this by hand
 * whenever `Logo.png` is replaced.
 *
 * ── WHAT IT EMITS ───────────────────────────────────────────────────────────
 *   logo.png            full stacked lockup (mark + wordmark), transparent
 *   logo-mark.png       the mortar-and-pestle mark alone, square, transparent
 *   icon-32.png         browser tab, small
 *   icon-192.png        Android home screen / manifest
 *   icon-512.png        manifest, install prompts, high-DPI tabs
 *   apple-touch-icon.png  iOS home screen — cream plate, mark inset
 *
 * The crop boxes are measured from the artwork rather than hard-coded, so a
 * re-exported logo with different padding still lands correctly.
 *
 * `assets/` is the source-material folder — masters live there, `public/` only
 * ever holds what the site actually serves.
 */

import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'assets', 'Logo.png');
const PUBLIC_DIR = join(ROOT, 'public');

/** Page background — kept in sync with `colors.cream` in src/lib/tokens.ts. */
const CREAM = { r: 0xf5, g: 0xf3, b: 0xec, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/* ---------------------------------------------------------------------------
   Measure the artwork.

   The master is a vertical lockup: mark on top, "MEALFIND" underneath, with a
   band of empty pixels between them. Finding that band is what lets us pull the
   mark out on its own — at nav and favicon sizes the wordmark would be a few
   pixels tall and read as dirt.
--------------------------------------------------------------------------- */

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

/** Transparent and near-white both count as background. */
const isInk = (x, y) => {
  const i = (y * W + x) * C;
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  return a > 20 && !(r > 240 && g > 240 && b > 240);
};

const rowHasInk = [];
for (let y = 0; y < H; y++) {
  let found = false;
  for (let x = 0; x < W && !found; x++) found = isInk(x, y);
  rowHasInk.push(found);
}

const top = rowHasInk.indexOf(true);
const bottom = rowHasInk.lastIndexOf(true);
if (top === -1) throw new Error(`${SOURCE} appears to be blank.`);

/** Widest run of blank rows inside the artwork — the gap under the mark. */
let gap = null;
for (let y = top, start = null; y <= bottom + 1; y++) {
  if (y <= bottom && !rowHasInk[y]) {
    if (start === null) start = y;
    continue;
  }
  if (start !== null) {
    const run = { start, end: y - 1 };
    if (!gap || run.end - run.start > gap.end - gap.start) gap = run;
    start = null;
  }
}

/** Column bounds of the ink between two rows. */
const columnsBetween = (y0, y1) => {
  let left = W;
  let right = -1;
  for (let y = y0; y <= y1; y++) {
    for (let x = 0; x < W; x++) {
      if (!isInk(x, y)) continue;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  return { left, right };
};

const markRows = { top, bottom: gap ? gap.start - 1 : bottom };
const markCols = columnsBetween(markRows.top, markRows.bottom);
const lockupCols = columnsBetween(top, bottom);

const box = (cols, rows) => ({
  left: cols.left,
  top: rows.top,
  width: cols.right - cols.left + 1,
  height: rows.bottom - rows.top + 1,
});

const MARK = box(markCols, markRows);
const LOCKUP = box(lockupCols, { top, bottom });

console.log(`Source ${W}×${H} — mark ${MARK.width}×${MARK.height}, lockup ${LOCKUP.width}×${LOCKUP.height}`);

/* ---------------------------------------------------------------------------
   Emit.
--------------------------------------------------------------------------- */

const written = [];

const write = (name, buffer) => {
  writeFileSync(join(PUBLIC_DIR, name), buffer);
  written.push(`${name} (${(buffer.length / 1024).toFixed(1)} KB)`);
};

/** The mark, centred on a transparent square with a little breathing room. */
const squareMark = async (size, { padding = 0.04, background = TRANSPARENT } = {}) => {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(SOURCE)
    .extract(MARK)
    .resize(inner, inner, { fit: 'contain', background: TRANSPARENT })
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toBuffer();
};

write('logo.png', await sharp(SOURCE).extract(LOCKUP).png({ compressionLevel: 9 }).toBuffer());

/*
 * On-page mark (nav, footer, about badge). Deliberately small: it renders at
 * 16–32 CSS px, so 160 covers 4× DPR — no reason to make every visitor download
 * the 512px icon for a 20px glyph. No padding either, so it optically aligns
 * with the wordmark beside it.
 */
write('logo-mark.png', await squareMark(160, { padding: 0 }));

for (const size of [32, 192, 512]) {
  // Small sizes get less padding — at 32px a 4% margin is a wasted pixel ring.
  write(`icon-${size}.png`, await squareMark(size, { padding: size <= 48 ? 0.02 : 0.04 }));
}

/*
 * iOS ignores transparency and composites the icon onto black, so this one gets
 * an explicit cream plate. Safari applies its own rounded mask, hence full-bleed
 * background with the mark inset well clear of the corners.
 */
write('apple-touch-icon.png', await squareMark(180, { padding: 0.14, background: CREAM }));

console.log(written.map((line) => `Wrote public/${line}`).join('\n'));
