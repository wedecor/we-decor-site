# SEO & Indexing Audit Report — We Decor (`wedecorevents.com`)

**Audit date:** 2026-05-20  
**Scope:** Full repository + build output + Lighthouse artifact (`lighthouse-report-live.json`, mobile, homepage, 2025-08-01)  
**Mode:** Audit only — no code changes applied

---

## Executive summary

| Metric | Score | Interpretation |
|--------|------:|----------------|
| **Overall SEO score** | **58 / 100** | Strong local-intent foundation undermined by duplicate locality URLs and configuration drift |
| **Indexing risk score** | **74 / 100** | Higher = more risk. Duplicate `/areas/*` vs `/locations/*`, robots/sitemap conflicts, and sitemap gaps increase crawl waste and canonical ambiguity |
| **Local SEO score** | **66 / 100** | Good Bangalore/geo coverage on `/locations/*`; NAP and schema inconsistencies hurt trust |
| **Core Web Vitals risk score** | **78 / 100** | Higher = worse risk. Measured mobile LCP ~5.5s on homepage; heavy client JS (Framer Motion, Swiper) |

**Verdict:** The site is **indexable and locally relevant**, but **not Google-safe at scale** until duplicate locality routes are consolidated, robots/sitemap are unified, homepage canonical is fixed, and CWV on money pages improve. Paid landing traffic to `/contact` is viable once conversion API works; **ads to thin `/areas/*` pages carry doorway/quality risk**.

---

## Site inventory (verified from build)

| Route type | Count | Notes |
|------------|------:|-------|
| Static/marketing pages | ~13 | `/`, `/about`, `/contact`, `/gallery`, `/pricing`, `/faq`, `/reviews`, `/services`, etc. |
| Service detail pages | 8 | Under `app/services/*/page.tsx` |
| `/areas/[slug]` | 32 | SSG, `generateStaticParams` from `AREAS` |
| `/locations/[slug]` | 32 | SSG, same `AREAS` source |
| API / utility | 3+ | `/api/contact`, `/api/csp-report`, `/image-sitemap` |

**Total indexable marketing URLs (approx.):** ~85 routes in production build.

---

## Critical issues

### C1 — Duplicate locality indexation (`/areas/*` vs `/locations/*`)

| Field | Detail |
|-------|--------|
| **Severity** | CRITICAL |
| **Impact** | Keyword cannibalization, diluted link equity, doorway-page quality risk, manual actions in worst case |
| **Evidence** | 32 slugs × 2 URL patterns from `app/(site)/_data/locations.ts`; both in `app/sitemap.ts` lines 20–32 |
| **Affected files** | `app/sitemap.ts`, `app/areas/[slug]/page.tsx`, `app/(site)/locations/[slug]/page.tsx`, `components/Navbar.tsx` (links to both hubs) |
| **Fix** | Pick **one** canonical locality pattern (recommend `/locations/{slug}` as primary — richer content). 301 redirect `/areas/{slug}` → `/locations/{slug}` OR `rel=canonical` from areas → locations. Remove duplicate URLs from sitemap. Add prominent cross-links only after consolidation. |

`/locations/[slug]` includes FAQs, landmarks, gallery, service blurbs (`faqsForArea`, `serviceDescriptions`).  
`/areas/[slug]` is a thinner template; most areas lack `uniqueFAQ` (only Koramangala has custom FAQ in data).

---

### C2 — Homepage missing `rel=canonical`

| Field | Detail |
|-------|--------|
| **Severity** | CRITICAL |
| **Impact** | Ambiguous preferred URL for brand homepage; Playwright smoke explicitly fails (`tests/feature.smoke.spec.ts` line 158–159) |
| **Evidence** | `app/page.tsx` is `'use client'` with **no** `metadata` export; `app/layout.tsx` sets title/description but **no** `alternates.canonical` |
| **Affected files** | `app/layout.tsx`, `app/page.tsx` |
| **Fix** | Add `alternates: { canonical: '/' }` to root metadata OR split homepage into server wrapper with `generateMetadata`. Ensure absolute canonical via `metadataBase`. |

