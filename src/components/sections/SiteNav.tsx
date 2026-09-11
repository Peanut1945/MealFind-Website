'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CTAButton } from '@/components/ui/CTAButton';
import { LogoMark } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site';

/**
 * Sticky top navigation.
 *
 * Starts transparent over the hero and gains a frosted cream background plus a
 * hairline once you scroll past ~24px, so the wordmark never sits on bare
 * content. The mobile menu is a real disclosure: `aria-expanded`,
 * `aria-controls`, Escape to close, and nothing inside it is reachable while
 * it's shut.
 *
 * Deliberately free of Framer Motion. This component renders on every route,
 * so anything it imports is downloaded before /privacy, /terms, /cookies and
 * the 404 can hydrate — pages that otherwise animate nothing at all. The two
 * things it needed Framer for (a scroll threshold and a height transition) are
 * a scroll listener and a CSS grid transition respectively, so the whole
 * library was being shipped site-wide for effects the platform does natively.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    /*
     * Read once up front rather than waiting for the first scroll event.
     * Browsers restore the previous scroll offset on a back-navigation or
     * reload, which fires no event — without this the nav renders transparent
     * over mid-page content until the user happens to move.
     */
    onScroll();

    // Passive: this listener never calls preventDefault, and saying so keeps it
    // off the critical path of the scroll itself.
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === 'Escape') setMenuOpen(false);
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'bg-cream/85 shadow-[0_1px_0_rgb(31_61_43/0.08)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full text-forest"
          aria-label={`${siteConfig.name} home`}
        >
          <LogoMark className="size-[1.75rem]" priority />
          <span className="font-display text-[0.9375rem] font-bold tracking-[-0.02em]">
            MealFind
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full text-[0.8125rem] font-medium text-moss transition-colors duration-200 hover:text-forest"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CTAButton href={siteConfig.links.beta} size="sm" className="hidden sm:inline-flex">
            Join the beta
          </CTAButton>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  'absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-300',
                  menuOpen && 'translate-y-[5.25px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current transition-transform duration-300',
                  menuOpen && '-translate-y-[5.25px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/*
        The open/close animation is a `grid-template-rows: 0fr → 1fr`
        transition, which is the one way CSS can animate to an element's
        intrinsic height — `height: auto` is not an interpolable value, which is
        exactly why Framer's `AnimatePresence` was measuring it in JS before.

        The row's content sits in a bare `min-h-0` wrapper and the padding goes
        on the `<ul>` inside it. That nesting is load-bearing, not tidiness:
        `min-height: 0` lets a grid item shrink past its min-content height, but
        padding is part of the border box and never shrinks, so putting `py-4`
        on the grid item itself floors the collapsed menu at 33px — a visible
        strip of frosted bar hanging under the nav on every page.

        Unlike the old version this stays mounted, so `inert` does the work
        `AnimatePresence`'s unmount used to: while the menu is shut, its links
        are out of the tab order and hidden from screen readers. Without it the
        `overflow-hidden` would hide them visually but still let a keyboard tab
        into a zero-height box.
      */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          'grid overflow-hidden border-t bg-cream/95 backdrop-blur-md md:hidden',
          'transition-[grid-template-rows,opacity,border-color] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          'motion-reduce:transition-none',
          menuOpen
            ? 'grid-rows-[1fr] border-line opacity-100'
            : 'grid-rows-[0fr] border-transparent opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-4">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-[0.9375rem] font-medium text-forest transition-colors hover:bg-forest/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 sm:hidden">
              <CTAButton href={siteConfig.links.beta} size="md" className="w-full">
                Join the beta
              </CTAButton>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
