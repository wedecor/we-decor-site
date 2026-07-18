# We Decor – Improvement Analysis

A deeper analysis of the site with prioritized, actionable suggestions.

## Implemented (Jan 2026)

- **Hero**: "Perfect 5★ on Google" trust line; scroll cue (chevron + "Scroll") linking to `#our-services`; hero height 90vh on desktop; primary CTA "Get Free Quote"; CTA icons both →.
- **Our Services**: Section `id="our-services"` and `scroll-mt-20` for scroll target; "Learn more →" on each service card; mid-page CTA "Get Free Quote".
- **Single services list**: `lib/services.ts` exports `HOMEPAGE_SERVICES`; used by `HomePageClient` and by `app/page.tsx` (structured data uses `CONTACT` for phone).
- **Navbar**: Mobile menu closes on Escape; button shows X when open and hamburger when closed; sr-only "Close menu" / "Open menu"; `aria-expanded` and `id="mobile-menu"`; each nav link closes menu on click; body scroll locked when menu open.
- **Contact**: Map iframe uses `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` when set, else placeholder.
- **Footer**: Reviews, Areas, Locations added to Quick Links (done earlier).
- **Skip link** and **CONTACT** usage on homepage (done earlier).

---

## 1. Hero & First Screen

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **Scroll cue** | None | Add a subtle “Scroll” or chevron at bottom of hero so users know there’s more content. | Medium |
| **Primary CTA** | “Get a Quote” | Consider “Get Free Quote” or “Request Quote” to match pricing page and reduce friction. | Low |
| **Trust line** | Only tagline | Add one short trust line under tagline (e.g. “500+ events • 4.9★ on Google”) if accurate. | Medium |
| **Hero height** | `min-h-screen` on desktop | Optional: cap at ~90vh so a sliver of “Our Services” is visible, encouraging scroll. | Low |

---

## 2. Navigation & Footer

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **Footer links** | Missing Reviews, Areas, Locations | Add “Reviews”, “Areas”, “Locations” to footer Quick Links so they match navbar and SEO. | High |
| **Navbar FAQ/Contact** | Use `brand-light` / `brand` (may be undefined) | Use same token as other links (e.g. `text-[#0f3d3e] dark:text-[#faf7f2]`) so style is consistent. | High |
| **Mobile menu** | Dropdown is `absolute top-16` | Ensure it doesn’t overlap hero; consider `top-full` and testing on small viewports. | Medium |
| **Skip link** | No “Skip to main content” | Add a skip link for keyboard/screen-reader users (accessibility). | Medium |

---

## 3. Contact & Consistency

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **Homepage contact block** | WhatsApp link hardcoded `wa.me/919880544452` | Use `CONTACT.waUrl()` from `@/lib/contact` so number changes in one place. | High |
| **Homepage phone display** | “+91 88805 44452” and “+91 95912 32166” | Source from `CONTACT.telLinks()` or `CONTACT.displayNumbers` to avoid drift. | High |
| **Contact page map** | Generic Bangalore placeholder embed | Replace with real business location embed when you have the correct Maps URL. | Medium |

---

## 4. Content & Copy

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **Service image filename** | `tent and baloon.jpg` | Fix typo: rename file to `tent-and-balloon.jpg` and update references (or keep and document). | Low |
| **Duplicate service list** | `services` array in both `app/page.tsx` and `HomePageClient.tsx` | Keep a single source (e.g. shared constant or HomePageClient only) to avoid future mismatch. | Medium |
| **Reviews page** | Exists but no link in footer | Add “Reviews” to footer (and optionally a small “See reviews” link near testimonials on homepage). | High |

---

## 5. SEO & Technical

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **metadataBase** | Set in layout only when `NEXT_PUBLIC_SITE_URL` exists | Ensure env is set in production so OG/Twitter URLs are absolute. | High |
| **Banner image** | Served as `/banner.jpg` | Consider descriptive name (e.g. `hero-event-decor.jpg`) and add to `images` in layout/OG if you use it for social. | Low |
| **Structured data** | LocalBusiness on homepage | Confirm telephone in JSON-LD matches `CONTACT` (e.g. +91-8880544452 vs +91 88805 44452). | Medium |

---

## 6. UX & Conversion

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **Two “Get a Quote” blocks** | Hero + mid-page CTA | Fine; ensure both go to `/contact`. Optionally make mid-page CTA “View Pricing” or “Get Quote” to vary intent. | Low |
| **Testimonials** | Carousel with “View all on Google” | Keep; consider adding a short “Trusted by 500+ customers” (or real number) near section title. | Low |
| **Service cards** | Hover scale + shadow | Good. Optional: add “Learn more →” or “View details” on each card for clarity. | Low |

---

## 7. Accessibility

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **Skip link** | Missing | Add “Skip to main content” as first focusable element; link to `#main` or main landmark. | Medium |
| **Mobile menu** | Button has `sr-only` “Open menu” | When open, change to “Close menu” and ensure menu is focus-trapped and closable with Escape. | Medium |
| **Hero text** | Relies on overlay + shadow | Already improved; ensure contrast ratio of white text on overlay meets WCAG AA (4.5:1). | Low |

---

## 8. Performance & Assets

| Area | Current | Suggestion | Priority |
|------|---------|------------|----------|
| **Banner** | Single large JPG | Consider WebP/AVIF and responsive `sizes`; Next/Image already optimizes. | Low |
| **Service images** | Multiple JPGs | Already using Next/Image with `sizes`; ensure `priority` only on first few. | Done |
| **Fonts** | Playfair + Inter loaded | Check font-display and preload for LCP (hero text). | Low |

---

## Quick wins (high impact, low effort)

1. **Footer**: Add “Reviews”, “Areas”, “Locations”; fix FAQ/Contact nav classes to use same tokens as other links.
2. **Homepage contact**: Use `CONTACT.waUrl()` and `CONTACT.telLinks()` (or display numbers) instead of hardcoded links/numbers.
3. **Layout**: Add a “Skip to main content” link and ensure `<main>` has `id="main"` (or the target you use).
4. **Navbar**: Replace `brand-light` / `brand` with explicit colors for FAQ and Contact so they don’t rely on possibly undefined Tailwind config.

---

## Summary by priority

- **High**: Footer links (Reviews, Areas, Locations), single source for contact (CONTACT lib), navbar FAQ/Contact styles.
- **Medium**: Skip link, mobile menu behavior, contact map, single services list, JSON-LD vs CONTACT.
- **Low**: Scroll cue, trust line, hero height, service image filename, banner filename/OG, small CTA/copy tweaks.

If you tell me which area you want to tackle first (e.g. “footer and contact”), I can suggest exact code changes file by file.
