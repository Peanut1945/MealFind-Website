import type { Metadata } from 'next';
import Link from 'next/link';

import type { LegalSection } from '@/components/sections/LegalPage';
import { LegalPage } from '@/components/sections/LegalPage';
import { ogImage, siteConfig } from '@/lib/site';

const title = 'Delete your MealFind account';
const description =
  'How to delete your MealFind account and its data, in the app or by email, and what we keep afterwards.';
const url = `${siteConfig.url}/delete-account/`;

/**
 * `openGraph` and `twitter` are declared in full rather than partially.
 * Metadata merges *shallowly*, so naming either key here replaces the root
 * layout's object outright — listing only a title would silently drop the OG
 * image, site name and locale from this page's tags.
 */
export const metadata: Metadata = {
  title: 'Delete your account',
  description,
  alternates: { canonical: '/delete-account/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url,
    siteName: siteConfig.name,
    title: `${title} - ${siteConfig.name}`,
    description,
    images: [ogImage(`${siteConfig.name}: good food, priced right.`)],
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

const LAST_UPDATED = '11 October 2026';

/** Opens a mail client with the request already written; the address is also shown as text. */
const REQUEST_SUBJECT = 'Delete my MealFind account';
const requestEmail = `mailto:${siteConfig.email}?subject=${encodeURIComponent(REQUEST_SUBJECT)}&body=${encodeURIComponent(
  'Please delete my MealFind account and its data.\n\nThe email address on my account is: ',
)}`;

/**
 * Google Play links here as the app's account-deletion URL, and its policy
 * asks for three things: the app's name, the steps to request deletion, and
 * what is deleted or kept. Keep all three true to the app.
 *
 * - The in-app steps follow the Account tab (VinTest app/(tabs)/Account.tsx).
 * - "What gets deleted" is users/<uid> plus the records the onAccountDeleted
 *   function clears (VinTest functions/src/account/purge.ts). A new place that
 *   stores data against a user belongs in both lists.
 *
 * The `id` values are public anchors; changing one breaks any link to it.
 */
const sections: LegalSection[] = [
  {
    id: 'in-the-app',
    heading: 'Delete it in the app',
    body: (
      <>
        <p>The quickest way, on iPhone or Android. It takes effect straight away.</p>
        <ol>
          <li>
            Open MealFind and go to the <strong>Account</strong> tab (the person icon,
            bottom right).
          </li>
          <li>
            Under <strong>Account actions</strong>, tap <strong>Delete account</strong>.
          </li>
          <li>
            Tap <strong>Delete</strong>, then enter your password to confirm.
          </li>
        </ol>
        <p>
          Your account is deleted and you&rsquo;re signed out. Removing the app from
          your phone does not delete your account.
        </p>
      </>
    ),
  },
  {
    id: 'by-email',
    heading: 'Ask us to delete it',
    body: (
      <>
        <p>
          If you no longer have the app, or can&rsquo;t sign in, email us and
          we&rsquo;ll delete your account for you.
        </p>
        <ol>
          <li>
            Email <a href={requestEmail}>{siteConfig.email}</a> from the email address
            you signed up with.
          </li>
          <li>
            Use the subject <strong>{REQUEST_SUBJECT}</strong>. You don&rsquo;t need to
            give a reason.
          </li>
        </ol>
        <p>
          We delete the account and reply to confirm within 30 days, usually much
          sooner. We only act on requests sent from the account&rsquo;s own email
          address, so nobody else can delete your account. If you can no longer use
          that address, say so in your email and we&rsquo;ll find another way to
          confirm the account is yours.
        </p>
      </>
    ),
  },
  {
    id: 'guests',
    heading: 'If you used MealFind as a guest',
    body: (
      <p>
        A guest session has no email address, so there is nothing for us to look up.
        To delete one, go to the <strong>Account</strong> tab, tap{' '}
        <strong>Leave guest mode</strong>, then <strong>Leave</strong>. That deletes
        the guest session and everything it saved.
      </p>
    ),
  },
  {
    id: 'what-gets-deleted',
    heading: 'What gets deleted',
    body: (
      <>
        <p>Everything linked to your account:</p>
        <ul>
          <li>Your sign-in details: your email address and password.</li>
          <li>
            Your profile and preferences: your name, diets and allergies, favourite
            cuisines, supermarkets, your sous chef and your notification settings.
          </li>
          <li>
            What you&rsquo;ve saved and planned: favourites and matches, meal plans,
            your trolley and shopping lists, cook history, logged meals, goals,
            ratings and votes.
          </li>
          <li>
            The records we keep for your account behind the scenes: daily usage counts
            for the free limits, your notification history, and any support messages
            you&rsquo;ve sent us.
          </li>
        </ul>
        <p>
          Deleting in the app removes all of this at once. If you ask by email, it all
          goes when we carry out your request.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-keep',
    heading: 'What we keep',
    body: (
      <ul>
        <li>
          <strong>Recipes you created.</strong>{' '}
          New recipes join MealFind&rsquo;s shared library, which everyone uses, so
          they stay after you leave. They don&rsquo;t show your name or email
          address.
        </li>
        <li>
          <strong>Statistics.</strong> Figures already drawn from how the app was
          used stay in our analytics: how often recipes are opened, star ratings,
          which notifications were opened, and the app usage that Firebase Analytics
          records. Some of these carry a random ID, but never your name or email
          address, and once your account is deleted nothing links that ID back to
          you.
        </li>
      </ul>
    ),
  },
  {
    id: 'questions',
    heading: 'Questions',
    body: (
      <p>
        Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Our{' '}
        <Link href="/privacy/">privacy policy</Link> explains what we collect and the
        rights you have over it.
      </p>
    ),
  },
];

export default function DeleteAccountPage() {
  return (
    <LegalPage
      title={title}
      summary="How to delete your account and its data, in the app or by email, and what happens to it."
      date={LAST_UPDATED}
      dateLabel="Last updated"
      appliesTo="the MealFind app on iPhone and Android"
      sections={sections}
    />
  );
}