---

### C3 — Conflicting robots + sitemap signals

| Field | Detail |
|-------|--------|
| **Severity** | CRITICAL |
| **Impact** | Crawlers receive contradictory sitemap URLs; `/api/` disallow may conflict with redirect strategy |
| **Evidence** | `app/robots.ts` → sitemap `https://www.wedecorevents.com/sitemap.xml` |
| | `public/robots.txt` → `Sitemap: https://www.wedecorevents.com/api/sitemap.xml` and `Disallow: /api/` |
| | `next.config.js` redirects `/api/sitemap.xml` → `/sitemap.xml` (lines 74–77) |
| **Affected files** | `app/robots.ts`, `public/robots.txt`, `next.config.js` |
| **Fix** | **Single source:** keep `app/robots.ts` only; delete or replace `public/robots.txt` with a static note pointing to dynamic route OR remove static file entirely. Align sitemap URL to `/sitemap.xml` everywhere. |

---

### C4 — Sitemap incomplete (orphan indexable URLs)

| Field | Detail |
|-------|--------|
| **Severity** | HIGH (listed as critical for crawl efficiency) |
| **Impact** | Discoverability delay for money pages; inconsistent indexing |
| **Evidence** | `app/sitemap.ts` includes 8 static + 64 locality URLs but **omits:** |
| | • `/about`, `/reviews` |
| | • All service detail routes except hub `/services` |
| **Missing examples** | `/services/decoration`, `/services/catering`, `/services/birthday-decoration`, … (9 files under `app/services/`) |
| **Affected files** | `app/sitemap.ts` |
| **Fix** | Generate sitemap from route manifest or extend static list; set `lastModified` from git/content dates, not `new Date()` on every build for all URLs. |

---

### C5 — Broken internal links from homepage (404 risk)

| Field | Detail |
|-------|--------|
| **Severity** | HIGH |
| **Impact** | Crawl errors, poor UX, wasted ad spend on broken paths |
| **Evidence** | `app/page.tsx` links to `/services/haldi-decoration`, `/services/engagement-decoration`, `/services/corporate-decoration`, `/services/tent-balloon-setup`, `/services/room-decoration` |
| | Build only includes: `birthday-decoration`, `catering`, `decoration`, `hair-stylists`, `makeup-artists`, `mehndi-artists`, `photographers`, `videographers` |
| **Affected files** | `app/page.tsx` |
| **Fix** | Create missing service pages OR redirect to `/services` / `/services/decoration` with updated hrefs. |

---

### C6 — Invalid `SearchAction` structured data (non-existent search)

| Field | Detail |
|-------|--------|
| **Severity** | HIGH |
| **Impact** | Rich result ineligibility; Google may ignore or flag invalid schema |
| **Evidence** | `app/page.tsx` WebSite JSON-LD: `target: ${SITE_URL}/search?q={search_term_string}` — **no** `app/search` route exists |
| **Affected files** | `app/page.tsx` |
| **Fix** | Remove `potentialAction` SearchAction until a real search page exists. |

---

## Warnings

### W1 — Homepage LocalBusiness JSON-LD uses relative URLs

| Field | Detail |
|-------|--------|
| **Severity** | HIGH |
| **Evidence** | `structuredData` in `app/page.tsx`: `url: '/'`, `logo: '/logo.png'`, `image: '/og-banner.jpg'` |
| **Fix** | Use absolute URLs (`SITE_URL/...`) in all JSON-LD properties per Google guidelines. |

---

### W2 — NAP / telephone inconsistency in schema

| Field | Detail |
|-------|--------|
| **Severity** | HIGH |
| **Impact** | Local trust signals conflict across pages |
| **Evidence** | Homepage JSON-LD: `+91-8880544452` (primary) |
| | `app/(site)/_components/LocalBizJsonLd.tsx` line 7: `telephone: '+91 9591232166'` (secondary as primary) |
| | `lib/contact.ts` / `lib/site.ts`: WhatsApp `8880544452` |
| **Fix** | Single NAP module; pass into all LocalBusiness schemas. Mark secondary number as `additionalProperty` only. |

