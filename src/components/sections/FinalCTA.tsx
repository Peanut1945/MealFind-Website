import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { CTAButton } from '@/components/ui/CTAButton';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { Section } from '@/components/ui/Section';
import { AppleLogo, GooglePlayLogo } from '@/components/ui/icons';
import { siteConfig } from '@/lib/site';

/**
 * Closing call to action, plus the two store buttons.
 *
 * The store links are `#` placeholders until the listings exist — see
 * `siteConfig.links`. They're rendered as disabled-looking but still focusable
 * elements rather than being hidden, so the layout is final; swap the hrefs in
 * and they light up.
 */
export function FinalCTA() {
  const storesLive = siteConfig.links.appStore !== '#';

  return (
    <Section id="beta" tone="cream" spacing="loose" aria-labelledby="beta-heading">
      <Reveal stagger>
        <RevealItem>
          <ScriptAccent centered>ready when you are</ScriptAccent>
        </RevealItem>

        <RevealItem>
          <h2
            id="beta-heading"
            className="mt-3 text-center font-display text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-forest"
          >
            Join the beta.
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mx-auto mt-5 max-w-md text-center text-[0.9375rem] leading-relaxed text-ink-muted">
            Version 1.0 is being tested right now. Email us and we&rsquo;ll add
            you to the next round &mdash; and tell us what you cook, because the
            beta is where we find out what to build next.
          </p>
        </RevealItem>

        <RevealItem>
          <div className="mt-9 flex flex-col items-center gap-4">
            <CTAButton href={siteConfig.links.betaEmail} size="lg">
              Get early access
            </CTAButton>

            {/*
              The address in plain text as well as behind the button: a `mailto:`
              is useless to anyone on webmail without a registered handler, and
              this way it can be copied.
            */}
            <p className="text-[0.8125rem] text-ink-muted">
              or email us at{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded font-medium text-forest underline decoration-forest/25 underline-offset-4 transition-colors duration-200 hover:decoration-forest"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-[0.6875rem] font-medium tracking-[0.14em] text-ink-muted/70 uppercase">
              {storesLive ? 'Download now' : 'Coming soon to'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <StoreButton
                href={siteConfig.links.appStore}
                live={storesLive}
                logo={<AppleLogo className="size-6" />}
                caption="Download on the"
                store="App Store"
              />
              <StoreButton
                href={siteConfig.links.googlePlay}
                live={storesLive}
                logo={<GooglePlayLogo className="size-[1.35rem]" />}
                caption="Get it on"
                store="Google Play"
              />
            </div>
          </div>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

interface StoreButtonProps {
  href: string;
  live: boolean;
  logo: React.ReactNode;
  caption: string;
  store: string;
}

function StoreButton({ href, live, logo, caption, store }: StoreButtonProps) {
  const content = (
    <>
      <span className="shrink-0">{logo}</span>
      <span className="flex flex-col text-left leading-none">
        <span className="text-[0.5625rem] tracking-[0.06em] opacity-70">
          {caption}
        </span>
        <span className="mt-1 text-[0.875rem] font-semibold tracking-[-0.015em]">
          {store}
        </span>
      </span>
    </>
  );

  const className =
    'inline-flex items-center gap-3 rounded-2xl border border-forest/20 px-5 py-3 text-forest transition-colors duration-200';

  // Until the listing exists there's nothing to link to. A real <a href="#">
  // would promise a destination it can't deliver, so render inert markup and
  // say so to assistive tech instead.
  if (!live) {
    return (
      <span
        className={`${className} cursor-default opacity-55`}
        aria-label={`${store} — coming soon`}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:border-forest/50 hover:bg-forest/5`}
    >
      {content}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
