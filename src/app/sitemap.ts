import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

/**
 * Emitted as a static `sitemap.xml` at build time (works under
 * `output: 'export'`).
 *
 * `dynamic = 'force-static'` is required: without it Next treats the route as
 * dynamic and the export build fails.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    /*
     * All three legal routes now carry real, indexable copy. If you ever add a
     * fourth, list it here only once it does — a noindex URL in a sitemap sends
     * search engines contradictory instructions.
     */
    ...siteConfig.legal.map((page) => ({
      url: `${siteConfig.url}${page.href}/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
