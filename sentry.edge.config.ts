// Edge Sentry — production only
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { scrubSentryEvent } from '@/lib/security/sentry-scrub';

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (process.env.NODE_ENV === 'production' && dsn) {
  Sentry.init({
    dsn,
    sendDefaultPii: false,
    tracesSampleRate: 0.1,
    debug: false,
    beforeSend(event) {
      return scrubSentryEvent(event);
    },
  });
}
