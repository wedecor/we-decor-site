# COMMIT READINESS REVIEW

**Date:** 2026-07-13
**Working directory:** wedecorwebsite (wedecorevents.com)
**Git remote:** https://github.com/wedecor/we-decor-site.git

---

## Summary

`git status` shows **48 modified files** and **12 untracked files** spanning at least four distinct concerns. Committing everything in one shot is risky — unrelated changes would be difficult to revert individually, and the diff is too large for a clean review.

**Recommendation: split into 3–4 focused commits.**

---

## File Categorization

### A. Analytics Implementation (COMMIT 1)

Core analytics infrastructure — the GTM + GA4 system. This is the blocked deliverable.

**New files (untracked):**

| File | Purpose |
|------|---------|
| `components/analytics/GoogleTagManager.tsx` | GTM script loader (server component) |
| `components/analytics/AnalyticsPageView.tsx` | SPA page view tracking (client component) |
| `components/analytics/TrackedWhatsAppLink.tsx` | WhatsApp click tracking wrapper |
| `components/analytics/TrackedPhoneLink.tsx` | Phone click tracking wrapper |
| `components/analytics/TrackedCtaLink.tsx` | Internal CTA click tracking wrapper |
| `components/analytics/PricingPageView.tsx` | Pricing page visit event |
| `lib/analytics/config.ts` | GTM_ID, GA_MEASUREMENT_ID, isAnalyticsEnabled() |
| `lib/analytics/dataLayer.ts` | pushToDataLayer helper |
| `lib/analytics/events.ts` | All event tracking functions |
| `docs/analytics.md` | Analytics architecture documentation |

**Modified files (analytics-related changes):**

| File | Change |
|------|--------|
| `app/layout.tsx` | Swap old gtag.js for `<GoogleTagManager />` + `<AnalyticsPageView />` |
| `lib/analytics/conversion-events.ts` | Migrate from `safeGtag()` to `trackEvent()` via dataLayer |
| `components/WebVitalsReporter.tsx` | Use `isAnalyticsEnabled()` instead of `GA_ID` |
| `lib/web-vitals-report.ts` | Use `trackEvent()` instead of `event()` from gtag |
| `lib/env.ts` | Replace `GA_ID` with `GTM_ID` + `GA_MEASUREMENT_ID` |
| `env/validation.ts` | Replace `NEXT_PUBLIC_GA_ID` spec with `NEXT_PUBLIC_GTM_ID` + `NEXT_PUBLIC_GA_MEASUREMENT_ID`; minor formatting |
| `env/.env.example` | Update example env vars |
| `env/README.md` | Update env var documentation |
| `next.config.js` | Add `googletagmanager.com` to CSP `frame-src` |
| `lib/gtag.ts` | **DELETED** — replaced by `lib/analytics/config.ts` + `events.ts` |

**Modified files (analytics instrumentation wired into existing components):**

| File | Change |
|------|--------|
| `components/ContactForm.tsx` | Add `trackFormSubmit`, `trackQuoteRequest`; use `TrackedWhatsAppLink` |
| `components/Footer.tsx` | Use `TrackedWhatsAppLink`, `TrackedPhoneLink`, `TrackedCtaLink` |
| `components/Gallery.tsx` | Add `trackPortfolioImageClick` |
| `components/ImageModal.tsx` | Add `trackPortfolioImageClick` |
| `components/LocationGallery.tsx` | Add `trackPortfolioImageClick` |
| `components/Navbar.tsx` | Add `trackEvent('cta_click')` |
| `components/FAQ.tsx` | Use `TrackedWhatsAppLink` |
| `app/contact/page.tsx` | Use `TrackedWhatsAppLink` |
| `app/pricing/page.tsx` | Use `TrackedWhatsAppLink`, add `<PricingPageView />` |
| `components/home/home-hero.tsx` | Use `TrackedWhatsAppLink` |
| `components/home/home-cta.tsx` | Use `TrackedWhatsAppLink` |
| `components/home/home-contact.tsx` | Use `TrackedWhatsAppLink`, `TrackedPhoneLink` |
| `components/services/DecorationServicePage.tsx` | Use `TrackedWhatsAppLink`, `TrackedPhoneLink` |
| `components/services/PartnerServicePage.tsx` | Use `TrackedPhoneLink` |

