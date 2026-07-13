import { isAnalyticsEnabled } from './config';

export type DataLayerEvent = Record<string, unknown> & { event?: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * Safely pushes an event onto the GTM `dataLayer`.
 *
 * No-ops when running server-side, outside production, or when GTM isn't
 * configured — every helper in `lib/analytics/events.ts` builds on this, so
 * the whole public tracking API is safe to call unconditionally from any
 * component without feature-detecting analytics first.
 */
export function pushToDataLayer(payload: DataLayerEvent): void {
  if (typeof window === 'undefined') return;
  if (!isAnalyticsEnabled()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}
