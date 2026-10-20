/**
 * Dynamically imported only — never statically from layout/config.
 * Loaded after requestIdleCallback from sentry.client.config.ts.
 */
import * as Sentry from '@sentry/nextjs';
import { scrubSentryEvent } from '@/lib/security/sentry-scrub';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (process.env.NODE_ENV === 'production' && dsn) {
  // No Session Replay — Replay adds a large worker to the client bundle.
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
