// Sentry client instrumentation — production only (dev breaks Next.js Link chunks)
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (isProd && dsn) {
  Sentry.init({
    dsn,
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,
  });
}

export const onRouterTransitionStart =
  isProd && dsn ? Sentry.captureRouterTransitionStart : () => {};
