/**
 * Hands the pre-filled WhatsApp link from the contact form to /thank-you.
 *
 * The form used to call `window.open(whatsappUrl)` after `await fetch(...)`.
 * By then the click's user-activation has expired, so mobile Safari and most
 * popup blockers dropped it silently. Instead the URL is stashed here and the
 * thank-you page renders it as an ordinary link the visitor taps — a real
 * gesture, never blocked.
 *
 * sessionStorage can be unavailable (private mode, blocked storage); both
 * helpers swallow that and the page falls back to the plain WhatsApp link.
 */
const KEY = 'wedecor:lead-whatsapp-url';

export function stashLeadWhatsAppUrl(url: string): void {
  try {
    window.sessionStorage.setItem(KEY, url);
  } catch {
    /* storage unavailable — thank-you page uses the generic link */
  }
}

export function readLeadWhatsAppUrl(): string | null {
  try {
    const url = window.sessionStorage.getItem(KEY);
    // Only ever hand a wa.me link to an href.
    return url && url.startsWith('https://wa.me/') ? url : null;
  } catch {
    return null;
  }
}
