// Avoid loading @sentry/nextjs in dev — it breaks Next.js client chunks (Link, RSC).
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

export function onRouterTransitionStart() {
  if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  void import('./sentry-client-init');
}