---

### W3 — `sameAs` / social URL inconsistency

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM |
| **Evidence** | Homepage: `instagram.com/wedecorevents`, `facebook.com/wedecorevents` |
| | Footer: `instagram.com/wedecorbangalore` |
| | LocalBizJsonLd: `instagram.com/wedecorbangalore` |
| **Fix** | Align to verified profiles only; one handle per platform site-wide. |

---

### W4 — Canonical format inconsistency

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM |
| **Evidence** | Mix of relative (`canonical: '/contact'`) and absolute (`canonical: \`${base}/areas/${slug}\``) |
| | `metadataBase` in `app/layout.tsx` resolves relative — OK if always set |
| | `app/(site)/locations/page.tsx` uses `canonical: \`${SITE}/locations\`` (absolute string) |
| **Fix** | Standardize on relative paths + `metadataBase`, or always absolute — one pattern. |

---

### W5 — Duplicate chrome (layout + nested Navbar/Footer)

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM (SEO/UX) |
| **Impact** | Duplicate nav links dilute crawl budget; accessibility noise |
| **Evidence** | Root `app/layout.tsx` renders Navbar + Footer |
| | `app/areas/layout.tsx` adds **second** Navbar + Footer |
| | `app/(site)/locations/[slug]/page.tsx` renders Navbar + Footer **inside page** (lines 93, 275) |
| **Fix** | Use route groups: one layout owns chrome; locality pages only render content. |

---

### W6 — `lastModified` always “now” in sitemap

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM |
| **Evidence** | `app/sitemap.ts` line 6: `const now = new Date()` applied to every entry |
| **Impact** | Crawlers cannot trust change frequency; may reduce crawl prioritization accuracy |
| **Fix** | Per-route `lastModified` from content file mtime or CMS.updatedAt. |

---

### W7 — Image sitemap misconfiguration

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM |
| **Evidence** | `app/image-sitemap/route.ts` attaches **all** `GALLERY_ITEMS` images to **every** listed URL (lines 20–34) |
| | Omits `/areas/*` and `/reviews`; lists `/about` but main sitemap omits `/about` |
| **Fix** | Per-URL image entries only; align URL list with main sitemap. |

---

### W8 — Client-heavy money pages (metadata & rendering)

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM |
| **Evidence** | `app/page.tsx`, `app/services/page.tsx` are `'use client'` |
| | Comment says “Metadata in layout” — limits per-page SEO tuning |
| | Build: homepage First Load JS **~311 kB**; shared **~217 kB** |
| **Fix** | Server Components for static hero + metadata; lazy-load Framer Motion below fold. |

---

### W9 — Thin commercial pages

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM |
| **Pages** | `app/pricing/page.tsx` — short table, no unique local proof |
| | Many `/areas/[slug]` pages — templated service grid, minimal unique copy |
| **Fix** | Expand pricing with packages, photos, FAQs, locality mentions; enrich areas or redirect to locations. |

---

### W10 — Open Graph gaps on key templates

| Field | Detail |
|-------|--------|
| **Severity** | LOW–MEDIUM |
| **Evidence** | `app/areas/[slug]/page.tsx` — Open Graph without `images` |
| | `app/faq/page.tsx`, `app/pricing/page.tsx` — minimal OG |
| **Fix** | Default OG image in root metadata `openGraph.images`; override per page. |

---

### W11 — Reviews schema / E-E-A-T gap

| Field | Detail |
|-------|--------|
| **Severity** | MEDIUM |
| **Evidence** | `app/reviews/page.tsx` — no `Review` or `AggregateRating` JSON-LD verified in page |
| | Testimonials use fallback + `/api/google-reviews` (endpoint not present) |
| **Fix** | Add `AggregateRating` only if legally accurate; embed real Google reviews widget with matching NAP. |

