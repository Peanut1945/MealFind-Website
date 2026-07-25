/**
 * Prefixes a `public/` path with the deployment's base path.
 *
 * `basePath` in next.config.ts covers `<Link href>` and the `_next/*` bundles
 * automatically, but nothing else: a literal `/logo-mark.png` handed to
 * `<Image src>`, or an icon URL in a `Metadata` object, is emitted verbatim and
 * 404s on a sub-path deployment. Route every hand-written `public/` reference
 * through here instead.
 *
 * Reads the env var rather than importing from next.config.ts so this stays
 * usable in client components — `NEXT_PUBLIC_` values are inlined at build
 * time, so the two can't drift.
 *
 * @example asset('/og.png')  // '' -> '/og.png',  '/MealFind-Website' -> '/MealFind-Website/og.png'
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