### B. Unrelated Website Changes (COMMIT 2 or separate commits)

These are feature/content changes that have nothing to do with analytics.

**SEO / Locality content overhaul:**

| File | Change |
|------|--------|
| `app/(site)/_data/locations.generated.ts` | Regenerated locality content (fixed typos like "apartmentss", corrected pricing figures, added landmark references, deduplication) |
| `app/(site)/_data/locations.ts` | Minor data structure changes |
| `app/(site)/_components/LocalBizJsonLd.tsx` | Add optional `landmark` prop to schema |
| `app/(site)/locations/[slug]/page.tsx` | Major rewrite (+192/-95 lines) — layout, meta descriptions, structured data |
| `app/(site)/locations/page.tsx` | Locations index page updates |
| `lib/local-seo/schema.ts` | `buildLocalityServiceSchema` now accepts `landmark` option |
| `scripts/generate-locality-content.ts` | Added Jaccard deduplication, landmark injection, pricing normalization |
| `reports/seo/similarity-summary.json` | Regenerated (0 flagged pairs, was 7) |
| `tests/a11y.spec.ts` | Updated H1 assertion to match new hero text |

**Google Reviews refactor (remove API route, use static fallbacks):**

| File | Change |
|------|--------|
| `app/api/google-reviews/route.ts` | **DELETED** — removed Google Places API proxy |
| `lib/google-reviews-client.ts` | **DELETED** — server-side reviews fetcher |
| `components/home/google-reviews-marquee.tsx` | **DELETED** — live reviews marquee |
| `components/seo/local-business-schema.tsx` | **DELETED** — duplicate LocalBusiness schema |
| `components/Testimonials.tsx` | Stripped live Google Reviews fetching, use static fallback only |
| `components/home/home-testimonials.tsx` | Simplified to static fallback, changed from async server component |
| `app/reviews/page.tsx` | Use `ReviewsList` instead of `Testimonials` |
| `utils/googleReviews.ts` | Added `getGoogleReviewsUrl()` helper |
| `components/GoogleReviewsWidget.tsx` | Fallback URL when placeId missing |

**Homepage content changes:**

| File | Change |
|------|--------|
| `app/page.tsx` | Remove `LocalBusinessSchema`, `GoogleReviewsMarquee`; add `HomeTrustStrip` |
| `components/home/home-hero.tsx` | Changed H1 text and subheadline copy |
| `components/home/home-cta.tsx` | Added pricing teaser link to `/pricing` |
| `components/home/home-faq.tsx` | Added FAQ link to pricing page |
| `lib/contact.ts` | Added `waUrlForHome()` method |

**New untracked files (non-analytics):**

| File | Purpose |
|------|---------|
| `components/ReviewsList.tsx` | Static reviews list (replaces dynamic `Testimonials`) |
| `components/home/home-trust-strip.tsx` | Trust metrics strip for homepage |
| `app/(site)/_data/location-content.ts` | Location content lookup helper |

**Sentry refactor:**

| File | Change |
|------|--------|
| `instrumentation-client.ts` | Lazy-load Sentry via dynamic import instead of top-level init |
| `instrumentation.ts` | Dynamic import for `captureRequestError` |
| `sentry-client-init.ts` | **NEW** — extracted Sentry init (untracked) |

### C. Generated / Lock Files

| File | Change |
|------|--------|
| `package-lock.json` | Removed `ts-node` peer dep entry, minor `fsevents` flag change |

### D. Temporary / Debug Files (DO NOT COMMIT)

