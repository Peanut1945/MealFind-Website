import { twMerge } from 'tailwind-merge';

/**
 * Joins class names, with later Tailwind utilities beating earlier conflicting
 * ones.
 *
 * The plain-`join` version of this looked fine until two real bugs showed up:
 *
 *   <CTAButton className="hidden sm:inline-flex" />   // base sets `inline-flex`
 *   <PhoneMockup className="w-[296px]" />             // base sets `w-[264px]`
 *
 * Both produce two utilities setting the same property. CSS resolves that by
 * *stylesheet* order, not by the order they appear in the attribute — so the
 * base class can silently win and the caller's override does nothing. The nav
 * button stayed visible at mobile widths for exactly this reason.
 *
 * `twMerge` strips the losing utility so the last one written actually applies,
 * which is what every call site already assumed.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(' '));
}
