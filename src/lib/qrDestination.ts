import { isLiveLink, siteConfig } from '@/lib/site';

/**
 * Where `mealfind.co.uk/qr` sends the phone that scanned it.
 *
 * Kept free of browser APIs, like sharedRecipeLink.ts, so it is a plain
 * function of what the browser reports — QrRedirect hands it the real values.
 */

type StoreLinks = { appStore: string; googlePlay: string };

/**
 * iPadOS 13+ asks for the desktop site by default and reports a Mac user
 * agent. No Mac has a touch screen, so touch points are what give an iPad away.
 */
function isApple(userAgent: string, maxTouchPoints: number): boolean {
  if (/iPhone|iPad|iPod/.test(userAgent)) return true;
  return /Macintosh/.test(userAgent) && maxTouchPoints > 1;
}

/**
 * The URL to send this visitor to. A phone whose store has no listing yet goes
 * to the home page, which explains the app, rather than to a store that can't
 * install it. Desktops go there too — a QR code scanned there is rare, and
 * neither store is the right answer for it.
 */
export function qrDestination(
  userAgent: string,
  maxTouchPoints: number,
  links: StoreLinks = siteConfig.links,
): string {
  if (/Android/i.test(userAgent)) {
    return isLiveLink(links.googlePlay) ? links.googlePlay : '/';
  }
  if (isApple(userAgent, maxTouchPoints)) {
    return isLiveLink(links.appStore) ? links.appStore : '/';
  }
  return '/';
}
