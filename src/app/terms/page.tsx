import type { Metadata } from 'next';
import Link from 'next/link';

import type { LegalAside, LegalSection } from '@/components/sections/LegalPage';
import { LegalPage } from '@/components/sections/LegalPage';
import { siteConfig } from '@/lib/site';

const title = 'Terms of service';
const description =
  'The terms that apply when you use the MealFind app, website and related services.';
const url = `${siteConfig.url}/terms/`;

/**
 * `openGraph` and `twitter` are declared in full rather than partially.
 * Metadata merges *shallowly*, so naming either key here replaces the root
 * layout's object outright — listing only a title would silently drop the OG
 * image, site name and locale from this page's tags.
 */
export const metadata: Metadata = {
  title: 'Terms',
  description,
  alternates: { canonical: '/terms/' },
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

const EFFECTIVE_DATE = '13 July 2026';

/** Unnumbered lead-in — the terms proper start at clause 1. */
const welcome: LegalAside = {
  id: 'welcome',
  heading: 'Welcome',
  body: (
    <>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the MealFind
        mobile application, website, and related services (collectively, the
        &ldquo;Service&rdquo;).
      </p>
      <p>
        By creating an account or using MealFind, you agree to be bound by these
        Terms. If you do not agree, you should not use the Service.
      </p>
    </>
  ),
};

/**
 * The terms themselves.
 *
 * This is a legal document: edit the wording only with whoever handles your
 * legal obligations, and move `EFFECTIVE_DATE` when you do. Clause numbering
 * comes from array order, so reordering is safe — but these clauses cross-refer
 * to each other by number in the wild (support replies, app copy), and the `id`
 * values are public anchors, so treat both as stable once published.
 */
const sections: LegalSection[] = [
  {
    id: 'about-mealfind',
    heading: 'About MealFind',
    body: (
      <>
        <p>
          MealFind is a platform that helps users discover recipes, compare
          supermarket prices, receive recipe recommendations, and access related food
          and cooking features.
        </p>
        <p>We may update or improve the Service at any time.</p>
      </>
    ),
  },
  {
    id: 'eligibility',
    heading: 'Eligibility',
    body: (
      <>
        <p>
          You must be at least the minimum age required to enter into a legally
          binding agreement in your country of residence to use MealFind.
        </p>
        <p>
          If you are under that age, you may only use MealFind with the permission of
          a parent or legal guardian.
        </p>
      </>
    ),
  },
  {
    id: 'your-account',
    heading: 'Your account',
    body: (
      <>
        <p>You are responsible for:</p>
        <ul>
          <li>Keeping your login details secure.</li>
          <li>Providing accurate account information.</li>
          <li>Updating your information if it changes.</li>
          <li>All activity that occurs under your account.</li>
        </ul>
        <p>
          You must notify us immediately if you believe your account has been accessed
          without your permission.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable use',
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Break any applicable laws.</li>
          <li>Attempt to gain unauthorised access to MealFind.</li>
          <li>Interfere with the operation or security of the Service.</li>
          <li>Upload viruses or malicious software.</li>
          <li>
            Use automated systems to scrape or copy data without our permission.
          </li>
          <li>Impersonate another person.</li>
          <li>
            Post content that is unlawful, abusive, threatening, defamatory,
            discriminatory, or infringes another person&rsquo;s rights.
          </li>
        </ul>
        <p>We may suspend or terminate accounts that violate these Terms.</p>
      </>
    ),
  },
  {
    id: 'user-content',
    heading: 'User content',
    body: (
      <>
        <p>
          If you submit recipes, reviews, comments, ratings, photographs, or other
          content to MealFind, you:
        </p>
        <ul>
          <li>Confirm that you own the content or have permission to share it.</li>
          <li>
            Grant MealFind a worldwide, non-exclusive, royalty-free licence to host,
            display, reproduce, adapt, and use that content for operating, improving,
            promoting, and developing the Service.
          </li>
          <li>Remain the owner of your content.</li>
        </ul>
        <p>
          We reserve the right to remove content that violates these Terms or
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'recipe-and-nutritional-information',
    heading: 'Recipe and nutritional information',
    body: (
      <>
        <p>
          MealFind provides recipe suggestions, cooking guidance, nutritional
          estimates, and supermarket price comparisons for informational purposes
          only.
        </p>
        <p>Although we aim for accuracy, we cannot guarantee that:</p>
        <ul>
          <li>Recipes are error-free.</li>
          <li>Nutritional values are exact.</li>
          <li>Ingredient availability is accurate.</li>
          <li>Prices remain current.</li>
          <li>Allergy information is complete.</li>
        </ul>
        <p>
          You are responsible for checking ingredients, allergens, cooking
          instructions, and prices before purchasing or consuming food.
        </p>
      </>
    ),
  },
  {
    id: 'price-comparison',
    heading: 'Price comparison',
    body: (
      <>
        <p>Prices displayed within MealFind may change without notice.</p>
        <p>
          Supermarkets determine their own pricing, promotions, availability, and
          stock levels. MealFind cannot guarantee that displayed prices will match
          those available in-store or online at the time of purchase.
        </p>
      </>
    ),
  },
  {
    id: 'artificial-intelligence-features',
    heading: 'Artificial intelligence features',
    body: (
      <>
        <p>
          MealFind may use artificial intelligence to provide recipe recommendations,
          cooking advice, substitutions, and other features.
        </p>
        <p>
          AI-generated responses may occasionally be inaccurate or incomplete and
          should not be relied upon as professional dietary, nutritional, or medical
          advice.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual property',
    body: (
      <>
        <p>
          MealFind, including its name, branding, logos, software, design, graphics,
          databases, and original content, is owned by MealFind or its licensors and
          is protected by applicable intellectual property laws.
        </p>
        <p>
          You may not copy, distribute, modify, reverse engineer, or commercially
          exploit any part of the Service without our written permission.
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
          MealFind may include links to third-party websites, supermarkets, retailers,
          or services.
        </p>
        <p>
          We are not responsible for the content, products, pricing, or privacy
          practices of third parties.
        </p>
        <p>
          Your use of third-party services is governed by their own terms and
          policies.
        </p>
      </>
    ),
  },
  {
    id: 'availability',
    heading: 'Availability',
    body: (
      <>
        <p>
          We aim to keep MealFind available at all times but cannot guarantee
          uninterrupted access.
        </p>
        <p>We may:</p>
        <ul>
          <li>Update the Service.</li>
          <li>Modify features.</li>
          <li>Remove features.</li>
          <li>Perform maintenance.</li>
          <li>Temporarily suspend access where necessary.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'limitation-of-liability',
    heading: 'Limitation of liability',
    body: (
      <>
        <p>
          To the fullest extent permitted by law, MealFind shall not be liable for any
          indirect, incidental, consequential, special, or punitive damages arising
          from your use of the Service.
        </p>
        <p>
          Nothing in these Terms limits liability where such limitation is prohibited
          by law, including liability for fraud, fraudulent misrepresentation, or
          death or personal injury caused by negligence.
        </p>
      </>
    ),
  },
  {
    id: 'indemnity',
    heading: 'Indemnity',
    body: (
      <>
        <p>
          You agree to indemnify and hold MealFind harmless from claims, losses,
          damages, liabilities, and expenses arising from:
        </p>
        <ul>
          <li>Your misuse of the Service.</li>
          <li>Your violation of these Terms.</li>
          <li>Your infringement of another person&rsquo;s rights.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'suspension-and-termination',
    heading: 'Suspension and termination',
    body: (
      <>
        <p>We may suspend or terminate your account if:</p>
        <ul>
          <li>You breach these Terms.</li>
          <li>Your activity threatens the security or operation of MealFind.</li>
          <li>We are required to do so by law.</li>
        </ul>
        <p>You may stop using MealFind and delete your account at any time.</p>
      </>
    ),
  },
  {
    id: 'privacy',
    heading: 'Privacy',
    body: (
      <p>
        Your use of MealFind is also governed by our{' '}
        <Link href="/privacy">Privacy Policy</Link>, which explains how we collect,
        use, and protect your personal information.
      </p>
    ),
  },
  {
    id: 'changes-to-these-terms',
    heading: 'Changes to these terms',
    body: (
      <>
        <p>We may update these Terms from time to time.</p>
        <p>
          If we make significant changes, we will notify users through the app or by
          email where appropriate. Continued use of MealFind after the updated Terms
          take effect constitutes acceptance of the revised Terms.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    heading: 'Governing law',
    body: (
      <>
        <p>These Terms are governed by the laws of England and Wales.</p>
        <p>
          Any disputes arising from these Terms or your use of MealFind shall be
          subject to the exclusive jurisdiction of the courts of England and Wales,
          unless applicable consumer protection laws provide otherwise.
        </p>
      </>
    ),
  },
  {
    id: 'contact-us',
    heading: 'Contact us',
    body: (
      <>
        <p>
          If you have any questions regarding these Terms, please contact us:
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

/** Plain-English recap. Unnumbered — the clauses above are what binds. */
const summary: LegalAside = {
  id: 'summary',
  heading: 'Summary',
  body: (
    <>
      <p>By using MealFind, you agree to:</p>
      <ul>
        <li>Use the app responsibly and lawfully.</li>
        <li>Keep your account secure.</li>
        <li>Respect the rights of other users.</li>
        <li>
          Understand that recipes, prices, nutritional information, and AI-generated
          content are provided for general information and may not always be
          completely accurate.
        </li>
        <li>
          Accept that MealFind may improve, modify, or discontinue features over time.
        </li>
      </ul>
    </>
  ),
};

export default function TermsPage() {
  return (
    <LegalPage
      title={`${siteConfig.name} terms of service`}
      summary="The agreement between you and MealFind when you use the app or this site."
      date={EFFECTIVE_DATE}
      appliesTo="the MealFind website, mobile application and related services"
      preamble={welcome}
      sections={sections}
      closing={summary}
    />
  );
}
