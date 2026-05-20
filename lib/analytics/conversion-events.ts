/**
 * Client-side conversion tracking for lead capture.
 * Supports GA4 (gtag), Meta Pixel (fbq), and Google Ads conversions when configured.
 */

export type LeadConversionParams = {
  leadId?: string;
  eventType?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const GA_ID = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GA_ID : '';
const META_PIXEL_ID = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_META_PIXEL_ID : '';
const GOOGLE_ADS_CONVERSION_ID =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID : '';
const GOOGLE_ADS_CONVERSION_LABEL =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL : '';

function safeGtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  window.gtag?.(...args);
}

function safeFbq(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  window.fbq?.(...args);
}

export function trackLeadSubmitAttempt(): void {
  safeGtag('event', 'generate_lead', { event_category: 'contact', event_label: 'submit_attempt' });
}

export function trackLeadSubmitSuccess(params: LeadConversionParams = {}): void {
  safeGtag('event', 'generate_lead', {
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
    safeGtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      value: params.value,
      currency: 'INR',
    });
  }
}

export function trackLeadSubmitFailure(reason: string): void {
  safeGtag('event', 'form_error', {
    event_category: 'contact',
    event_label: reason,
  });
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(GA_ID || META_PIXEL_ID || GOOGLE_ADS_CONVERSION_ID);
}