---

## Opportunities

| # | Opportunity | Expected impact |
|---|-------------|-----------------|
| O1 | Consolidate 64 duplicate locality URLs → 32 | Large crawl-budget and ranking clarity win |
| O2 | Add `/about`, `/reviews`, all `/services/*` to sitemap | Faster discovery of supporting pages |
| O3 | Server-render homepage H1 + LocalBusiness + FAQ schema | Better crawlability + rich results |
| O4 | Internal linking hub: `/locations` → top neighborhoods + service silos | Stronger topical authority |
| O5 | BreadcrumbList on all templates (locations hub missing “Home”) | Better SERP display |
| O6 | Unique title/description formulas per locality + service | Reduce cannibalization |
| O7 | Preload LCP hero image; reduce motion JS on mobile | CWV ranking boost |
| O8 | Google Business Profile alignment with site NAP | Local pack synergy |
| O9 | Add `FAQPage` to homepage + service hub | FAQ rich snippets |
| O10 | Hreflang not needed now; document English-only | Future i18n readiness |

---

## Category audits (detailed)

### Canonical URLs

| Check | Status | Notes |
|-------|--------|-------|
| Homepage canonical | **FAIL** | Missing — see C2 |
| www vs apex | **PASS** | `next.config.js` 301 apex → www |
| Vercel preview noindex | **PASS** | `X-Robots-Tag: noindex` on `*.vercel.app` |
| Trailing slash | **PASS** | `trailingSlash: false` |
| Duplicate locality pairs | **FAIL** | 32 duplicate pairs — see C1 |
| Relative vs absolute | **WARN** | Mixed patterns — W4 |

---

### Robots & crawlability

| Source | Allow | Sitemap | Issues |
|--------|-------|---------|--------|
| `app/robots.ts` | `/` | `/sitemap.xml` | Preferred |
| `public/robots.txt` | `/` | `/api/sitemap.xml` | **Conflicts** with app route |
| Disallow `/api/` | Yes (static) | — | Blocks `/api/sitemap.xml` path if used |

**API routes:** `/api/contact` should remain non-indexable (OK). Ensure no accidental indexing of JSON responses.

---

### Sitemap quality

**Included (~72 URLs):** `/`, `/services`, `/gallery`, `/pricing`, `/faq`, `/contact`, `/locations`, `/areas`, 32×`/locations/{slug}`, 32×`/areas/{slug}`

**Missing from main sitemap (indexable in build):**

- `/about`
- `/reviews`
- `/services/birthday-decoration`
- `/services/catering`
- `/services/decoration`
- `/services/hair-stylists`
- `/services/makeup-artists`
- `/services/mehndi-artists`
- `/services/photographers`
- `/services/videographers`

**Priority concerns:** All locality pages `0.6–0.8` despite unequal content depth; `/contact` at `0.5` is low for primary conversion page.

**Duplicate URLs in sitemap:** Both `/areas/{slug}` and `/locations/{slug}` — reinforces C1.

---

### Metadata consistency

| Page | Title pattern | Canonical | OG/Twitter |
|------|---------------|-----------|------------|
| Root layout | Brand + Bangalore | **None** | None |
| `/` (inherits) | Same as layout | **None** | None |
| `/areas/[slug]` | `{name} Event Decoration \| We Decor Events` | Absolute | Partial |
| `/locations/[slug]` | `...in {name}, Bengaluru \| We Decor` | Absolute | Minimal |
| `/services/*` | Service-specific | Relative | Most complete |
| `/faq`, `/pricing` | Short | Relative | Minimal |

**Cannibalization risk:** “Event Decoration” + locality appears in both areas and locations titles with similar descriptions.

**Title length:** Most within ~60 chars; some location titles may exceed on long names — monitor SERP truncation.

---

### Structured data

