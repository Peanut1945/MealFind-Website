import type { Metadata } from 'next';

import type { LegalSection } from '@/components/sections/LegalPage';
import { LegalPage } from '@/components/sections/LegalPage';
import { siteConfig } from '@/lib/site';

const title = 'Privacy policy';
const description =
  'How MealFind collects, uses and protects your personal data, and the rights you have under UK GDPR.';
const url = `${siteConfig.url}/privacy/`;

/**
 * `openGraph` and `twitter` are declared in full rather than partially.
 * Metadata merges *shallowly*, so naming either key here replaces the root
 * layout's object outright — listing only a title would silently drop the OG
 * image, site name and locale from this page's tags.
 */
export const metadata: Metadata = {
  title: 'Privacy',
  description,
  alternates: { canonical: '/privacy/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url,
    siteName: siteConfig.name,
    title: `${title} - ${siteConfig.name}`,
    description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}: good food, priced right.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${title} - ${siteConfig.name}`,
    description,
    images: ['/og.png'],
  },
};

const EFFECTIVE_DATE = '13 July 2026';

/**
 * The notice itself.
 *
 * This is a legal document: edit the wording only with whoever handles your
 * data protection obligations, and move `EFFECTIVE_DATE` when you do. Clause
 * numbering comes from array order, so reordering is safe, but the `id` values
 * are public anchors — changing one breaks any link pointing at it.
 */
const sections: LegalSection[] = [
  {
    id: 'introduction',
    heading: 'Introduction',
    body: (
      <p>
        Welcome to MealFind. We respect your privacy and process personal data in
        accordance with the UK GDPR, the Data Protection Act 2018 and, where
        applicable, the EU GDPR.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    heading: 'Information we collect',
    body: (
      <>
        <p>We may collect:</p>
        <ul>
          <li>
            Account information (name, email, encrypted password and optional profile
            picture).
          </li>
          <li>
            Preferences including dietary requirements, allergies, favourite cuisines
            and supermarkets.
          </li>
          <li>
            Usage data such as recipes viewed, searches, saved recipes, app
            interactions and device/app information.
          </li>
          <li>Communications you send us.</li>
          <li>Content you upload including reviews, ratings and recipes.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-your-information',
    heading: 'How we use your information',
    body: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve MealFind.</li>
          <li>Personalise recommendations.</li>
          <li>Save your preferences.</li>
          <li>Provide customer support.</li>
          <li>Maintain security and prevent fraud.</li>
          <li>Analyse performance and develop new features.</li>
          <li>Send service communications.</li>
          <li>
            Send marketing communications only where permitted by law. You may
            unsubscribe at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'legal-basis',
    heading: 'Legal basis',
    body: (
      <p>
        We process personal data to perform our contract with you, comply with legal
        obligations, pursue legitimate interests such as improving and securing
        MealFind, and where required, based on your consent (for example, certain
        cookies or marketing).
      </p>
    ),
  },
  {
    id: 'ai-features',
    heading: 'AI features',
    body: (
      <>
        <p>
          MealFind may use AI to answer recipe questions, recommend recipes, suggest
          ingredient substitutions and improve search functionality.
        </p>
        <p>
          AI-generated responses may be inaccurate and are provided for general
          information only. They should not be considered medical or nutritional
          advice.
        </p>
      </>
    ),
  },
  {
    id: 'prices-and-nutrition',
    heading: 'Prices and nutrition',
    body: (
      <p>
        Recipe costs, supermarket prices and nutritional values are estimates and may
        differ due to retailer pricing, promotions, availability and other factors.
        Please verify information before making purchasing or dietary decisions.
      </p>
    ),
  },
  {
    id: 'sharing-your-information',
    heading: 'Sharing your information',
    body: (
      <>
        <p>We do not sell your personal information.</p>
        <p>We may share information with trusted service providers such as:</p>
        <ul>
          <li>Cloud hosting providers</li>
          <li>Authentication providers</li>
          <li>Analytics providers</li>
          <li>Email providers</li>
          <li>Customer support providers</li>
          <li>Where required by law</li>
        </ul>
      </>
    ),
  },
  {
    id: 'international-transfers',
    heading: 'International transfers',
    body: (
      <p>
        Where information is transferred outside the UK, we use appropriate safeguards
        where legally required.
      </p>
    ),
  },
  {
    id: 'security',
    heading: 'Security',
    body: (
      <p>
        We use appropriate technical and organisational measures including encryption,
        access controls and monitoring. However, no system can be completely secure.
      </p>
    ),
  },
  {
    id: 'data-retention',
    heading: 'Data retention',
    body: (
      <p>
        We retain information only as long as necessary. When you delete your account,
        we will delete or anonymise your personal information within a reasonable
        period unless we are legally required to retain it.
      </p>
    ),
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    body: (
      <>
        <p>You may request:</p>
        <ul>
          <li>Access to your data</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of your data</li>
          <li>Restriction of processing</li>
          <li>Object to processing</li>
          <li>Data portability</li>
          <li>Withdrawal of consent where applicable</li>
        </ul>
        <p>
          UK users may also complain to the{' '}
          <a href="https://ico.org.uk/" target="_blank" rel="noreferrer">
            Information Commissioner&rsquo;s Office (ICO)
          </a>{' '}
          if they believe their data protection rights have been infringed.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    heading: 'Children',
    body: (
      <p>
        MealFind is not intended for children under the age of 13 and we do not
        knowingly collect their personal information.
      </p>
    ),
  },
  {
    id: 'cookies',
    heading: 'Cookies',
    body: (
      <>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Keep you signed in.</li>
          <li>Remember your preferences.</li>
          <li>Understand how MealFind is used.</li>
          <li>Improve our services.</li>
        </ul>
        <p>
          You can manage cookies through your browser or device settings where
          applicable.
        </p>
      </>
    ),
  },
  {
    id: 'changes-to-this-policy',
    heading: 'Changes to this policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. Where appropriate, we
        will notify users of material changes through the app, website or email.
      </p>
    ),
  },
  {
    id: 'contact-us',
    heading: 'Contact us',
    body: (
      <>
        <p>
          If you have any questions or privacy concerns, or wish to exercise your data
          protection rights, please contact us at:
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title={`${siteConfig.name} privacy policy`}
      summary="What we collect, why we collect it, and what you can ask us to do with it."
      date={EFFECTIVE_DATE}
      appliesTo="the MealFind website and mobile application"
      sections={sections}
    />
  );
}