| File | Reason to exclude |
|------|-------------------|
| `ROOT_CAUSE_ANALYSIS.md` | Investigation artifact, not application code |
| `WEBSITE_AUDIT.md` | Audit artifact, not application code |
| `weDecor-audit-june2026.txt` | Audit artifact, not application code |

---

## Completeness Check: Analytics Implementation

All files required for GTM + GA4 to work are present:

- [x] `lib/analytics/config.ts` — GTM_ID, GA_MEASUREMENT_ID, isAnalyticsEnabled()
- [x] `lib/analytics/dataLayer.ts` — pushToDataLayer()
- [x] `lib/analytics/events.ts` — all event functions
- [x] `components/analytics/GoogleTagManager.tsx` — GTM script loader
- [x] `components/analytics/AnalyticsPageView.tsx` — SPA page view tracking
- [x] `components/analytics/TrackedWhatsAppLink.tsx` — click tracking wrapper
- [x] `components/analytics/TrackedPhoneLink.tsx` — click tracking wrapper
- [x] `components/analytics/TrackedCtaLink.tsx` — CTA tracking wrapper
- [x] `components/analytics/PricingPageView.tsx` — pricing page event
- [x] `app/layout.tsx` — renders GoogleTagManager + AnalyticsPageView
- [x] `lib/gtag.ts` deleted — old GA_ID references removed
- [x] `next.config.js` — CSP allows `googletagmanager.com` in `frame-src`
- [x] `env/validation.ts`, `lib/env.ts`, `env/.env.example`, `env/README.md` — env var specs updated

**No missing analytics files detected.**

---

## Cross-Dependency Warning

The analytics commit (A) and the website changes commit (B) have **overlapping files**. Specifically:

- `components/home/home-hero.tsx` — Both adds `TrackedWhatsAppLink` (analytics) AND changes hero copy (content). Same for `home-cta.tsx`, `home-contact.tsx`.
- `app/page.tsx` — No analytics changes, but imports from components that analytics touches.
- `app/pricing/page.tsx` — Adds `PricingPageView` (analytics) AND `TrackedWhatsAppLink` (analytics), but the file also has no other unrelated changes, so it's cleanly analytics.

**The overlap in home-hero, home-cta, and home-contact is manageable** — their non-analytics changes (copy edits, `waUrlForHome()`) are small and tightly co-located with the tracking wrappers. Splitting them line-by-line would create fragile partial commits. Recommendation: include these files in the analytics commit since the tracking wrappers are the primary structural change.

---

## Recommended Commit Plan

### Commit 1: Analytics (GTM + GA4)
```
feat(analytics): add GTM + GA4 analytics via dataLayer

- GoogleTagManager server component with dataLayer seed
- AnalyticsPageView client component for SPA route tracking
- Tracked link wrappers (WhatsApp, Phone, CTA) for click events
- PricingPageView component for pricing page visits
- Analytics config with isAnalyticsEnabled() production guard
- Event tracking helpers (page_view, whatsapp_click, phone_click, etc.)
- Updated layout.tsx to render analytics components
- Migrated conversion-events.ts from gtag to trackEvent
- Updated WebVitalsReporter and web-vitals-report to use new analytics
- Deleted lib/gtag.ts (replaced by lib/analytics/*)
- Updated env validation, env config, .env.example for GTM_ID
- Added googletagmanager.com to CSP frame-src
- Added docs/analytics.md
```

**Files:**
```
git add components/analytics/
git add lib/analytics/config.ts lib/analytics/dataLayer.ts lib/analytics/events.ts
git add lib/analytics/conversion-events.ts
git add app/layout.tsx
git add components/WebVitalsReporter.tsx lib/web-vitals-report.ts
git add components/ContactForm.tsx components/Footer.tsx components/Gallery.tsx
git add components/ImageModal.tsx components/LocationGallery.tsx components/Navbar.tsx
git add components/FAQ.tsx
git add app/contact/page.tsx app/pricing/page.tsx
git add components/home/home-hero.tsx components/home/home-cta.tsx
git add components/home/home-contact.tsx
git add components/services/DecorationServicePage.tsx
git add components/services/PartnerServicePage.tsx
git add lib/env.ts env/validation.ts env/.env.example env/README.md
git add next.config.js
git add docs/analytics.md
git rm lib/gtag.ts
```

