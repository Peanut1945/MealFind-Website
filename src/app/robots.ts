import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

/** Emitted as a static `robots.txt` at build time. */
export const dynamic = 'force-static';

/**
 * Crawlers that harvest pages to train models, or that scrape in bulk on
 * behalf of AI products, and send no traffic back.
 *
 * Blocking these costs nothing: none of them are a discovery channel, and
 * none of them affects a search ranking. `Google-Extended` and
 * `Applebot-Extended` are the important ones to get right — they are *training
 * opt-out tokens only*. Googlebot and Applebot are separate agents listed as
 * allowed below, so Google Search and Siri results are untouched by this.
 */
/*
 * Two agents are deliberately absent from this list, both of them easy
 * mistakes to make from a published blocklist:
 *
 * - `PetalBot` is Huawei's *search* crawler, not an AI scraper. Blocking it
 *   drops the site out of Petal Search.
 * - `Kangaroo Bot` is written with a space, which is not a valid product token
 *   — a crawler matches the group whose token is a prefix of its user-agent
 *   string, and no parser will match a name containing whitespace, so the entry
 *   only ever looked like protection.
 */
const AI_TRAINING_CRAWLERS = [
  'AI2Bot',
  'Ai2Bot-Dolma',
  'Amazonbot',
  'anthropic-ai',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'ClaudeBot',
  'Claude-Web',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Diffbot',
  'FacebookBot',
  'FriendlyCrawler',
  'Google-CloudVertexBot',
  'Google-Extended',
  'GPTBot',
  'ICC-Crawler',
  'ImagesiftBot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'omgili',
  'omgilibot',
  'PanguBot',
  'Scrapy',
  'SemrushBot-OCOB',
  'SemrushBot-SWA',
  'Timpibot',
  'VelenPublicWebCrawler',
  'Webzio-Extended',
  'YouBot',
];

/**
 * Assistant and AI-search crawlers — the ones that read a page to answer a
 * question *now* and typically cite the source back to the user.
 *
 * ⚠️ These are a traffic channel, not just a cost. Blocking them removes
 * MealFind from ChatGPT search, Perplexity, Claude and Copilot answers, which
 * for a pre-launch app is one of the few places a new name gets discovered.
 * They are blocked here because that is what was asked for — to re-enter those
 * surfaces later, move an entry from this list to `ALLOWED_CRAWLERS` below.
 */
const AI_ASSISTANT_CRAWLERS = [
  'Andibot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'DuckAssistBot',
  'ExaBot',
  'FirecrawlAgent',
  'MistralAI-User',
  'OAI-SearchBot',
  'Perplexity-User',
  'PerplexityBot',
  'PhindBot',
  'YandexAdditional',
];

/**
 * Named explicitly so the intent survives future edits to the lists above:
 * these are the crawlers that put the site in front of people, and nothing
 * here should ever end up blocked by accident.
 *
 * They already match the `*` group, so this is documentation that the spec
 * happens to enforce — a crawler obeys the most specific group that names it.
 */
const ALLOWED_CRAWLERS = [
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'Applebot',
  'DuckDuckBot',
  'Slurp',
  'Yandex',
  'Baiduspider',
  // Link unfurlers — these render the OG card when the site is shared.
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot-LinkExpanding',
  'WhatsApp',
  'TelegramBot',
  'Discordbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: everything is public. Nothing on this site is gated.
      { userAgent: '*', allow: '/' },
      { userAgent: ALLOWED_CRAWLERS, allow: '/' },
      { userAgent: AI_TRAINING_CRAWLERS, disallow: '/' },
      { userAgent: AI_ASSISTANT_CRAWLERS, disallow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
