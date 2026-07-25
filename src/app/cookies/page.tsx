import type { Metadata } from 'next';

import type { LegalSection } from '@/components/sections/LegalPage';
import { LegalPage } from '@/components/sections/LegalPage';
import { siteConfig } from '@/lib/site';

const title = 'Cookie policy';
const description =
  'The cookies and similar technologies MealFind uses, what each type is for, and how to control them.';
const url = `${siteConfig.url}/cookies/`;

/**
 * `openGraph` and `twitter` are declared in full rather than partially.
 * Metadata merges *shallowly*, so naming either key here replaces the root
 * layout's object outright — listing only a title would silently drop the OG
 * image, site name and locale from this page's tags.
 */
export const metadata: Metadata = {
  title: 'Cookies',
  description,
  alternates: { canonical: '/cookies/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url,
    siteName: siteConfig.name,
    title: `${title} — ${siteConfig.name}`,
    description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — good food, priced right.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${title} — ${siteConfig.name}`,
    description,
    images: ['/og.png'],
  },
};

const LAST_UPDATED = '19 July 2026';

/**
 * The policy itself.
 *
 * This is a legal document: edit the wording only with whoever handles your
 * data protection obligations, and move `LAST_UPDATED` when you do. Clause
 * numbering comes from array order, so reordering is safe, but the `id` values
 * are public anchors — changing one breaks any link pointing at it.
 */
const sections: LegalSection[] = [
  {
    id: 'introduction',
    heading: 'Introduction',
    body: (
      <>
        <p>
          This Cookie Policy explains how MealFind (&ldquo;MealFind&rdquo;,
          &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) uses cookies and
          similar technologies when you use our mobile application, website, and
          related services.
        </p>
        <p>
          By continuing to use MealFind, you acknowledge that cookies may be used as
          described in this policy. Where required by law, we will ask for your
          consent before placing non-essential cookies on your device.
        </p>
      </>
    ),
  },
  {
    id: 'what-are-cookies',
    heading: 'What are cookies?',
    body: (
      <p>
        Cookies are small text files stored on your device that help websites and apps
        function correctly. Similar technologies, such as local storage, software
        development kits (SDKs), and device identifiers, may also be used to provide
        similar functionality.
      </p>
    ),
  },
  {
    id: 'how-we-use-cookies',
    heading: 'How we use cookies',
    body: (
      <>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Keep you signed in to your account.</li>
          <li>Remember your preferences and settings.</li>
          <li>Improve the performance and reliability of MealFind.</li>
          <li>Analyse how users interact with the app so we can improve features.</li>
          <li>Protect against fraud and abuse.</li>
          <li>Measure the effectiveness of new features and updates.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'types-of-cookies',
    heading: 'Types of cookies we use',
    body: (
      <>
        <h3>Essential cookies</h3>
        <p>
          These cookies are necessary for MealFind to operate. They cannot be disabled
          because they enable core functionality such as authentication, security, and
          account management.
        </p>

        <h3>Analytics cookies</h3>
        <p>
          These cookies help us understand how MealFind is used, including which
          features are most popular and where improvements can be made. Information
          collected is generally aggregated and does not directly identify you.
        </p>

        <h3>Functional cookies</h3>
        <p>
          These cookies remember your preferences, such as selected supermarkets,
          dietary preferences, serving sizes, and other personalised settings.
        </p>

        <h3>Performance cookies</h3>
        <p>
          These cookies help us monitor app performance, identify errors, and improve
          stability.
        </p>
      </>
    ),
  },
  {
    id: 'third-party-services',
    heading: 'Third-party services',
    body: (
      <>
        <p>
          MealFind may use trusted third-party providers that place cookies or use
          similar technologies on our behalf. These may include services for:
        </p>
        <ul>
          <li>User authentication</li>
          <li>Analytics</li>
          <li>Crash reporting</li>
          <li>Cloud hosting</li>
          <li>Payment processing (if applicable)</li>
        </ul>
        <p>
          Examples may include Google Firebase, Google Analytics, Apple, or other
          service providers used to operate MealFind.
        </p>
        <p>
          Each third party processes information according to its own privacy policy.
        </p>
      </>
    ),
  },
  {
    id: 'managing-cookies',
    heading: 'Managing cookies',
    body: (
      <>
        <p>You can manage or delete cookies through your browser or device settings.</p>
        <p>
          If you disable essential cookies or similar technologies, some features of
          MealFind may not function correctly.
        </p>
        <p>
          You can also reset advertising identifiers or manage tracking permissions
          through your device settings.
        </p>
      </>
    ),
  },
  {
    id: 'changes-to-this-policy',
    heading: 'Changes to this cookie policy',
    body: (
      <p>
        We may update this Cookie Policy from time to time. Any changes will be posted
        within the app or on our website together with the updated &ldquo;Last
        updated&rdquo; date.
      </p>
    ),
  },
  {
    id: 'contact-us',
    heading: 'Contact us',
    body: (
      <>
        <p>
          If you have any questions about this Cookie Policy or our use of cookies,
          please contact us:
        </p>
        <p>
          <strong>{siteConfig.name}</strong>
          <br />
          <strong>Email:</strong>{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title={`${siteConfig.name} cookie policy`}
      summary="What we store on your device, what each cookie is for, and how to turn them off."
      date={LAST_UPDATED}
      dateLabel="Last updated"
      appliesTo="the MealFind website, mobile application and related services"
      sections={sections}
    />
  );
}