| Schema type | Where | Status |
|-------------|-------|--------|
| LocalBusiness | Homepage (`app/page.tsx`) | Present — **relative URLs**, SearchAction invalid |
| Organization + WebSite | Homepage | Present |
| LocalBusiness | `/locations/[slug]` via `LocalBizJsonLd.tsx` | Present — **wrong primary phone** |
| FAQPage | Areas + locations (when FAQs exist) | Partial — empty FAQ on most `/areas/*` |
| BreadcrumbList | Areas, locations | Present — locations missing “Home” item |
| Service | `/services/decoration` etc. | Present on some service pages |
| Review / AggregateRating | `/reviews` | **Not verified** |

**Validation:** Run Google Rich Results Test after fixes; no automated CI assertion found in repo for all templates.

---

### Local SEO (Bangalore)

| Factor | Assessment |
|--------|------------|
| Geo keywords | Strong on `/locations/*` (Bengaluru, landmarks, venue types) |
| Locality coverage | 32 neighborhoods — excellent breadth |
| NAP consistency | **Weak** — multiple phones/social handles — W2, W3 |
| GBP alignment | Not auditable in repo — manual check required |
| `areaServed` | Present in schema |
| Content uniqueness | **Strong** on `/locations/*`; **weak** on `/areas/*` |
| Doorway risk | **Elevated** until duplicate routes resolved |

---

### Core Web Vitals & performance SEO

**Source:** `lighthouse-report-live.json` — mobile emulation, production homepage, 2025-08-01.

| Metric | Value | Score (audit) | Risk |
|--------|-------|---------------|------|
| Performance (category) | **53** | Poor | High |
| LCP | **~5.5 s** | 0.18 | **Critical** |
| FCP | **~2.7 s** | 0.59 | High |
| Speed Index | **~5.1 s** | 0.62 | High |
| CLS | **~0** (good) | 1.0 | Low |
| TBT | Poor (weight 30%) | ~0.32–0.38 | High |
| SEO (Lighthouse category) | **100** | Misleading | Homepage had canonical in Aug 2025 run — **currently missing in code** |

**Bundle (build):** Homepage **311 kB** First Load JS; Framer Motion + client homepage; Swiper on reviews.

**Rendering:** Client homepage delays metadata/hydration for crawlers that execute JS (Google does, but slower). SSR/SSG preferred for H1 and body copy above fold.

**Images:** Next/Image used on homepage; large static JPGs in `/public/services/`.

---

### Mobile SEO

| Check | Status |
|-------|--------|
| Viewport | PASS (Lighthouse) |
| Responsive layout | PASS (Tailwind) |
| Tap targets / nav | Generally OK |
| Font contrast | FAIL on some pages (contact WhatsApp link — axe in prior tests) |
| Mobile LCP | **FAIL** (~5.5s measured) |

---

### Google Ads landing quality

| Landing | Quality concern |
|---------|-----------------|
| `/` | Slow LCP; no canonical — **Below average** LP experience |
| `/contact` | Good intent; needs fast LCP + trust signals |
| `/locations/{slug}` | Best local relevance for geo campaigns |
| `/areas/{slug}` | Thin vs locations — **avoid for ads** |
| Broken service URLs from home | **Policy risk** if used as extensions |

**Recommendation:** Primary paid URLs: `/`, `/contact`, `/locations/{target}`, `/services/decoration`. Pause locality duplicates in campaigns.

---

### Internal linking

| Pattern | Assessment |
|---------|------------|
| Navbar: Areas + Locations | Reinforces duplicate silos |
| Footer | Core links present |
| Areas → Locations | **No** cross-links found under `app/areas` |
| Locations → nearby | One nearby link via clusters — good |
| Homepage → services | **Broken links** — C5 |

---

### Content quality / thin pages

| Pattern | Risk |
|---------|------|
| 32× `/areas/{slug}` templated | Thin / near-duplicate |
| 32× `/locations/{slug}` | Substantially better — unique FAQs, landmarks, gallery |
| `/pricing` | Thin |
| Service vendor pages (catering, photographers) | May be thin vs core decor intent — verify unique value |

