# MealFind — marketing site

Marketing site for MealFind, a free UK recipe app that prices whole recipes
across supermarkets, tracks nutrition, and turns a week's meals into one
shopping list.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.
Builds to fully static HTML.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site -> out/
npm run lint
npm run typecheck
npm run assets     # regenerate the logo/icon set + og.png
npm run assets:logo  # re-crop icons from Logo.png (needs sharp)
```

---

## Before you deploy

These are the things deliberately left as placeholders.

| What | Where | Why it matters |
| --- | --- | --- |
| **Production URL** | `NEXT_PUBLIC_SITE_URL` env var, or the fallback in `src/lib/site.ts` | Set to `https://mealfind.co.uk`. Drives the canonical URL, Open Graph tags, `sitemap.xml` and JSON-LD. Wrong here means wrong everywhere. |
| **App Store / Play links** | `siteConfig.links` in `src/lib/site.ts` | While these are `#`, the store buttons render inert rather than linking nowhere. Set them and they activate automatically. |
| **Beta signup** | `siteConfig.links.beta` / `.betaEmail` in `src/lib/site.ts` | Nav and hero scroll to the closing section; its button opens a `mailto:` to `siteConfig.email`. Swap `betaEmail` for a real form or waitlist URL when you have one. |
| **Supermarket list** | `siteConfig.retailers` | Named on the home page and in the OG card. Only add a name once its prices are actually live in the app — this is a factual claim about the product. |
| **Legal copy** | `src/app/{privacy,cookies,terms}/page.tsx` | Structured placeholders listing the sections each document needs. All three are `noindex` until filled in — remove that, and add them back to `src/app/sitemap.ts`. |
| **Twitter handle** | `siteConfig.twitter` | Unverified — remove the key if the account doesn't exist. |
| **Analytics** | `CF_ANALYTICS_TOKEN` in `src/lib/site.ts` | Cloudflare Web Analytics (free, cookieless — no consent banner needed). Until the token is set, no tracking script is rendered at all. Create the site under Analytics & Logs → Web Analytics in the Cloudflare dashboard, copy the token out of the snippet it offers, and rebuild. |

### Claims on this site

Two rules the copy currently keeps to, worth keeping:

- **Every number has a source on screen.** The forest band cites ONS food
  inflation. There is deliberately no "save £X a week" claim anywhere — that one
  needs real beta data behind it before it goes up, because the app then has to
  be able to prove it.
- **Feature copy describes what v1.0 actually does.** Roadmap items (direct
  supermarket checkout, leftover-ingredient suggestions, the creator
  marketplace) are not on the site. Add them when they ship.

---

## Swapping in real assets

### App screenshots

The phones show real screenshots of the app, served from `public/screens/` and
registered in one place — the `SCREENS` map in
`src/components/phone/PhoneScreenshot.tsx`. Each entry carries the image path
and the accessible description of what that screen shows; sections read from the
map rather than hard-coding either.

```tsx
<PhoneMockup label={SCREENS.weeklyPlan.label}>
  <PhoneScreenshot src={SCREENS.weeklyPlan.src} />
</PhoneMockup>
```

To replace one, drop the new file in `public/screens/` under the same name and
update its `label` if the screen changed.

Two things to know about re-shooting:

- **Capture at device resolution.** The current set is 443×960, which is roughly
  1.3× the size it renders at — acceptable, slightly soft on retina. A straight
  iPhone screenshot (~1170×2532) would be sharper. Keep the aspect ratio near
  1:2.16, which is what the frame is locked to.
- **Keep the iOS status bar in shot.** The frame draws its dynamic island over
  the middle of it, which is exactly where the real one sits — the two compose
  into a convincing device. Two of the current shots read `◀ Safari` in the
  corner, a leftover from how they were taken; worth re-shooting.

### Logo and icons

`assets/Logo.png` is the master artwork — `assets/` holds source material, and
`public/` only ever holds what the site actually serves. Everything else is
cropped from it by `scripts/generate-logo-assets.mjs`:

| Output | Used by |
| --- | --- |
| `public/logo.png` | full stacked lockup — JSON-LD `Organization.logo` |
| `public/logo-mark.png` | the on-page mark (nav, footer, /about badge) via `<LogoMark>` |
| `public/icon-{32,192,512}.png` | browser tab and `site.webmanifest` |
| `public/apple-touch-icon.png` | iOS home screen (cream plate — iOS composites transparency onto black) |

