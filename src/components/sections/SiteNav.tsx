'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { CTAButton } from '@/components/ui/CTAButton';
import { LogoMark } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site';
import { motion as motionTokens } from '@/lib/tokens';

/**
 * Sticky top navigation.
 *
 * Starts transparent over the hero and gains a frosted cream background plus a
 * hairline once you scroll past ~24px, so the wordmark never sits on bare
 * content. The mobile menu is a real disclosure: `aria-expanded`, `aria-controls`,
 * Escape to close, and focus stays inside the button that owns it.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <header
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
            onKeyDown={(event) => {
              if (event.key === 'Escape') setMenuOpen(false);
            }}
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: motionTokens.ease }}
            className="overflow-hidden border-t border-line bg-cream/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
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
                <CTAButton
                  href={siteConfig.links.beta}
                  size="md"
                  className="w-full"
                >
                  Join the beta
                </CTAButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
