/**
 * Client Sentry bootstrap — intentionally does NOT import `@sentry/nextjs`
 * at module top level. A static import here is injected into the shared
 * client chunk by the Sentry webpack plugin and costs ~100+ KB before paint.
 *
 * Actual SDK load happens in `sentry-client-init.ts` after the browser is idle.
 */
function scheduleSentryInit() {
  if (process.env.NODE_ENV !== 'production') return;
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  if (typeof window === 'undefined') return;

  const load = () => {
    void import('./sentry-client-init');
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(load, { timeout: 4000 });
  } else {
    window.setTimeout(load, 2500);
  }
}

scheduleSentryInit();
