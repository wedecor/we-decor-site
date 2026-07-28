import { pushToDataLayer } from './dataLayer';

/**
 * Reusable analytics API for We Decor.
 *
 * Every function pushes a structured event onto the GTM `dataLayer`. GTM
 * (configured in the GTM web console — see docs/analytics.md) turns these
 * events into GA4 tags/triggers; nothing in this file talks to Google's
 * servers directly.
 *
 * All functions are safe to call unconditionally from anywhere (server or
 * client) — they no-op automatically when analytics is disabled (local
 * development, or GTM not configured via `NEXT_PUBLIC_GTM_ID`).
 *
 * Naming convention: dataLayer events use `snake_case` names mirroring GA4
 * conventions (e.g. `whatsapp_click`, `quote_request`). See docs/analytics.md
 * for the full list and guidance on adding new events.
 */

type EventParams = Record<string, unknown>;

/** Generic low-level event push — prefer a named helper below when one exists. */
export function trackEvent(eventName: string, params: EventParams = {}): void {
  pushToDataLayer({ event: eventName, ...params });
}

/** A WhatsApp CTA was clicked. `source` identifies which CTA, e.g. "home_hero", "footer". */
export function trackWhatsAppClick(source: string, params: EventParams = {}): void {
  trackEvent('whatsapp_click', { cta_source: source, ...params });
}

/** A `tel:` phone CTA was clicked. `source` identifies which CTA. */
export function trackPhoneClick(source: string, params: EventParams = {}): void {
  trackEvent('phone_click', { cta_source: source, ...params });
}

/** A form was submitted. `status` differentiates attempt/success/error outcomes. */
export function trackFormSubmit(
  formName: string,
  status: 'attempt' | 'success' | 'error' = 'success',
  params: EventParams = {}
): void {
  trackEvent('form_submit', { form_name: formName, form_status: status, ...params });
}

/**
 * A user requested a quote — the primary business conversion for We Decor.
 * Fired alongside `trackWhatsAppClick` (every WhatsApp CTA here represents a
 * quote request) and on successful contact-form submission.
 */
export function trackQuoteRequest(source: string, params: EventParams = {}): void {
  trackEvent('quote_request', { cta_source: source, ...params });
}

/** A portfolio/gallery image or collection was opened/viewed. */
export function trackPortfolioImageClick(
  category: string,
  index: number,
  params: EventParams = {}
): void {
  trackEvent('portfolio_image_click', {
    gallery_category: category,
    image_index: index,
    ...params,
  });
}

/** The pricing page was viewed. Call once on mount from a client component. */
export function trackPricingVisit(params: EventParams = {}): void {
  trackEvent('pricing_visit', params);
}

/** A virtual pageview for client-side (SPA) route changes. */
export function trackPageView(path: string, params: EventParams = {}): void {
  trackEvent('page_view', {
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
    ...params,
  });
}
