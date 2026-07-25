'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * SSR has no media queries, so assume motion is allowed. The client's first
 * render uses the same answer, which keeps hydration consistent; the real value
 * arrives immediately after without a wasted render pass.
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns `true` when the user has asked their OS to reduce motion.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect`: the
 * media query is an external store, and this is the API designed for reading
 * one. It also avoids the cascading render that a `setState` inside an effect
 * would cause on every mount.
 *
 * Every animated component in this site branches on this. When it's `true` the
 * component renders its final resting state directly instead of animating to
 * it, so content is never left invisible or mid-transform.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
