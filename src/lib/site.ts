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

/**
 * Google Search Console verification token — the value of the `content`
 * attribute in the `<meta name="google-site-verification">` snippet Search
 * Console offers under "HTML tag". While it's empty, no tag is rendered.
 *
 * Verifying the property is the highest-value SEO action available to this
 * site and none of it is code: it is the only way to submit the sitemap, see
 * which queries the site actually appears for, and find out whether a page is
 * indexed at all rather than guessing. A brand-new domain can sit uncrawled
 * for weeks; this is how you learn that on day two instead of month two.
 *
 * DNS TXT verification is strictly better if you have registrar access — it
 * covers every protocol and subdomain at once and survives a deploy that drops
 * this file — in which case leave this empty.
 */
const GOOGLE_SITE_VERIFICATION: string = '';

export const siteConfig = {
  name: 'MealFind',
  /** Used as the browser-tab title template and the OG site name. */
  title: 'MealFind - Good food, priced right',
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

  /**
   * The meta description, and the fallback description for Open Graph, Twitter
   * and the JSON-LD block.
   *
   * ⚠️ Keep this under ~155 characters. Google measures the rendered width of
   * a search snippet, not the character count, but ~155 is the point past which
   * a description reliably gets truncated mid-sentence with an ellipsis — the
   * previous copy here ran to 241 and lost its last two clauses in every
   * result. Say the one thing that earns the click and stop.
   */
  description:
    'Plan a week of meals and see what each recipe costs at Tesco, Sainsbury’s and ASDA. A free UK meal planner with prices, nutrition and one shopping list.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mealfind.co.uk',
  locale: 'en_GB',
  twitter: '@mealfindapp',

  /**
   * Other spellings of the name that a person genuinely writes — fed to
   * `alternateName` in the structured data so a search engine can attach them
   * to the same entity instead of treating them as unrelated strings.
   *
   * ⚠️ These are *names*, not keywords. Only add a variant a real person would
   * write when they mean this product. Stuffing near-misses, competitors'
   * names or misspellings in here is keyword spam: it earns a manual action
   * rather than a ranking, and in the case of a misspelling that belongs to
   * someone else's trademark (see MelaFind, the melanoma-detection device) it
   * claims a name that isn't ours.
   */
  alternateNames: ['Meal Find', 'MealFind App'],

  /**
   * Profiles that are unambiguously this brand, emitted as `sameAs` in the
   * Organization schema. This is how a search engine joins the site, the store
   * listings and the social accounts into one entity — the single strongest
   * structured-data signal for "when someone searches this name, they mean
   * this thing".
   *
   * ⚠️ Every URL here must resolve to a live page that is actually ours. A
   * `sameAs` pointing at a 404 or an account nobody has claimed is a worse
   * signal than no `sameAs` at all. Placeholder store links are filtered out
   * automatically by `brandProfiles()` below, but a dead social profile is not
   * something code can detect — delete the line instead.
   */
  profiles: [
    // TODO: uncomment once the account exists and has posted.
    // 'https://twitter.com/mealfindapp',
  ] as string[],


  /** Where beta sign-ups and everything else lands. */
  email: EMAIL,

  /** Cloudflare Web Analytics token — empty disables analytics entirely. */
  cloudflareAnalyticsToken: CF_ANALYTICS_TOKEN,

  /** Search Console `<meta>` token — empty renders no verification tag. */
  googleSiteVerification: GOOGLE_SITE_VERIFICATION,

  /**
   * Supermarkets the app compares today — the three in the beta's shopping
   * list. This is a factual claim about what the product does, so a name only
   * belongs here once its prices are actually live in the app.
   */
  retailers: ['Tesco', "Sainsbury's", 'ASDA'],

  /**
   * Store links. `#` means that store has no listing yet. Each store goes live
   * on its own, so check the one you are about to render with `isLiveLink`.
   */
  links: {
    // The UK listing, found from the bundle id (com.vin.mealfind) via Apple's lookup API.
    appStore: 'https://apps.apple.com/gb/app/mealfind/id6792030687',
    googlePlay: '#', // TODO: https://play.google.com/store/apps/details?id=com.vin.mealfind
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

/**
 * Every URL that identifies this brand somewhere other than this site, for the
 * `sameAs` property of the Organization schema.
 *
 * Store links sit in `links` as `'#'` until the listings go live, and a
 * `sameAs` of `"#"` is not a URL at all — it invalidates the block rather
 * than being quietly ignored. Filtering them here also means the store URLs
 * start counting as entity signals the moment someone pastes the real ones
 * into `links`, with nothing to remember a second time.
 */
export function brandProfiles(): string[] {
  const stores = [siteConfig.links.appStore, siteConfig.links.googlePlay];

  return [...siteConfig.profiles, ...stores.filter(isLiveLink)];
}

/** True once a store's `#` placeholder has been replaced with its real URL. */
export function isLiveLink(href: string): boolean {
  return href.startsWith('http');
}

/**
 * The Open Graph / Twitter card image descriptor.
 *
 * Every page has to spell its `openGraph` block out in full — metadata merges
 * shallowly, so naming the key at all replaces the root layout's object rather
 * than extending it — which meant the same four image properties were copied
 * into five files, free to drift apart. Only the alt text ever actually
 * differs, so that is the only thing this takes.
 *
 * `width`/`height` let a scraper reserve the right space before the image has
 * downloaded, instead of reflowing the card once it arrives. `type` saves it
 * sniffing the bytes to find out what it got.
 *
 * The dimensions are the 1.91:1 that Facebook, X, LinkedIn, Slack and iMessage
 * all crop to. They must match what `scripts/generate-og-image.mjs` actually
 * renders: a scraper trusts these tags over the file, so a mismatch shows up as
 * a stretched or letterboxed card rather than an error anyone would notice.
 */
export function ogImage(alt: string) {
  return {
    url: '/og.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt,
  };
}
