import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';
const dsn = process.env.SENTRY_DSN;

if (isProd && dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
  });
}
