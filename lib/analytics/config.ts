/**
 * Analytics configuration — reads environment variables and determines
 * whether tracking should be active anywhere in the app.
 *
 * Analytics is intentionally disabled outside of production builds. `next
 * dev` always sets `NODE_ENV=development`, so this stays `false` for the
 * entire local development experience regardless of what is in `.env.local`.
 */

/** GTM container ID, e.g. `GTM-XXXXXXX`. Never hardcode this — set via env. */
export const GTM_ID: string = (process.env.NEXT_PUBLIC_GTM_ID ?? '').trim();

/**
 * GA4 measurement ID, e.g. `G-XXXXXXXXXX`. Not used to load any script
 * directly — GA4 is configured *inside* GTM. This is seeded onto the
 * dataLayer so the GTM container can read it as a variable instead of
 * having the ID hardcoded in the GTM web console. See docs/analytics.md.
 */
export const GA_MEASUREMENT_ID: string = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim();

/** True only for production builds with a GTM container configured. */
export function isAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === 'production' && GTM_ID.length > 0;
}