### Commit 2: Google Reviews refactor
```
refactor: remove live Google Reviews API, use static testimonials

- Delete /api/google-reviews route and lib/google-reviews-client.ts
- Delete GoogleReviewsMarquee component
- Simplify Testimonials to use static fallback data
- Add ReviewsList component for /reviews page
- Add getGoogleReviewsUrl() helper
```

### Commit 3: SEO / Locality content
```
fix(seo): deduplicate locality content, normalize pricing, add landmarks

- Add Jaccard similarity check to content generator
- Fix "apartmentss" typo, normalize all prices to ₹2,999
- Inject third landmark for disambiguation
- Regenerate locations.generated.ts (0 flagged pairs)
- Add location-content.ts lookup helper
- Update locality page layout and meta descriptions
- Pass landmark to LocalBusiness schema
```

### Commit 4: Homepage + Sentry
```
chore: update homepage copy, trust strip, lazy-load Sentry

- New hero H1 and subheadline
- Add HomeTrustStrip component
- Add pricing teaser to CTA section
- Add FAQ link to pricing
- Add waUrlForHome() to lib/contact.ts
- Lazy-load Sentry client init via dynamic import
- Delete duplicate LocalBusinessSchema component
```

### Do NOT commit:
```
ROOT_CAUSE_ANALYSIS.md
WEBSITE_AUDIT.md
weDecor-audit-june2026.txt
COMMIT_READINESS.md
```

---

## Risk Assessment

| Risk | Level | Detail |
|------|-------|--------|
| Analytics commit missing a file | **Low** | All imports traced; no dangling references found |
| Build break from deleted `lib/gtag.ts` | **Low** | All 3 consumers (`layout.tsx`, `WebVitalsReporter`, `web-vitals-report.ts`) are updated to use new analytics imports |
| Unrelated changes accidentally included | **Medium** | 14 non-analytics files are modified. The commit plan above isolates them, but requires discipline during staging |
| `package-lock.json` drift | **Low** | Changes are minor (removed optional peer dep). Can go with any commit or be committed separately |
| CSP blocking GTM | **Low** | `script-src` already allows `googletagmanager.com`; `frame-src` is being added in this diff. `connect-src` allows `https:` wildcard |
| `isAnalyticsEnabled()` returns false in production | **Low** | Guard is `NODE_ENV === 'production' && GTM_ID.length > 0`. Both conditions met: Vercel sets NODE_ENV=production, and NEXT_PUBLIC_GTM_ID=GTM-K46BR4ZT is configured in Vercel env vars |
| Sentry init change breaks error reporting | **Medium** | `instrumentation-client.ts` moves from top-level init to lazy dynamic import. This is functionally correct but should be tested — errors that occur before the first router transition won't be caught. The `sentry-client-init.ts` file must be included |

---

## Pre-Commit Checklist

Before staging:

- [ ] Run `npx tsc --noEmit` to confirm no type errors
- [ ] Run `npm run build` locally to confirm production build succeeds
- [ ] Verify `sentry-client-init.ts` is included (it's untracked and needed by `instrumentation-client.ts`)
- [ ] Verify `app/(site)/_data/location-content.ts` is included (untracked, imported by location pages)
- [ ] Verify `components/ReviewsList.tsx` and `components/home/home-trust-strip.tsx` are included
- [ ] Add `ROOT_CAUSE_ANALYSIS.md`, `WEBSITE_AUDIT.md`, `weDecor-audit-june2026.txt`, `COMMIT_READINESS.md` to `.gitignore` or simply don't stage them
