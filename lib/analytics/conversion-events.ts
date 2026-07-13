/**
 * Client-side conversion tracking for lead capture.
 *
 * GA4-bound events are pushed through the GTM dataLayer (see
 * `lib/analytics/dataLayer.ts`) — nothing here talks to Google's servers
 * directly. Meta Pixel (`fbq`) and Google Ads conversions remain as
 * optional, separately-gated integrations that stay inert unless their own
 * env vars are set; neither is implemented/loaded by this project today.
 */

import { trackEvent } from './events';
import { isAnalyticsEnabled } from './config';

export type LeadConversionParams = {
  leadId?: string;
  eventType?: string;
  value?: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_META_PIXEL_ID : '';
const GOOGLE_ADS_CONVERSION_ID =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID : '';
const GOOGLE_ADS_CONVERSION_LABEL =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL : '';

function safeFbq(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  window.fbq?.(...args);
}

export function trackLeadSubmitAttempt(): void {
  trackEvent('generate_lead', { event_category: 'contact', event_label: 'submit_attempt' });
}

export function trackLeadSubmitSuccess(params: LeadConversionParams = {}): void {
  trackEvent('generate_lead', {
    event_category: 'contact',
    event_label: 'submit_success',
    lead_id: params.leadId,
    event_type: params.eventType,
    value: params.value,
  });

  if (META_PIXEL_ID) {
    safeFbq('track', 'Lead', {
      content_name: params.eventType || 'contact',
      value: params.value,
      currency: 'INR',
    });
  }

  if (GOOGLE_ADS_CONVERSION_ID && GOOGLE_ADS_CONVERSION_LABEL) {
    trackEvent('conversion', {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      value: params.value,
      currency: 'INR',
    });
  }
}

export function trackLeadSubmitFailure(reason: string): void {
  trackEvent('form_error', {
    event_category: 'contact',
    event_label: reason,
  });
}

export function isAnalyticsConfigured(): boolean {
  return isAnalyticsEnabled() || Boolean(META_PIXEL_ID || GOOGLE_ADS_CONVERSION_ID);
}
