/**
 * Writes the two files that let iOS and Android open a mealfind.co.uk link in
 * the app instead of the browser:
 *
 *   public/.well-known/apple-app-site-association   (iOS universal links)
 *   public/.well-known/assetlinks.json              (Android app links)
 *
 *   node scripts/generate-app-links.mjs
 *
 * Runs automatically via the `prebuild` npm script, so `npm run build` always
 * ships them in step with the credentials below.
 *
 * ── WHY GENERATED, AND NOT JUST COMMITTED ───────────────────────────────────
 * Because an association file is the one static file on this site that is
 * worse wrong than absent.
 *
 * iOS does not fetch `apple-app-site-association` from this domain. It fetches
 * it from Apple's CDN, which caches it, and the app then only re-checks on
 * install or update. Publish one naming the wrong team and universal links are
 * broken for every visitor for as long as that copy is cached — and the fix
 * still won't reach a phone that already has the app. Android's is checked at
 * install time and cached the same way.
 *
 * So this script refuses to emit a file it can't fill in truthfully. While the
 * credentials below are placeholders, nothing is written (and any previously
 * generated file is removed): links then open the website, which is a working
 * page that offers to hand off to the app, rather than a broken association.
 *
 * ⚠️ The paths are fixed by the platforms — `/.well-known/<name>`, served as
 * `application/json`, over https, with no redirect. `firebase.json` sets the
 * content type for the extensionless Apple file and keeps `.well-known` out of
 * the hosting ignore list. Don't rename either file.
 */

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const WELL_KNOWN = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', '.well-known');

/* ---------------------------------------------------------------------------
   The app's identity. These are not secrets — both files are public by design,
   and anyone can read them off any app that ships them.
--------------------------------------------------------------------------- */

/** Matches `ios.bundleIdentifier` / `android.package` in the app's app.json. */
const BUNDLE_ID = 'com.vin.mealfind';

/**
 * The Apple Developer Team ID that signs the app: ten characters, e.g.
 * `A1B2C3D4E5`.
 *
 * Where to find it: developer.apple.com → Membership details → Team ID. Or run
 * `eas credentials` in the app repo and read it off the iOS build credentials.
 * It is the prefix of the App ID, so `<TEAM>.com.vin.mealfind` is what iOS
 * matches against the entitlement in the build.
 */
const APPLE_TEAM_ID = 'REPLACE_WITH_APPLE_TEAM_ID';

/**
 * SHA-256 fingerprints of the certificates the Android app is signed with,
 * upper-case hex, colon-separated.
 *
 * Where to find them: Play Console → your app → Test and release → Setup → App
 * integrity → App signing. List BOTH the "app signing key certificate" and the
 * "upload key certificate" — Play re-signs uploads with the former, so an app
 * verified against the upload key alone fails for everyone who installed from
 * the store. `eas credentials` prints the upload key's fingerprint.
 */
const ANDROID_SHA256 = ['REPLACE_WITH_ANDROID_SHA256_FINGERPRINT'];

const isPlaceholder = (value) => value.startsWith('REPLACE_WITH_');

/* ---------------------------------------------------------------------------
   The files themselves.
--------------------------------------------------------------------------- */

/**
 * `components` rather than the older flat `paths` array: `paths` is deprecated
 * and ignored by iOS 13+, and the two must agree if both are present.
 *
 * Only `/r/*` is claimed. Claiming `/*` would hand the app every page on the
 * domain — the privacy policy, the about page, every link in an email — and
 * open them in a WebView-less app that has no route for them.
 */
const appleAssociation = () => ({
  applinks: {
    details: [
      {
        appIDs: [`${APPLE_TEAM_ID}.${BUNDLE_ID}`],
        components: [
          {
            '/': '/r/*',
            comment: 'Shared recipe links open the recipe in MealFind.',
          },
        ],
      },
    ],
  },
});

const androidAssetLinks = () => [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: BUNDLE_ID,
      sha256_cert_fingerprints: ANDROID_SHA256,
    },
  },
];

/* ------------------------------------------------------------------------- */

const write = (name, contents) => {
  writeFileSync(join(WELL_KNOWN, name), `${JSON.stringify(contents, null, 2)}\n`);
  console.log(`  wrote public/.well-known/${name}`);
};

/** Leaves nothing behind from an earlier run that did have the credentials. */
const drop = (name, why) => {
  rmSync(join(WELL_KNOWN, name), { force: true });
  console.warn(`  skipped public/.well-known/${name} — ${why}`);
};

mkdirSync(WELL_KNOWN, { recursive: true });

if (isPlaceholder(APPLE_TEAM_ID)) {
  drop('apple-app-site-association', 'APPLE_TEAM_ID is still a placeholder');
} else {
  write('apple-app-site-association', appleAssociation());
}

if (ANDROID_SHA256.some(isPlaceholder)) {
  drop('assetlinks.json', 'ANDROID_SHA256 is still a placeholder');
} else {
  write('assetlinks.json', androidAssetLinks());
}
