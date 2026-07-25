import Link from 'next/link';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteNav } from '@/components/sections/SiteNav';
import { ArrowRight } from '@/components/ui/icons';

export interface LegalSection {
  /** Anchor slug — makes each clause deep-linkable (`/privacy/#your-rights`). */
  id: string;
  heading: string;
  /** The clause itself: plain `<p>`, `<ul>` and `<a>` markup. */
  body: ReactNode;
}

/**
 * A headed block that sits outside the numbered clauses — a lead-in above them
 * or a recap below. Deliberately not a `LegalSection`: giving these a number
 * would imply they're operative terms you could be held to, and would shift
 * every real clause's number by one.
 */
export interface LegalAside {
  id: string;
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  /** One line under the heading saying what the document covers. */
  summary: string;
  /** e.g. `13 July 2026`. */
  date: string;
  /**
   * What that date means. Documents differ: a privacy notice states the date it
   * took effect, a cookie policy the date it was last revised — and saying the
   * wrong one is a claim about the document's legal status.
   */
  dateLabel?: string;
  /** e.g. `the MealFind website and mobile application`. */
  appliesTo?: string;
  /**
   * The document itself. Numbering and the contents list are derived from the
   * array order, so clauses can be reordered without renumbering by hand.
   */
  sections: LegalSection[];
  /** Unnumbered lead-in, above the contents list. */
  preamble?: LegalAside;
  /** Unnumbered closing block, below the final clause. */
  closing?: LegalAside;
}

/**
 * Typography for author-written prose inside a clause.
 *
 * The bodies are hand-written JSX rather than a rich-text pipeline, so the
 * element styles are applied from the container instead of forcing every
 * paragraph and list item to carry its own class list.
 */
/** Every top-level heading in the document — numbered clauses and asides alike. */
const headingClass =
  'font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-forest';

const prose = [
  'mt-3 space-y-4 text-[0.9375rem] leading-relaxed text-ink-muted',
  '[&_strong]:font-semibold [&_strong]:text-ink',
  '[&_a]:font-medium [&_a]:text-forest [&_a]:underline [&_a]:underline-offset-2',
  '[&_a]:transition-colors [&_a:hover]:text-forest-dark',
  '[&_ul]:space-y-2 [&_ul]:pl-5',
  '[&_li]:list-disc [&_li]:marker:text-forest/40',
  // Sub-headings within a clause (e.g. the cookie policy's cookie types).
  // `first-child` opts out of the extra lead-in where the clause opens on one.
  '[&_h3]:mt-6 [&_h3:first-child]:mt-0',
  '[&_h3]:font-display [&_h3]:font-semibold [&_h3]:tracking-[-0.015em] [&_h3]:text-ink',
].join(' ');

/**
 * Shared shell for /privacy, /cookies and /terms.
 *
 * Renders a numbered legal document: a contents list, per-clause anchors, and
 * optional unnumbered blocks either side of the clauses.
 *
 * This used to carry a second mode that rendered a structured placeholder for
 * routes whose legal text hadn't been written yet. All three documents are now
 * live, so it's gone — if you add a fourth legal route, give it real copy or
 * leave it out of the footer rather than reviving the placeholder.
 */
export function LegalPage({
  title,
  summary,
  date,
  dateLabel = 'Effective date',
  appliesTo,
  sections,
  preamble,
  closing,
}: LegalPageProps) {
  return (
    <>
      <SiteNav />

      <main id="main" className="mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-bold tracking-[-0.04em] text-forest">
          {title}
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">{summary}</p>

        <p className="mt-6 text-[0.875rem] leading-relaxed text-ink-muted">
          <strong className="font-semibold text-ink">{dateLabel}:</strong>{' '}
          <time dateTime={toISODate(date)}>{date}</time>
          {appliesTo ? (
            <>
              <br />
              Applies to {appliesTo}.
            </>
          ) : null}
        </p>

        {preamble ? (
          <section
            id={preamble.id}
            aria-labelledby={`${preamble.id}-heading`}
            className="mt-10"
          >
            <h2 id={`${preamble.id}-heading`} className={headingClass}>
              {preamble.heading}
            </h2>
            <div className={prose}>{preamble.body}</div>
          </section>
        ) : null}

        <nav
          aria-labelledby="contents"
          className="mt-10 rounded-card border border-line bg-paper p-6 shadow-card"
        >
          <h2
            id="contents"
            className="text-[0.8125rem] font-semibold tracking-[0.08em] text-forest uppercase"
          >
            Contents
          </h2>
          <ol className="mt-4 space-y-2">
            {sections.map((section, index) => (
              <li key={section.id} className="text-[0.9375rem] leading-relaxed">
                <a
                  href={`#${section.id}`}
                  className="text-ink-muted transition-colors hover:text-forest"
                >
                  <span className="mr-2 tabular-nums text-ink-muted/60">{index + 1}.</span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-10">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`} className={headingClass}>
                <span className="mr-2 tabular-nums text-ink-muted/60">{index + 1}.</span>
                {section.heading}
              </h2>
              <div className={prose}>{section.body}</div>
            </section>
          ))}
        </div>

        {closing ? (
          /*
           * Set in a card so it reads as a recap of the clauses above rather
           * than as further terms — it carries no number for the same reason.
           */
          <section
            id={closing.id}
            aria-labelledby={`${closing.id}-heading`}
            className="mt-12 rounded-card border border-line bg-paper p-6 shadow-card"
          >
            <h2 id={`${closing.id}-heading`} className={headingClass}>
              {closing.heading}
            </h2>
            <div className={prose}>{closing.body}</div>
          </section>
        ) : null}

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 rounded-full text-[0.875rem] font-medium text-forest transition-colors hover:text-forest-dark"
        >
          Back to MealFind
          <ArrowRight className="size-4" />
        </Link>
      </main>

      <SiteFooter />
    </>
  );
}

/**
 * `13 July 2026` → `2026-07-13`, for the `<time datetime>` attribute.
 *
 * Returns `undefined` for anything it can't parse rather than guessing — an
 * invalid `datetime` is worse than none at all, and omitting the attribute
 * leaves the human-readable date untouched.
 */
function toISODate(date: string): string | undefined {
  const parsed = new Date(`${date} UTC`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}
