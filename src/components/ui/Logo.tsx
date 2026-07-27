import Image from 'next/image';

import { cn } from '@/lib/cn';

/**
 * The MealFind mark — the mortar and pestle from the master artwork.
 *
 * Cropped out of `Logo.png` by `scripts/generate-logo-assets.mjs`, which also
 * emits the favicon and home-screen icons from the same source, so the tab, the
 * nav and the iOS icon can never drift apart.
 *
 * Size it the way the inline icons are sized — `className="size-6"` — rather
 * than through `width`/`height`; those are the intrinsic dimensions and exist
 * only to reserve layout space. Unlike `LeafMark` this is full-colour artwork,
 * so it ignores `currentColor`; for a tintable leaf silhouette (decorative
 * washes, background art) use `LeafMark` instead.
 */
export function LogoMark({
  className,
  alt = '',
  priority = false,
}: {
  className?: string;
  /** Leave empty where adjacent text already names the brand. */
  alt?: string;
  /** Set on the nav mark only — it's above the fold on every route. */
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt={alt}
      width={160}
      height={160}
      className={cn('object-contain', className)}
      priority={priority}
    />
  );
}
