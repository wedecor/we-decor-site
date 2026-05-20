# Local SEO & Schema Architecture Report — We Decor Events

**Date:** 2026-05-20  
**Geo target:** Bengaluru (Bangalore), Karnataka, India  
**Business model:** Service-area business (no storefront required in schema)

---

## Executive summary

Implemented a centralized **enterprise-grade local SEO & JSON-LD architecture** in `lib/local-seo/`. The site now exposes a single canonical **LocalBusiness** entity on the homepage (via `@graph`), links all **Service** pages through `provider: { "@id": ".../#localbusiness" }`, and removes **policy-violating** review/rating markup. Locality pages use geo-scoped **Service** + **FAQPage** + **BreadcrumbList** instead of duplicate LocalBusiness blocks.

---

## Step 1 — Audit findings (before)

| Schema type | Status before | Issues |
|-------------|---------------|--------|
| **LocalBusiness** | Multiple per site | Duplicate on home, locality pages, `LocationServicePage`, `SeoHead` default |
| **Service** | Fragmented | Inconsistent `provider`, wrong phone on birthday page, weak `areaServed` |
| **FAQPage** | Present | Duplicated builders; missing stable `@id` on some pages |
| **BreadcrumbList** | Inline scripts | Inconsistent hierarchy; not always absolute URLs |
| **Review / AggregateRating** | **Policy risk** | Fake `Review` in `SeoHead`; fake `4.8` / `150+` in `LocationServicePage` |
| **Organization / WebSite** | Partial | Not linked via `@graph` on homepage |
| **NAP** | Drift | "We Decor" vs "We Decor Events"; `+91-8880544452` vs `+91 9591232166` as primary; Instagram `wedecorevents` vs `wedecorbangalore` |
| **Geo** | Weak | `addressRegion: 'KA'`; limited locality coverage in `areaServed` |

---

## Step 2 — LocalBusiness (canonical entity)

**Location:** `lib/local-seo/schema.ts` → `buildLocalBusiness()`  
**Emitted on:** Homepage only (`components/home/home-json-ld.tsx` → `buildHomePageGraph()`)

### Properties implemented

| Field | Value / behavior |
|-------|------------------|
| `name` | We Decor Events |
| `alternateName` | We Decor |
| `url` | `https://www.wedecorevents.com` (from `lib/site.ts`) |
| `logo` / `image` | WebP assets via `lib/images.ts` |
| `telephone` | `+919880544452` (from `lib/contact.ts`) |
| `email` | `info@wedecorevents.com` |
| `address` | PostalAddress — Bengaluru, Karnataka, IN |
| `geo` | 12.9716, 77.5946 |
| `openingHoursSpecification` | Mo–Su 09:00–21:00 |
| `areaServed` | City (Bengaluru + Bangalore alias), Karnataka, top 20 localities |
| `sameAs` | Instagram `@wedecorbangalore`, Facebook, optional Google Maps via `NEXT_PUBLIC_GOOGLE_PLACE_ID` |
| `hasOfferCatalog` | 7 core decoration services with linked `@id` |
| `@id` | `https://www.wedecorevents.com/#localbusiness` |

**Design choice:** Locality pages no longer emit a second LocalBusiness; they reference the canonical entity through `provider: { "@id": ".../#localbusiness" }`.

---

## Step 3 — Service schema

### Homepage `@graph`

Seven core services in `lib/local-seo/constants.ts` → `CORE_DECORATION_SERVICES`:

- Wedding decoration  
- Birthday decoration  
- Balloon decoration  
- Proposal decoration  
- Haldi decoration  
- Bridal room decoration  
- Theme decoration  

Each includes `serviceType`, `description`, `url`, `provider` @id, and `areaServed` (Bengaluru + localities).

### Service detail pages

`buildServicePageSchema()` / `buildServicePageSchemaFromCore()` used on:

- `/services/decoration`, `/services/birthday-decoration`  
- `/services/catering`, `/services/photographers`, `/services/videographers`  
- `/services/makeup-artists`, `/services/hair-stylists`, `/services/mehndi-artists`

### Location + location/service pages

- **Locality:** `buildLocalityServiceSchema()` — `app/(site)/_components/LocalBizJsonLd.tsx`  
- **Location × service:** `buildLocationServiceSchema()` — `components/LocationServicePage.tsx`

---

## Step 4 — FAQ schema

- **Builder:** `buildFaqPageSchema()` with stable `@id`: `{pageUrl}#faq`  
- **Homepage:** Location-relevant FAQs in `components/home/home-faq.tsx` (Bengaluru areas, pricing, booking)  
- **Locality pages:** `FAQJsonLd` with `pagePath` — one FAQ block per page, content from `faqsForArea()`  
- **No duplicate FAQ scripts** on the same URL

---

## Step 5 — Review & rating strategy

| Item | Action |
|------|--------|
| Fake `Review` in `SeoHead` | **Removed** — uses `buildSeoHeadDefaultSchema()` |
| Fake `AggregateRating` on location/service template | **Removed** from JSON-LD |
| `/reviews` page | Keeps **Google embed only** — no self-serving star markup |
| Testimonials UI | Marketing copy allowed; **not** mirrored in structured data |

**Google-safe rule:** Only markup reviews/ratings that are **visible on the same page** and sourced from a verifiable third party (e.g. live Google widget). Do not add `aggregateRating` sitewide.

---

## Step 6 — Breadcrumb schema

`buildBreadcrumbSchema()` with absolute URLs via `lib/metadata.ts` → `absoluteUrl()`.