Replace `assets/Logo.png` and run `npm run assets:logo`. The script measures the
artwork rather than using fixed crop boxes, so a re-export with different
padding still lands correctly — as long as it stays a mark-above-wordmark
lockup with a transparent or white background.

> Not wired into `prebuild`: it needs `sharp`, which is only an *optional*
> dependency of Next. The outputs are committed instead, so a build never
> depends on it being installed.

### Social share card

`public/og.png` is generated by `scripts/generate-og-image.mjs`, wired to
`prebuild` so it is always current. Edit the layout in that script. It inlines
`public/logo-mark.png` as a data URI — Satori has no filesystem access, so a
plain path renders nothing.

> It is a script rather than Next's `opengraph-image.tsx` convention on purpose:
> under `output: 'export'` that convention emits an *extensionless* file, and
> every major link scraper rejects an `og:image` not served as `image/*`.

---

## Architecture

```
src/
  app/                     routes, metadata, JSON-LD, sitemap, robots
  components/
    motion/                SmoothScroll (Lenis), ParallaxLayer, Reveal, CountUp
    phone/                 PhoneMockup frame + PhoneScreenshot / SCREENS map
    sections/              one file per page section
    ui/                    Section, CTAButton, ValueCard, ScriptAccent, Logo, icons…
  hooks/                   useParallax, usePrefersReducedMotion
  lib/                     tokens.ts (design tokens), site.ts (copy/URLs), cn.ts
scripts/                   asset generation
```

**Design tokens** live in two places that must stay in sync: `src/lib/tokens.ts`
for values needed in JS, and the `@theme` block in `src/app/globals.css`, which
is what Tailwind v4 actually reads. Change a colour in one, change it in both.

**The phone frame is pure CSS** (`PhoneMockup`) with a real screenshot inside
it, so it stays crisp at any size and the only asset paid for is the screenshot
itself. Aspect ratio is locked at 1:2.16, so callers only ever set a width.

**Parallax** goes through `useParallax` / `<ParallaxLayer>`. Depth is set by
`speed` (px of drift across the element's pass through the viewport); the
foreground moves most. Above-the-fold layers use `source="page"` so they sit
undisplaced at scroll position 0 instead of starting mid-range.

**The pinned phone** in "How it works" is plain `position: sticky`, not
scroll-jacking. Each step claims `min-h-[68vh]` on large screens specifically so
the column is tall enough to sustain the pin — a sticky element can only travel
as far as its containing block is tall, and with ordinary gaps the phone
un-pinned and scrolled away while step 3 was still on screen.

---

## Motion and accessibility

Everything animated respects `prefers-reduced-motion: reduce`:

- Lenis is never instantiated; native scrolling is untouched.
- `MotionConfig reducedMotion="always"` makes Framer transitions instant.
- `<Reveal>` and the price bars render their **final resting state** with no
  variants and no IntersectionObserver, rather than relying on an observer to
  restore them — a reduced-motion user must never be shown an empty chart or a
  blank section because a callback was slow.
- A `@media (prefers-reduced-motion)` block in `globals.css` neutralises any CSS
  transition that slips through.

Other accessibility notes:

- Single `<h1>`; every section below opens with an `<h2>` (visually hidden where
  the design has no visible heading) so the outline stays complete.
- Phone mockups are `role="img"` with a descriptive `aria-label`; their internals
  are `aria-hidden` so screen readers get one sentence, not a pile of fake UI.
- Smooth-scrolled anchors move focus to the target, which most Lenis setups drop.
- Skip link, visible focus rings, and a `<noscript>` rule that forces revealed
  content visible when JS is blocked.

---

## Gotchas worth knowing

- **`cn()` uses `tailwind-merge`.** Component base classes and caller
  `className` overrides frequently set the same property (`inline-flex` vs
  `hidden`, `w-[264px]` vs `w-[296px]`). CSS resolves those by stylesheet order,
  not attribute order, so without merging the base class can silently win.
- **Don't hang sub-components off a client component** (`Reveal.Item = …`). A
  server component importing a client component gets a *client reference*, and
  static properties on it are `undefined` at render. Export them separately —
  which is why `RevealItem` is its own named export.
- **Route-segment config must be literal.** `export const dynamic =
  'force-static'` is parsed at compile time and cannot be re-exported from
  another module.
