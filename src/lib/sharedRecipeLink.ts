/**
 * Reading a shared recipe link, and pointing it back at the app.
 *
 * A link the app sent looks like `https://mealfind.co.uk/r/<recipe id>?n=<dish
 * name>` — see `lib/shareLink.ts` in the app repo, which is the other half of
 * this contract and the only thing that writes them.
 *
 * Kept out of the component (and free of any browser API) because it is the
 * one piece of real logic on the page: everything reaching it came off a URL
 * that a stranger may have edited, truncated in a message, or typed by hand.
 */

/**
 * A Firebase push key — 20 characters of `[A-Za-z0-9_-]`. The length is left
 * loose so a future id format still resolves, but the character set is not:
 * the id is interpolated into a `vintest://` URL the visitor may tap, so it is
 * checked rather than trusted.
 */
const ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

/** Long enough for any real dish; short enough not to shove the buttons off a
 *  phone. Matches the cap the app applies when it writes the link. */
const MAX_NAME = 80;

export type SharedRecipeLink = {
  /** The recipe, or null if the URL didn't carry a usable one. */
  id: string | null;
  /** The dish's name, purely as a label. Never decides what opens. */
  name: string | null;
};

/**
 * Pull the recipe out of a URL.
 *
 * Takes the path and query rather than reading `location` itself, so it is a
 * plain function of its input — the component hands it the current URL.
 */
export function readSharedRecipeLink(href: string): SharedRecipeLink {
  let url: URL;
  try {
    // The base only matters for a relative href, which is what the component
    // passes; an absolute one ignores it.
    url = new URL(href, 'https://mealfind.co.uk');
  } catch {
    return { id: null, name: null };
  }

  const segments = url.pathname.split('/').filter(Boolean);
  // ['r', '<id>'] — anything else is a bare visit to /r/, or a deeper path
  // that was never one of ours.
  const raw = segments[0] === 'r' && segments.length === 2 ? segments[1] : '';

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = '';   // a half-escaped paste — no id at all
  }

  const name = url.searchParams.get('n');
  const trimmed = name ? name.trim().slice(0, MAX_NAME) : '';

  return {
    id: ID_PATTERN.test(decoded) ? decoded : null,
    name: trimmed || null,
  };
}

/**
 * The `vintest://` URL that opens the recipe in an installed app.
 *
 * It points at the app's `PreMade` route rather than its newer `/r` one on
 * purpose: PreMade has existed for the life of the app, so this works on a
 * phone that hasn't updated in months, and both routes open the same screen.
 */
export function appRecipeUrl(id: string, name: string | null): string {
  return (
    `vintest://PreMade?id=${encodeURIComponent(id)}` +
    (name ? `&Recipe=${encodeURIComponent(name)}` : '')
  );
}
