/**
 * Single source of truth for site-wide copy, URLs and store links.
 *
 * ⚠️ BEFORE DEPLOY: confirm `url` below (or set `NEXT_PUBLIC_SITE_URL`) matches
 * the origin the site is actually served from. It drives the canonical URL,
 * Open Graph tags, sitemap.xml and the JSON-LD block — a wrong value here means
 * wrong URLs everywhere.
 */

/** Public contact address — the destination behind every "get in touch" CTA. */
const EMAIL = 'hello@mealfind.co.uk';

/**
 * Cloudflare Web Analytics beacon token. While it's empty, no analytics script
 * is rendered at all and nothing is tracked — see `<Analytics>`.
 *
 * To turn it on: Cloudflare dashboard → Analytics & Logs → Web Analytics → add
 * `mealfind.co.uk`, then copy the `token` value out of the JS snippet it gives
 * you. It's not a secret — it ships in the HTML of every page — which is why it
 * lives here in code rather than in a gitignored env file a CI machine would
 * silently build without.
 */
const CF_ANALYTICS_TOKEN: string = '';

export const siteConfig = {
  name: 'MealFind',
  /** Used as the browser-tab title template and the OG site name. */
  title: 'MealFind — Good food, priced right',
  tagline: 'The recipe app that knows what things cost',

  /**
   * The brand slogan — the line that signs pages off, rather than the one that
   * opens them. That job belongs to the hero headline ("Good food, priced
   * right."), which sells the product; this sells the brand.
   *
   * Distinct from `tagline` above, which is a plain-English description of what
   * the app is, used where a machine needs one (structured data, store copy).
   */
  slogan: 'Plan well. Eat well. Live well.',
  description:
    'MealFind prices whole recipes, not single products: plan a week of meals, see what each one costs at Tesco, Sainsbury’s and ASDA, and shop from one list. Chef-reviewed recipes, nutrition tracking and UK supermarket price comparison in one free app.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mealfind.co.uk',
  locale: 'en_GB',
  twitter: '@mealfindapp',

  /** Where beta sign-ups and everything else lands. */
  email: EMAIL,

  /** Cloudflare Web Analytics token — empty disables analytics entirely. */
  cloudflareAnalyticsToken: CF_ANALYTICS_TOKEN,

  /**
   * Supermarkets the app compares today — the three in the beta's shopping
   * list. This is a factual claim about what the product does, so a name only
   * belongs here once its prices are actually live in the app.
   */
  retailers: ['Tesco', "Sainsbury's", 'ASDA'],

  /** Store links. Replace the `#` placeholders once the listings are live. */
  links: {
    appStore: '#', // TODO: https://apps.apple.com/app/id...
    googlePlay: '#', // TODO: https://play.google.com/store/apps/details?id=...
    /*
     * Root-relative, like the nav hashes: a bare `#beta` from /about points at
     * an element that isn't in that document, so the button did nothing there.
     */
    beta: '/#beta',
    /*
     * The sign-up action itself. A pre-filled subject means the inbox can sort
     * beta requests from everything else without a form or a backend.
     */
    betaEmail: `mailto:${EMAIL}?subject=${encodeURIComponent('Beta access')}`,
  },

  /**
   * Primary navigation.
   *
   * Hash targets are written root-relative (`/#features`, not `#features`) so
   * they resolve from every route — a bare `#features` on /about points at an
   * element that isn't in that document and silently does nothing. On the home
   * page `SmoothScroll` recognises these as same-page anchors and scrolls to
   * them; from anywhere else they navigate home and land on the section.
   */
  nav: [
    { label: 'Features', href: '/#features' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'About', href: '/about' },
  ],

  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Terms', href: '/terms' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