**Uniqueness tooling:** `scripts/check-uniqueness.ts`, `content:uniqueness` exist — recommend CI gate on locality pairs.

---

## What's working well (production-grade elements)

1. **`metadataBase`** from `NEXT_PUBLIC_SITE_URL` in root layout — correct Next.js 15 pattern when canonicals exist.
2. **SSG locality pages** via `generateStaticParams` + `dynamicParams = false` — stable crawl targets.
3. **`/locations/*` depth** — landmarks, service descriptions, FAQs, gallery — strong local landing template.
4. **Security/indexation guard** for Vercel previews — `noindex` on `vercel.app`.
5. **HTTPS + www redirects** — configured in `next.config.js`.
6. **JSON-LD helpers** (`lib/seo.tsx`) escape `<` in JSON — XSS-safe script injection.
7. **CI SEO workflows** present (`.github/workflows/seo-guardrails.yml`, `verify-sitemap.yml`) — enforcement quality varies.
8. **Image formats** — WebP/AVIF in `next.config.js` `images.formats`.

---

## Prioritized remediation roadmap

### Phase 0 — Emergency (1–3 days)

1. Fix robots/sitemap conflict (C3) — single `robots.ts`, one sitemap URL.
2. Add homepage canonical (C2).
3. Fix homepage broken service links (C5).
4. Remove invalid SearchAction schema (C6).
5. Decide canonical locality strategy; implement 301 or canonical tags (C1).

### Phase 1 — Indexing hygiene (1–2 weeks)

6. Complete `app/sitemap.ts` with all indexable routes; fix `lastModified`.
7. Remove duplicate locality URLs from sitemap (keep preferred pattern only).
8. Fix NAP/schema phone + social `sameAs` (W2, W3).
9. Absolute URLs in homepage JSON-LD (W1).
10. Deduplicate Navbar/Footer layouts (W5).

### Phase 2 — Quality & CWV (2–4 weeks)

11. Server-render homepage; reduce Framer Motion critical path.
12. Target LCP < 2.5s mobile on `/` and `/contact`.
13. Enrich `/pricing` and thin service pages.
14. Add AggregateRating only with verified review data.
15. Fix image sitemap (W7).

### Phase 3 — Growth (ongoing)

16. Internal linking model: locations ↔ services ↔ gallery.
17. Search Console monitoring: coverage, CWV, FAQ rich results.
18. Uniqueness CI for generated locality copy.
19. Google Ads LP alignment to `/locations/*` + `/contact`.

---

## Manual verification checklist (post-fix)

- [ ] Google Search Console: submit `https://www.wedecorevents.com/sitemap.xml`
- [ ] URL Inspection: homepage canonical = `https://www.wedecorevents.com/`
- [ ] Confirm only one locality URL per slug indexed
- [ ] Rich Results Test: homepage + one `/locations/*` page
- [ ] PageSpeed Insights: mobile LCP on `/` and `/contact`
- [ ] GBP NAP matches `lib/contact.ts` primary number
- [ ] No `site:wedecorevents.com inurl:areas` growth after redirects

---

## Appendix: Key file reference

| Topic | Files |
|-------|-------|
| Sitemap | `app/sitemap.ts`, `app/image-sitemap/route.ts` |
| Robots | `app/robots.ts`, `public/robots.txt` |
| Metadata root | `app/layout.tsx`, `app/page.tsx` |
| Locality data | `app/(site)/_data/locations.ts`, `faqs.ts`, `clusters.ts` |
| Duplicate routes | `app/areas/[slug]/page.tsx`, `app/(site)/locations/[slug]/page.tsx` |
| Schema | `lib/seo.tsx`, `components/seo/*`, `app/(site)/_components/*` |
| Redirects | `next.config.js` |
| SEO CI | `.github/workflows/seo-guardrails.yml`, `scripts/audit-seo-tags.ts` |
| CWV artifact | `lighthouse-report-live.json` |

---

*End of audit. No repository files were modified during this assessment.*
