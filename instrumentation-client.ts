/**
 * App Router client instrumentation.
 * Do not statically import `@sentry/nextjs` here — that would put it back in
 * the shared First Load JS chunk. SDK init is idle-deferred in
 * sentry.client.config.ts; this only forwards SPA navigations once loaded.
 */

export function onRouterTransitionStart(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  void import('@sentry/nextjs').then((Sentry) => {
    const capture = (
      Sentry as {
        captureRouterTransitionStart?: (...a: unknown[]) => void;
      }
    ).captureRouterTransitionStart;
    capture?.(...args);
  });
}
