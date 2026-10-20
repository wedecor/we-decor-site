import * as Sentry from '@sentry/nextjs';
import { scrubSentryEvent } from '@/lib/security/sentry-scrub';

const isProd = process.env.NODE_ENV === 'production';
const dsn = process.env.SENTRY_DSN;

if (isProd && dsn) {
  Sentry.init({
    dsn,
    sendDefaultPii: false,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      return scrubSentryEvent(event);
    },
  });
}
