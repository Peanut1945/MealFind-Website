'use client';

import { useEffect } from 'react';

import { qrDestination } from '@/lib/qrDestination';

/**
 * Sends the visitor on as soon as the page is running in a browser.
 *
 * An effect because the page is prerendered at build time, where there is no
 * `navigator` to ask. `replace`, not `assign`: /qr must not stay in the
 * history, or Back from the store would land here and bounce straight out
 * again.
 */
export function QrRedirect() {
  useEffect(() => {
    window.location.replace(qrDestination(navigator.userAgent, navigator.maxTouchPoints));
  }, []);

  return null;
}
