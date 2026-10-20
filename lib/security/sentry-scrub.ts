/** Shared Sentry beforeSend — strip request bodies, cookies, and auth headers. */

type ScrubableEvent = {
  request?: {
    data?: unknown;
    cookies?: unknown;
    headers?: Record<string, string | undefined>;
  };
};

export function scrubSentryEvent<T extends ScrubableEvent>(event: T): T {
  if (!event.request) return event;
  delete event.request.data;
  delete event.request.cookies;
  if (event.request.headers) {
    delete event.request.headers.Authorization;
    delete event.request.headers.authorization;
    delete event.request.headers.Cookie;
    delete event.request.headers.cookie;
  }
  return event;
}