| Page type | Hierarchy |
|-----------|-----------|
| Locality | Home → Locations → {Area} |
| Location × service | Home → Locations → {Area} → {Service} |
| Gallery | Home → Gallery (existing `BreadcrumbsJsonLd`) |

---

## Step 7 — Geo targeting improvements

- **City entity:** Bengaluru with `alternateName: Bangalore`  
- **Region:** Karnataka with `containedInPlace: India`  
- **Localities:** Top 20 areas from `app/(site)/_data/locations.ts` as `Place` nodes  
- **CollectionPage** on `/locations` lists all locality URLs with `about` → LocalBusiness @id  
- **Meta geo tags** retained in legacy `SeoHead` (`IN-KA`, ICBM coordinates)

---

## Step 8 — NAP consistency

| Field | Canonical source | Value |
|-------|------------------|-------|
| Name | `lib/local-seo/constants.ts` → `NAP.name` | We Decor Events |
| Phone | `lib/contact.ts` → `CONTACT.PRIMARY_NUMBER` | +919880544452 |
| Secondary | `CONTACT.SECONDARY_NUMBER` | +919591232166 |
| URL | `lib/site.ts` → `SITE_URL` | https://www.wedecorevents.com |
| Email | `SITE_EMAIL` | info@wedecorevents.com |
| Instagram | `SOCIAL_PROFILES.instagram` | https://www.instagram.com/wedecorbangalore/ |

Display brand **We Decor** remains in UI where appropriate; schema uses legal/marketing name **We Decor Events** with `alternateName`.

---

## Step 9 — Social entity SEO

- **Instagram:** Standardized to `@wedecorbangalore` (matches Footer)  
- **Facebook:** `https://www.facebook.com/wedecorevents`  
- **Google Business Profile:** Optional Maps URL when `NEXT_PUBLIC_GOOGLE_PLACE_ID` is set  
- All included in `sameAs` on Organization + LocalBusiness

---

## Step 10 — Validation checklist

| Check | Status |
|-------|--------|
| `npm run build` | ✅ Passes |
| `npm run seo:assert-jsonld` | ✅ LocalBusiness (home @graph), BreadcrumbList (gallery), FAQPage + Service (locality) |
| No `AggregateRating` / fake `Review` in codebase | ✅ Verified via grep |
| Homepage single `@graph` script | ✅ |
| No duplicate LocalBusiness on locality pages | ✅ |
| Provider `@id` linkage on Service pages | ✅ |
| `/areas/*` → `/locations/*` redirect | ✅ (assert script) |

### Recommended post-deploy checks

1. [Google Rich Results Test](https://search.google.com/test/rich-results) — homepage, one locality, one service  
2. [Schema Markup Validator](https://validator.schema.org/) — paste rendered JSON-LD  
3. Google Search Console → Enhancements (FAQ, Breadcrumbs if eligible)  
4. Align Google Business Profile NAP with `NAP` constants  
5. Set `NEXT_PUBLIC_GOOGLE_PLACE_ID` in production for Maps `sameAs`

---

## Files added

| File | Purpose |
|------|---------|
| `lib/local-seo/constants.ts` | NAP, GEO, social, core services, schema @ids |
| `lib/local-seo/schema.ts` | All JSON-LD builders |
| `lib/local-seo/index.ts` | Public exports |
| `components/seo/SchemaScript.tsx` | Safe JSON-LD renderer |
| `LOCAL_SEO_SCHEMA_REPORT.md` | This report |

## Files modified

| File | Change |
|------|--------|
| `components/home/home-json-ld.tsx` | Homepage `@graph` |
| `components/home/home-faq.tsx` | FAQ schema + Bengaluru copy |
| `app/(site)/_components/LocalBizJsonLd.tsx` | Locality Service (not LocalBusiness) |
| `app/(site)/_components/FAQJsonLd.tsx` | Central FAQ builder + `pagePath` |
| `app/(site)/locations/[slug]/page.tsx` | Breadcrumbs + slug fix for LocalBizJsonLd |
| `app/(site)/locations/page.tsx` | CollectionPage via builder |
| `components/seo/JsonLd.tsx` | Delegates to `lib/local-seo` |
| `components/seo/FaqJsonLd.tsx` | Delegates to `lib/local-seo` |
| `components/SeoHead.tsx` | Removed fake review; default safe LocalBusiness |
| `components/LocationServicePage.tsx` | Removed fake ratings; Service + breadcrumbs |
| `app/services/*/page.tsx` | Provider-linked Service schema (9 pages) |
| `scripts/seo/assert-jsonld.ts` | `@graph` flattening + locality Service check |

---

## Expected ranking / entity benefits

1. **Clearer entity graph** — Google can resolve one LocalBusiness with linked Services.  
2. **Stronger Bangalore signals** — City + 20 locality `Place` nodes in `areaServed`.  
3. **Safer rich results** — FAQ eligibility without review spam penalties.  
4. **Consistent NAP** — Aligns site, schema, and GBP for Maps pack trust.  
5. **Scalable locality SEO** — New areas inherit provider-linked Service + FAQ patterns automatically.

---

## Optional next steps

- Add `buildServicePageSchemaFromCore()` to remaining decoration URLs (`wedding-setup`, `haldi-decoration`, `tent-balloon-setup`) if those routes exist.  
- Sync `BUSINESS_NAME` in `locations.ts` CSV source to "We Decor Events" for on-page NAP parity.  
- Commit on branch `cursor/seo-canonical-robots-and-locality` when ready.
