import Link from 'next/link';

import { LogoMark } from '@/components/ui/Logo';
import { siteConfig } from '@/lib/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-start gap-2.5 text-[0.8125rem] text-ink-muted">
          <LogoMark className="mt-0.5 size-5 shrink-0" />
          <div>
            {/* The slogan signs off every page — the last thing read on the
                site, and the only place it appears on the legal routes. */}
            <p className="font-accent text-[1.0625rem] leading-none italic text-forest/80">
              {siteConfig.slogan}
            </p>
            <p className="mt-2.5">
              &copy; {year} {siteConfig.name}. Made by students, in Britain.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded transition-colors duration-200 hover:text-forest"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {siteConfig.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:text-forest"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
