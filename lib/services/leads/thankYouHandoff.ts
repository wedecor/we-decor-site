/**
 * Hands the pre-filled WhatsApp link from the contact form to /thank-you.
 *
 * The form used to call `window.open(whatsappUrl)` after `await fetch(...)`.
 * By then the click's user-activation has expired, so mobile Safari and most
 * popup blockers dropped it silently. Instead the URL is stashed here and the
 * thank-you page renders it as an ordinary link the visitor taps — a real
 * gesture, never blocked.
 *
 * The link is consumed once (read and removed) by the thank-you page.
 * sessionStorage can be unavailable (private mode, blocked storage); the
 * helpers swallow that and the page falls back to the plain WhatsApp link.
 */
const KEY = 'wedecor:lead-whatsapp-url';

export function stashLeadWhatsAppUrl(url: string): void {
  // A fresh enquiry replaces anything consumed earlier in this page load.
  consumedThisLoad = null;
  try {
    window.sessionStorage.setItem(KEY, url);
  } catch {
    /* storage unavailable — thank-you page uses the generic link */
  }
}

/**
 * The handed-off URL, held just long enough for the current render. Consuming
 * clears sessionStorage, but React Strict Mode runs the thank-you effect twice
 * in dev — without this the second run would find the key gone and show the
 * generic link. Both runs happen in the same task, so the copy is released on
 * the next macrotask: Next keeps modules alive across client-side navigation,
 * and a later /thank-you visit in the same tab must not see the old enquiry.
 */
let consumedThisLoad: string | null = null;

const isWhatsAppUrl = (url: string | null): url is string =>
  Boolean(url && url.startsWith('https://wa.me/'));

/**
 * Read the handed-off link once and delete it, so a later visit to
 * /thank-you in the same tab does not resurface a previous enquiry.
 * Only ever returns a wa.me link.
 */
export function consumeLeadWhatsAppUrl(): string | null {
  if (consumedThisLoad) return consumedThisLoad;
  let url: string | null = null;
  try {
    const storage = window.sessionStorage;
    url = storage.getItem(KEY);
    storage.removeItem(KEY);
  } catch {
    return null;
  }
  if (!isWhatsAppUrl(url)) return null;
  consumedThisLoad = url;
  setTimeout(resetLeadWhatsAppHandoff, 0);
  return url;
}

/** Forget the in-memory copy (a new enquiry was stashed, or for tests). */
export function resetLeadWhatsAppHandoff(): void {
  consumedThisLoad = null;
}
