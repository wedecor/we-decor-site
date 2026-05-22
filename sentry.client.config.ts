// Sentry client — production only (dev init breaks Next.js Link / RSC chunks)
import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (isProd && dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
  });
}
