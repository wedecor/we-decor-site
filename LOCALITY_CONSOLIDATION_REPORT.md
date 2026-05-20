# Locality URL Consolidation Report

**Date:** 2026-05-20  
**Objective:** Make `/locations/{slug}` the only canonical locality structure; permanently redirect `/areas/{slug}`; remove duplicate sitemap URLs; align internal links and metadata.

---

## Executive summary

Duplicate locality URLs (`/areas/*` and `/locations/*` for the same 32 Bangalore slugs) caused duplicate content, crawl waste, and canonical ambiguity. This change consolidates equity on **`/locations/{slug}`** using **301/308 permanent redirects** at the edge (`next.config.js`), removes `/areas/*` from the sitemap, updates internal navigation and legacy page metadata to point at `/locations/*`, and refreshes SEO guard scripts and tests.

**Canonical pattern (production):** `https://www.wedecorevents.com/locations/{slug}`

---

## Redirects added

Configured in `next.config.js` (evaluated before page render; query strings preserved by Next.js):

| Source | Destination | Type |
|--------|-------------|------|
| `/areas` | `/locations` | `permanent: true` (308) |
| `/areas/:slug` | `/locations/:slug` | `permanent: true` (308) |

**SEO properties:**
- Single hop (no chains): `/areas/koramangala` → `/locations/koramangala`
- Not temporary (no 302)
- Slug preserved 1:1 from shared `AREAS` data
- UTM and query params preserved on redirect

Legacy route files under `app/areas/` remain for build compatibility; traffic is redirected before indexable HTML is served.

---

## Sitemap changes

**File:** `app/sitemap.ts`

| Before | After |
|--------|-------|
| `/areas` hub + 32× `/areas/{slug}` | **Removed** |
| `/locations` hub + 32× `/locations/{slug}` | **Retained (canonical)** |

**Approximate URL count:** ~72 locality-related entries → **39** (7 static + `/locations` hub + 32 locality slugs).

Static entries retained: `/`, `/services`, `/gallery`, `/pricing`, `/faq`, `/contact`, `/locations`.

---

## Canonical changes

| Page | Before | After |
|------|--------|-------|
| `app/(site)/locations/[slug]/page.tsx` | `${SITE}/locations/{slug}` | Unchanged (already canonical) |
| `app/(site)/locations/page.tsx` | `${SITE}/locations` | Unchanged |
| `app/areas/page.tsx` | `/areas` | `/locations` |
| `app/areas/[slug]/page.tsx` | `${base}/areas/{slug}` | `${base}/locations/{slug}` |
| Open Graph / JSON-LD on areas pages | `/areas/...` | `/locations/...` (fallback if route ever rendered) |

---

## Internal links replaced

| File | Change |
|------|--------|
| `components/Navbar.tsx` | Removed duplicate “Areas” nav; single “Locations” → `/locations` |
| `components/areas/Breadcrumbs.tsx` | Hub link `/areas` → `/locations`; label “Areas” → “Locations” |
| `components/areas/NearbyChips.tsx` | Chip hrefs `/areas/{slug}` → `/locations/{slug}` |
| `app/areas/page.tsx` | Grid links and breadcrumb JSON-LD → `/locations` |
| `app/(site)/locations/page.tsx` | Already used `/locations/{slug}` (no change) |

**App/TSX surface:** No remaining user-facing `href="/areas"` in `app/` or `components/` (except legacy `app/areas/*` route modules, which redirect).

---

## Robots

**File:** `public/robots.txt`

- `Allow: /areas/` → `Allow: /locations/`
- `/areas/*` is not listed as indexable; redirects handle legacy URLs

**File:** `app/robots.ts` — unchanged (`allow: /`); sitemap host remains centralized.

---

## Files modified

### Production / SEO core
- `next.config.js` — 301/308 redirects
- `app/sitemap.ts` — removed `/areas` URLs
- `app/areas/page.tsx` — canonicals, links, JSON-LD
- `app/areas/[slug]/page.tsx` — canonicals, OG, breadcrumbs, FAQ JSON-LD URL
- `components/Navbar.tsx`
- `components/areas/Breadcrumbs.tsx`
- `components/areas/NearbyChips.tsx`
- `public/robots.txt`

### CI / SEO scripts
- `scripts/seo/assert-sitemap.ts`
- `scripts/seo/assert-breadcrumbs.ts`
- `scripts/seo/assert-jsonld.ts`
- `scripts/seo/check-area-urls.ts`
- `scripts/seo/jsonld-validate.ts`
- `scripts/validate-sitemap-urls.ts`
- `scripts/validate-jsonld.ts`
- `scripts/lh.mjs`
- `scripts/verify-localities.cjs`

### Tests
- `tests/feature.smoke.spec.ts`
- `tests/a11y.spec.ts`
- `tests/e2e.spec.ts`
- `tests/areas.spec.ts` — redirect + canonical assertions

### Not modified (generator / docs only)
- `scripts/generate-areas*.ts`, `scripts/patch-areas.ts`, etc. still emit `/areas` in templates for historical generators; run `locations:sync` / location generators for new content, not area generators, to avoid reintroducing `/areas` URLs.

---

## Validation

| Check | Result |
|-------|--------|
| `npm run build` | **Pass** (85 static routes; `/areas/*` still built but redirected at request time) |
| Sitemap duplicate `/areas/*` | **Removed** |
| Internal `/areas/` links in app UI | **Replaced** with `/locations/` |
| Canonical on `/locations/{slug}` | **Present** |
| Redirect chain | **None** (single permanent redirect) |

**Recommended post-deploy checks:**
```bash
npm run start
npm run seo:assert-sitemap
npm run seo:assert-breadcrumbs
npm run seo:assert-jsonld
npm run seo:areas
```

**Search Console:** Submit updated sitemap; use URL Inspection on a sample `/areas/{slug}` to confirm “Page with redirect” → canonical `/locations/{slug}`.

---

## SEO impact summary

| Risk (before) | Mitigation (after) |
|---------------|-------------------|
| Duplicate content (32×2 URLs) | One indexable URL per locality |
| Keyword cannibalization | Single template (`/locations/*`) with richer content |
| Doorway / thin duplicate (`/areas/*`) | `/areas/*` no longer in sitemap; 301 to primary |
| Crawl budget waste | ~32 fewer sitemap URLs; redirects consolidate signals |
| Canonical conflict | Aligns HTML canonical, sitemap, and internal links on `/locations/*` |

**Equity preservation:** Permanent redirects pass ranking signals to `/locations/{slug}` per [Google redirect documentation](https://developers.google.com/search/docs/crawling-indexing/301-redirects). Page content on `/locations/*` is unchanged (hero, gallery, FAQs, LocalBusiness + FAQ JSON-LD).

**Timeline:** Full re-crawl and de-duplication in the index typically take days to weeks; monitor GSC Coverage and “Duplicate without user-selected canonical” reports.

---

## Post-launch checklist

- [ ] Deploy to production
- [ ] Confirm `curl -I https://www.wedecorevents.com/areas/koramangala` returns `308` (or `301`) with `Location: .../locations/koramangala`
- [ ] Resubmit `sitemap.xml` in Google Search Console
- [ ] Request indexing for `/locations` hub and top 5 localities
- [ ] Watch for residual external backlinks to `/areas/*` (redirects handle them)
- [ ] Update any off-site listings / GBP links to `/locations/{slug}` where editable

---

*Generated as part of locality URL consolidation — We Decor site.*
