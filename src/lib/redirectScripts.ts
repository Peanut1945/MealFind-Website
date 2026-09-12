import { isLiveLink, siteConfig } from '@/lib/site';
import { APP_RECIPE_BASE, ID_PATTERN, MAX_NAME } from '@/lib/sharedRecipeLink';

/**
 * The inline scripts that move a visitor on from /qr and /r without a tap.
 *
 * Inline, not a `useEffect`, because an effect waits for every bundle on the
 * page to download and hydrate — a second or more on a phone that has just
 * scanned a code, and never at all if anything on the way throws. A `<script>`
 * in the HTML runs the moment the parser reaches it, before the first paint.
 *
 * They are strings built at build time, so they can only use what a browser
 * gives them: no imports, nothing from React. What they need from the rest of
 * the site (store links, the id rules) is interpolated in below, so there is
 * still one place each of those is defined. Keep the syntax ES5 — an old
 * in-app browser is exactly the kind that follows a QR code, and nothing
 * transpiles these.
 */

/** Escapes a build-time value for interpolation into an inline script. */
const js = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

/**
 * Sets `android` and `apple` for the phone running the script.
 *
 * iPadOS 13+ asks for the desktop site by default and reports a Mac user
 * agent. No Mac has a touch screen, so touch points are what give an iPad away.
 */
const DETECT_PLATFORM =
  'var ua=navigator.userAgent,' +
  'android=/Android/i.test(ua),' +
  'apple=/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);';

/**
 * mealfind.co.uk/qr: an iPhone or iPad to the App Store, an Android to Google
 * Play, anything else to the home page.
 *
 * A phone whose store has no listing yet goes home too, which explains the
 * app, rather than to a store that can't install it. Desktops go there because
 * a QR code scanned on one is rare, and neither store is the right answer.
 *
 * `replace`, not `assign`: /qr must not stay in the history, or Back from the
 * store would land here and bounce straight out again.
 */
export function qrRedirectScript(links: { appStore: string; googlePlay: string } = siteConfig.links) {
  const appStore = isLiveLink(links.appStore) ? links.appStore : '/';
  const googlePlay = isLiveLink(links.googlePlay) ? links.googlePlay : '/';

  return (
    '(function(){' +
    DETECT_PLATFORM +
    `location.replace(android?${js(googlePlay)}:apple?${js(appStore)}:"/");` +
    '})();'
  );
}

/**
 * mealfind.co.uk/r/<id>: try to open the recipe in the installed app.
 *
 * The same reading of the URL as `readSharedRecipeLink` and the same app URL
 * as `appRecipeUrl` — the page's "Open in MealFind" button — just without
 * waiting for anyone to tap it. A link that doesn't carry a valid id does
 * nothing, as the button isn't offered for one either.
 *
 * Phones only. The app can't be installed on a desktop, and desktop Safari
 * answers an unknown scheme with an error dialog.
 *
 * ⚠️ On an iPhone without the app, Safari shows "cannot open the page because
 * the address is invalid" before leaving them on this page. There is no way
 * for a web page to ask whether an app is installed; the real fix is universal
 * links (scripts/generate-app-links.mjs), which open the app before this page
 * is ever requested.
 */
export function openRecipeInAppScript() {
  return (
    '(function(){' +
    DETECT_PLATFORM +
    'if(!android&&!apple)return;' +
    'var s=location.pathname.split("/").filter(Boolean);' +
    'if(s[0]!=="r"||s.length!==2)return;' +
    'var id;try{id=decodeURIComponent(s[1])}catch(e){return}' +
    `if(!${ID_PATTERN.toString()}.test(id))return;` +
    `var n=(new URLSearchParams(location.search).get("n")||"").trim().slice(0,${js(MAX_NAME)});` +
    `location.href=${js(APP_RECIPE_BASE)}+"?id="+encodeURIComponent(id)+(n?"&Recipe="+encodeURIComponent(n):"");` +
    '})();'
  );
}
