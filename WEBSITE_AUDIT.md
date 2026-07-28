# We Decor — Full Website Audit

**Project:** `we-decor` (Next.js 15.5.18, React 19.1.1, App Router)
**Repo path:** `/Users/mohammedilyas/Desktop/wedecorwebsite`
**Production:** `https://www.wedecorevents.com`
**Audit date:** 2026-07-12
**Audit type:** Read-only static analysis (no files modified)
**Roles applied:** Staff Engineer · Technical SEO · Performance Engineer · UX Designer · Accessibility Expert · CRO Specialist

> This report is self-contained. Every recommendation includes exact file paths, line numbers, and code evidence so it can be implemented without re-auditing.

---

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [SEO Audit](#2-seo-audit)
3. [Performance Audit](#3-performance-audit)
4. [Accessibility](#4-accessibility)
5. [UX Audit](#5-ux-audit)
6. [Conversion Rate Optimization](#6-conversion-rate-optimization)
7. [Code Quality](#7-code-quality)
8. [Analytics](#8-analytics)
9. [Security](#9-security)
10. [Prioritized Improvements](#10-prioritized-improvements)

---

## 1. Project Architecture

### 1.1 Directory Purposes

| Directory | Approx. size | Purpose |
|-----------|--------------|---------|
| `app/` | 38 files | App Router pages, layouts, API routes, `sitemap.ts`/`robots.ts`, route group `(site)` for locations |
| `components/` | 60 files | UI: root (25 flat files), `home/` (11), `areas/` (9, orphaned), `lux/` (8), `seo/` (4), `services/` (2), `contact/` (1) |
| `lib/` | 29 files | Site config, metadata, SEO schema, leads/contact logic, security, image path helpers, decoration page configs |
| `utils/` | 2 files | `gallery.ts` (gallery data), `googleReviews.ts` (fallback testimonials + Google link) |
| `scripts/` | 72 files | SEO QA, area generation, image pipelines, Lighthouse, link crawlers, Vercel deploy — **excessive for a marketing site** |
| `env/` | 3 files | `validation.ts`, `.env.example`, `README.md` |
| `public/` | ~86 images, ~45 MB | Static assets (WebP, some HEIC, 4 broken placeholders) |

### 1.2 Routing Structure

**19 `page.tsx` routes**, including:

| URL | File |
|-----|------|
| `/` | `app/page.tsx` |
| `/about`, `/contact`, `/gallery`, `/pricing`, `/faq`, `/reviews`, `/services` | `app/*/page.tsx` |
| `/services/birthday-decoration` | Static page (also excluded from dynamic slug list) |
| `/services/catering`, `/decoration`, `/hair-stylists`, `/makeup-artists`, `/mehndi-artists`, `/photographers`, `/videographers` | 7 static "partner service" pages |
| `/services/[slug]` | `app/services/[slug]/page.tsx` — 9 dynamic decoration slugs via `DECORATION_SERVICE_SLUGS` |
| `/locations` | `app/(site)/locations/page.tsx` |
| `/locations/[slug]` | `app/(site)/locations/[slug]/page.tsx` — 30 areas via `generateStaticParams` |

**Non-page routes:** `app/api/contact/route.ts`, `app/api/csp-report/route.ts`, `app/image-sitemap/route.ts`, `app/sitemap.ts`, `app/robots.ts`.

**Special files:** `app/layout.tsx`, `app/services/layout.tsx`, `app/not-found.tsx`, `app/global-error.tsx`.

No catch-all routes, no `pages/` directory (Pages Router fully removed from routing, but legacy Pages-Router-era components remain — see §1.5).

### 1.3 Route Collisions / Overlapping Concerns

**a) Dual routing for `birthday-decoration`**

```541:543:lib/services/decoration-service-pages.ts
export const DECORATION_SERVICE_SLUGS = Object.keys(DECORATION_SERVICE_PAGES).filter(
  (s) => s !== 'birthday-decoration'
) as DecorationServiceSlug[];
```

A static page (`app/services/birthday-decoration/page.tsx`) duplicates what the dynamic `[slug]` route would render. Two code paths must be kept in sync manually — a maintenance trap.

**b) Phantom location×service URLs**

```42:46:lib/site.ts
export const buildLocationServiceUrl = (location: string, service: string) => {
  const cleanLocation = location.toLowerCase().replace(/\s+/g, '-');
  const cleanService = service.toLowerCase().replace(/\s+/g, '-');
  return `${SITE_URL}/locations/${cleanLocation}/${cleanService}`;
};
```

This helper and `components/LocationServicePage.tsx` (365 lines) reference `/locations/{slug}/services/{service}` — **no such route exists** under `app/`. The component is never imported anywhere.

**c) Two sitemap mechanisms**

`app/sitemap.ts` (canonical) and `app/image-sitemap/route.ts` (attaches all gallery images to a small set of URLs) — potential SEO noise from image sitemap duplication.

**d) Legacy `/areas/*` → `/locations/*` redirect**

```63:72:next.config.js
      {
        source: '/areas',
        destination: '/locations',
        permanent: true,
      },
      {
        source: '/areas/:slug',
        destination: '/locations/:slug',
        permanent: true,
      },
```
Good consolidation, but scripts like `gen:areas` / `update:areas` still imply an old architecture.

### 1.4 Component Organization

Organization is **partially consistent, partially legacy**:

| Subfolder | Files | Naming convention | Actively used? |
|-----------|-------|--------------------|-----------------|
| `components/home/` | 11 | kebab-case (`home-hero.tsx`) | ✅ Yes |
| `components/lux/` | 8 | PascalCase | ✅ Yes (design-system primitives) |
| `components/seo/` | 4 | Mixed (`JsonLd.tsx`, `local-business-schema.tsx`) | ✅ Yes |
| `components/services/` | 2 | PascalCase | ✅ Yes |
| `components/areas/` | 9 | PascalCase | ❌ No — only referenced by codegen scripts |
| Root `components/` | 25 | PascalCase | Mixed — ~15 orphaned |

**Reusable & actively composed:** `Navbar`, `Footer`, `ContactForm`, `Gallery`, `PageHero`, `SchemaScript`, `DecorationServicePage`, `PartnerServicePage`, all `home/*` sections, all `lux/*` primitives.

### 1.5 Dead Code

**Orphaned components (zero runtime imports) — ~20 files, ~1,500+ lines:**

| File | Lines | Why it's dead |
|------|-------|----------------|
| `components/LocationServicePage.tsx` | 365 | References non-existent routes |
| `components/Hero.tsx` | 33 | Superseded by `home/home-hero.tsx` |
| `components/CTA.tsx` | 23 | Superseded; uses old gradient design |
| `components/Layout.tsx` | 55 | Pages-Router wrapper (`next/head`) — App Router doesn't use it |
| `components/SeoHead.tsx` | 76 | Only imported by dead `Layout.tsx`; uses `next/head` |
| `components/WhyChooseUs.tsx` | 35 | Superseded by `home/home-why.tsx` |
| `components/ServiceCard.tsx` | 35 | Superseded; `home-services.tsx` inlines its own cards |
| `components/Breadcrumbs.tsx` | 72 | Imports `useRouter` from **`next/router`** — Pages Router API, breaks if ever imported into App Router |
| `components/Testimonials.tsx` | 96 | Only reachable via dead `home-testimonials-lazy.tsx` |
| `components/home/home-testimonials-lazy.tsx` | 13 | Never imported (homepage uses `home-testimonials.tsx` directly) |
| `components/home/home-testimonials-skeleton.tsx` | ~15 | Only used by the dead lazy wrapper |
| `components/ClientVisible.tsx` | ~10 | Zero imports |
| `components/DarkModeToggle.tsx` | ~20 | Zero imports; theme is hard-forced to dark |
| `components/ErrorBoundary.tsx` | 110 | Zero imports |
| `components/LoadingSpinner.tsx` | ~20 | Zero imports |
| `components/lux/BrandMark.tsx` | ~15 | Zero imports |
| `components/lux/LogoPrimary.tsx` | ~30 | Zero imports |
| **All 9 `components/areas/*`** | ~215 total | Only referenced by `scripts/update-all-areas.ts`, `scripts/upgrade-areas-ui.ts` |

**Orphaned `lib/` data modules (~1,200 lines):**

| File | Lines | Status |
|------|-------|--------|
| `lib/data/locationPages.ts` | ~662 | No imports |
| `lib/data/locations.ts` | 202 | Superseded by `app/(site)/_data/locations.ts` |
| `lib/data/services.ts` | ~145 | No imports |
| `lib/data/gallery-map.ts` | ~150 | No imports |
| `lib/data.ts` | 3 | Re-export wrapper with no consumers |
| `lib/image.ts` | 213 | Cloudinary helper; active code uses `lib/images.ts` instead (note singular vs plural naming confusion) |

**Partially dead exports:**

- `GoogleReviewsWidget` default export (`components/GoogleReviewsWidget.tsx:20`) is unused; only `SimpleGoogleReviewsEmbed` is imported. It also contains an Elfsight stub with a literal placeholder ID:
  ```
  data-elfsight-app-id="your-app-id-here"
  ```
- `fetchGoogleReviews()` in `utils/googleReviews.ts:20` has zero call sites after the Google Reviews API route was removed — the app renders `fallbackTestimonials` only.

**Placeholder/stub assets:**

| File | Size | Content |
|------|------|---------|
| `public/gallery/tent1.webp` | 70 B | Literal text: *"This is a placeholder..."* |
| `public/gallery/haldi1.webp` | 71 B | Same pattern |
| `public/gallery/wedding1.webp` | 73 B | Same pattern |
| `public/gallery/birthday1.webp` | 74 B | Same pattern |

`data/gallery.json` still references these 4 broken paths but is not imported anywhere; the live gallery uses `utils/gallery.ts` (Cloudinary URLs).

**17 HEIC files** (1.3–3.2 MB each) sit in `public/gallery/**` — not browser-servable, pure deploy bloat.

### 1.6 Duplicate Code

**Reviews/testimonials — 4 overlapping implementations, ~250 duplicated lines:**

| Component | Lines | Used on | Pattern |
|-----------|-------|---------|---------|
| `home/home-testimonials.tsx` | 43 | `/` | Static 3-card grid |
| `Testimonials.tsx` | 96 | Orphaned | Swiper carousel |
| `ReviewsList.tsx` | 53 | `/reviews` | Full grid + stars |
| `GoogleReviewsWidget.tsx` | 127 | `/reviews` (partial) | Elfsight stub + simple embed |

`ReviewsList` and `Testimonials` share nearly identical card markup — should be one `ReviewCard` component reused by both list and carousel wrappers.

**"Why choose us" — 2 variants:** active `home/home-why.tsx` (4 pillars) vs dead `WhyChooseUs.tsx` (3 features, different copy).

**FAQ — 3 parallel implementations with contradictory content:**

- `components/FAQ.tsx` (Headless UI accordion, `/faq`) — says pricing is "never pulled from a catalogue"
- `components/home/home-faq.tsx` (native `<details>`, `/`) — states pricing "from ₹2,999"
- Inline `<dl>` FAQ in `app/(site)/locations/[slug]/page.tsx` (lines 154–168)

This is a **direct customer-facing contradiction** about pricing transparency between two FAQ surfaces.

**Service page templates:**

| Component | Lines | Used for |
|-----------|-------|----------|
| `DecorationServicePage.tsx` | 323 | 9 decoration services (config-driven) |
| `PartnerServicePage.tsx` | 86 | 7 partner services |
| `LocationServicePage.tsx` | 365 | Dead |

The 7 partner service route files (`app/services/catering/page.tsx`, etc.) each repeat ~25 lines of inline `config={{...}}` — ~175 lines of near-duplicate boilerplate that should live in a single data file (mirroring how `DECORATION_SERVICE_PAGES` already works for decoration services).

**Breadcrumbs — 3 implementations:** `components/Breadcrumbs.tsx` (dead, Pages Router), `components/areas/Breadcrumbs.tsx` (dead), `components/seo/JsonLd.tsx → BreadcrumbsJsonLd` (active, JSON-LD only).

**Image path modules:** `lib/images.ts` (active, static WebP paths) vs `lib/image.ts` (unused Cloudinary builder) — confusing near-identical filenames.

### 1.7 Technical Debt

- No `TODO`/`FIXME` comments in `app/`, `components/`, or `lib/`.
- Legacy Pages-Router imports remain in dead files: `components/SeoHead.tsx:1` (`import Head from 'next/head'`), `components/Breadcrumbs.tsx:2` (`import { useRouter } from 'next/router'`) — these would **fail to compile** if anyone re-imported them into the App Router tree.
- Build quality gate weakened:
  ```25:26:next.config.js
    eslint: { ignoreDuringBuilds: true }, // unblock prod build
    typescript: { ignoreBuildErrors: false },
  ```
- `ThemeProvider` forces dark mode, making `DarkModeToggle.tsx` permanently dead:
  ```8:12:components/ThemeProvider.tsx
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        forcedTheme="dark"
        enableSystem={false}
  ```
- In-progress Google Reviews migration (per git status) leaves the testimonials stack in a transitional, redundant state (see §1.6).
- **99 npm scripts / 72 script files** — a fragile, overgrown audit/build pipeline. Redundant pairs:

| Redundant scripts | Issue |
|---|---|
| `predeploy:validate` / `validate:sitemap` | Both run `scripts/validate-sitemap-urls.ts` |
| `qa:seo` / `qa:seo:check` | Identical target |
| `test` / `test:e2e` | Both `playwright test` |
| `serve:prod` / `start:prod` | Both `next start -p 3001` |
| `qa:dev` / `dev` | Both `next dev` |
| `seo:jsonld` / `seo:jsonld:new` | Old + new validators |
| `seo:phones` / `seo:phones:new` | Old + new auditors |
| `audit:robots` / `qa:robots` | Overlapping |
| `audit:links` / `qa:links` / `verify:links` | 3 link crawlers |
| `verify:lh` / `lh` | Same script |
| `verify:lighthouse` / `lighthouse.mjs` / `lighthouse-audit.ts` / `lighthouse-check.ts` | 4 Lighthouse entry points |
| `check-bundle-size.mjs` / `bundle-budgets.mjs` / `guard-bundles.mjs` | 3 bundle checks |
| `convert-images.js` / `convert-images.mjs` | Duplicate converters |
| `verify-headers.cjs` / `.mjs` / `headers-verify.ts` | 3 header verifiers |
| `gen:areas` / `gen:areas:txt` / `gen:areas:master` / `content:generate` | 4 area generators |

`preflight` (`lint` + `typecheck` + `build:check` + `test:smoke`) is a sane consolidated entry point — buried among 98 others.

---

## 2. SEO Audit

### 2.1 Metadata

Centralized via `pageMetadata()`:

```42:72:lib/metadata.ts
export function pageMetadata({
  path, title, description, ogImage = '/logo.png', noindex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage);
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'We Decor', locale: 'en_IN', type: 'website', images: [{ url: imageUrl }] },
    twitter: { card: 'summary_large_image', title, description, images: [imageUrl] },
    robots: getIndexingRobots(noindex),
  };
}
```

Root layout sets a title template:

```28:35:app/layout.tsx
export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: `${SITE_NAME} - Event Decoration Services in Bangalore`,
    template: `%s | ${SITE_NAME}`,
  },
  ...
```

**🐛 Bug — double branding in rendered `<title>`:** Child pages already append `| We Decor` inside their own title string while the layout template *also* appends `%s | We Decor`, e.g.:

```51:54:app/(site)/locations/[slug]/page.tsx
  return pageMetadata({
    path: `/locations/${area.slug}`,
    title: `Event Decoration Services in ${area.name}, ${CITY} | ${BUSINESS_NAME}`,
```

Rendered result: **"Event Decoration Services in Koramangala, Bengaluru | We Decor | We Decor"**. Same pattern hits `/about`, `/faq`, `/services/catering`, `/services/birthday-decoration`, and likely most other pages that build their own title string.

**Meta description uniqueness:** Only 5 locations (koramangala, whitefield, indiranagar, hsr-layout, jayanagar) have hand-written descriptions. The other ~25 locations fall back to:

```54:56:app/(site)/locations/[slug]/page.tsx
    description:
      CUSTOM_META_DESCRIPTIONS[area.slug] ??
      `Professional event decoration services in ${area.name}, ${CITY}. Birthday decor, wedding setup, haldi decoration, room decoration.`,
```

~83% of location pages share an identical description template with only the name swapped — a classic local-SEO duplicate-content signal.

### 2.2 Canonical Tags

All pages using `pageMetadata()` / `generateMetadata()` get `alternates.canonical` set to an absolute URL via `absoluteUrl()`. Coverage is complete across static and dynamic routes. No duplicate or missing canonicals were found on live App Router pages. Legacy `components/SeoHead.tsx` (manual `<link rel="canonical">`) is dead code and not a risk.

### 2.3 Sitemap

`app/sitemap.ts` generates ~56 URLs: 9 static pages + 17 service pages (`lib/site.ts` `SERVICE_PATHS`) + 30 location pages.

```5:35:app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  ...
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    ...
  ];
  const servicePages = Object.values(SERVICE_PATHS).map((path) => ({
    url: `${base}${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75,
  }));
  const locationPages = AREAS.map((a) => ({
    url: `${base}/locations/${a.slug}`, lastModified: now, changeFrequency: 'monthly', priority: a.slug === 'bangalore' ? 0.8 : 0.7,
  }));
  return [...staticPages, ...servicePages, ...locationPages];
}
```

**Issues:**
- Static pages block (lines 9–18) omits `changeFrequency`.
- `lastModified: now` is set to the current build time on **every** build — provides no real freshness signal to crawlers.
- All live routes are represented; no dead/redirected URLs (`/areas/*`) are included — good.

### 2.4 Robots.txt

Dynamically generated, no conflicting static `public/robots.txt`:

```8:26:app/robots.ts
export default function robots(): MetadataRoute.Robots {
  ...
  if (isPreview) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/', '/admin/', '/private/'] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
```
Correct sitemap reference, correct preview-environment blocking, no accidental over-blocking.

### 2.5 Structured Data (JSON-LD)

| Page | JSON-LD | Source |
|------|---------|--------|
| Homepage | `@graph`: Organization, LocalBusiness, WebSite, 7× Service | `components/home/home-json-ld.tsx` |
| Homepage (again) | **Duplicate** standalone LocalBusiness + AggregateRating | `components/seo/local-business-schema.tsx` |
| Homepage FAQ | FAQPage | `components/home/home-faq.tsx:34-38` |
| Gallery | BreadcrumbList | `app/gallery/page.tsx:19-24` |
| Location pages | Service (provider-linked), FAQPage, BreadcrumbList | `LocalBizJsonLd.tsx`, `FAQJsonLd.tsx` |
| Locations hub | CollectionPage | `app/(site)/locations/page.tsx:162-168` |
| Decoration/partner services | Service | Per-page |
| **FAQ page** | ❌ Missing | `app/faq/page.tsx` has no schema despite visible FAQ content |
| **Reviews page** | ❌ Missing | `app/reviews/page.tsx` has no Review/AggregateRating schema |

**🐛 Critical — duplicate LocalBusiness entity on homepage:**

```22:26:app/page.tsx
export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <LocalBusinessSchema />
```

Both emit LocalBusiness data. `LocalBusinessSchema` additionally hardcodes a rating that has no matching visible review markup on the page:

```48:53:components/seo/local-business-schema.tsx
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '75',
    bestRating: '5',
  },
```

This is a **Google rich-result policy risk** (fabricated/unverifiable ratings) and duplicate-entity confusion for crawlers.

Locality pages correctly avoid this by linking a `Service` schema to a shared `provider` ID instead of re-emitting LocalBusiness:

```13:14:app/(site)/_components/LocalBizJsonLd.tsx
export default function LocalBizJsonLd({ areaName, slug }: Props) {
  return <SchemaScript data={buildLocalityServiceSchema(areaName, slug)} />;
```

### 2.6 Open Graph & Twitter Cards

Consistent OG/Twitter fields via `pageMetadata()`, but **no `width`/`height`/`alt`** are set on OG images (`lib/metadata.ts:63` only sets `{ url: imageUrl }`), and several referenced OG images **do not exist on disk**:

| Referenced path | Exists? |
|---|---|
| `/og-banner.webp`, `/logo.png` | ✅ |
| `/images/reviews-og.jpg` (`app/reviews/page.tsx:12`) | ❌ Missing — no `public/images/` dir |
| `/services/catering.jpg`, `decoration.jpg`, `hair.jpg`, `makeup.jpg`, `mehndi.jpg`, `photography.jpg`, `videography.jpg` | ❌ All missing (7 partner service pages) |

Result: link previews on WhatsApp/Facebook/LinkedIn/Twitter for **8 pages** (7 partner services + reviews) will show a broken image or fall back to nothing.

### 2.7 Internal Linking

| Target | In Navbar? | In Footer? |
|---|---|---|
| `/about`, `/services`, `/gallery`, `/locations`, `/pricing`, `/faq`, `/contact` | ✅ | ✅ |
| `/reviews` | ❌ | ❌ |

`/reviews` is **effectively orphaned** — reachable only via sitemap and testimonial "Read our Google reviews" links which point externally to Google, not internally to `/reviews`.

The homepage links to service cards and `/gallery`, but has **no direct link to `/locations`** or any individual locality page — a missed internal-linking opportunity for local SEO (locality pages currently rely almost entirely on the `/locations` hub page for discovery).

Location pages cross-link to `/services`, `/gallery`, and exactly **one** nearby locality — thin internal link equity distribution across the 30-page cluster.

### 2.8 Heading Hierarchy

| Page | H1 | Issue |
|---|---|---|
| Homepage, Services hub, Service detail, Location page | 1× H1, clean H2→H3 | ✅ None |
| **Gallery** | H1 → **H3** in cards (`Gallery.tsx:91`) | ⚠️ Skips H2 |
| **FAQ page** | H1 only; questions are `<span>` in buttons | ⚠️ No H2/H3 structure for FAQ items |
| **Reviews** | 1× H1; cards use `<p>` | ✅ OK |

### 2.9 Image Alt Text

15 `<Image>` usages across 11 files, 0 raw `<img>` tags, and **0 missing `alt` props**. Quality varies: hero and location gallery images have strong descriptive/localized alt text (via `localize()` in `app/(site)/_data/gallery.ts:121-125`), while modal/category thumbnails fall back to generic patterns like:

```156:156:components/ImageModal.tsx
                      alt={item.alt || `${category} decoration image ${i + 1}`}
```

`scripts/find-missing-alt.mjs` exists as a CI-style check but only verifies the `alt` prop is *present*, not that it's meaningful.

### 2.10 Duplicate Content Risk (Location Pages)

**Critical finding — unique copy exists but is not rendered.** `app/(site)/_data/locations.generated.ts` contains per-area `bodyCopy` (~100+ words each) and `heroTagline`, but `app/(site)/locations/[slug]/page.tsx` **never imports or renders these fields**. Similarly, `uniqueFAQ` fields in `locations.ts` are unused — the page calls a separate shared `faqsForArea()` helper instead. This is a wasted content-uniqueness investment that already exists in the data layer and just needs wiring up.

**Uniqueness comparison (Koramangala vs Jayanagar vs Hebbal):**

| Element | Koramangala | Jayanagar | Hebbal |
|---|---|---|---|
| Meta description | Custom | Custom | Templated |
| Hero copy | Same sentence skeleton, name swapped | Same | Same |
| Service descriptions | Landmark-injected ("Forum Mall, NGV Club") | Landmark-injected ("4th Block, JP Nagar") | Generic |
| FAQs | 6 shared + overrides | 6 shared + overrides | 6 shared only |
| Gallery | Same 10 images, localized captions | Same 10 images | Same 10 images |
| Local testimonials | None | None | None |

`scripts/check-uniqueness.ts` already implements Jaccard-similarity checking against `bodyCopy` — but it's measuring content that isn't actually live on the site.

### 2.11 Location Page Quality

Estimated rendered word count per location page: **~750–1,100 words** (hero ~40, 8 service descriptions ~400, FAQ ~250, landmarks ~40, gallery captions ~100, CTAs ~60). Borderline acceptable length, but **lexical overlap across all 30 pages is high** due to shared sentence templates, shared FAQ bank, and identical gallery images.

**Doorway-page risk assessment:**

| Factor | Risk |
|---|---|
| 30 near-identical templates | High |
| 25/30 templated meta descriptions | High |
| Identical gallery images across all areas | Medium–High |
| No local proof (reviews/case studies per area) | Medium |
| Landmark/venue-type injection | Mitigates — Low–Medium |
| `/areas` → `/locations` 301 consolidation | Low risk (good) |

**Verdict:** Not empty/spam pages, but structurally close to what Google's local-doorway-page guidance flags — especially for the ~25 long-tail localities without custom descriptions, landmarks, or unique body copy.

---

## 3. Performance Audit

### 3.1 Image Optimization

```27:34:next.config.js
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dux3m2saz/**' },
      { protocol: 'https', hostname: 'wedecorevents.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.wedecorevents.com', pathname: '/**' },
    ],
  },
```

Modern formats enabled; **`images.qualities` is not configured** — this triggers Next.js 16 deprecation warnings for every `quality={70}` / `quality={82}` override seen at runtime (confirmed in dev server logs during this session).

**Counts:** 15 `<Image>` usages across 11 files; **0** plain `<img>` tags in UI code — excellent `next/image` adoption.

**Broken placeholder images:** the same 4 files noted in §1.5/§1.7 (`tent1.webp`, `haldi1.webp`, `wedding1.webp`, `birthday1.webp`, 70–74 bytes each).

**17 HEIC files** (1.3–3.2 MB each) under `public/gallery/**` — not browser-servable, pure deploy weight (~30+ MB of the ~45 MB `public/` total).

**Hero image mismatch:** documentation (`HOMEPAGE_PERFORMANCE_REPORT.md`) describes `og-banner.jpg` as the LCP hero image, but the live code uses:

```8:9:lib/images.ts
export const HERO_BACKGROUND_SRC = '/services/engagement.webp';
```

**`priority` prop misuse:**

| Location | Usage | Verdict |
|---|---|---|
| `home-hero.tsx:14` | Hero image | ✅ Correct (true LCP) |
| `home-services.tsx:72` | `priority={index < 2}` | ⚠️ Below-fold, unnecessary preload |
| `home-gallery-preview.tsx:50` | `priority={i < 2}` | ⚠️ Below-fold |
| `LocationGallery.tsx:93` | Modal image | ❌ Wrong — modal isn't above-fold |
| `ImageModal.tsx:207` | Fullsize overlay | ❌ Wrong — user-triggered, not initial paint |

Every extra `priority` image competes with the true LCP candidate for bandwidth during the critical rendering path.

### 3.2 Lazy Loading

3 `next/dynamic` call sites, 0 `React.lazy`:

| File | Loads | `ssr` |
|---|---|---|
| `components/home/home-testimonials-lazy.tsx:6-9` | `Testimonials` (Swiper) | `false` — but this wrapper is **never imported**; dead code |
| `components/Gallery.tsx:8-15` | `ImageModal` (framer-motion) | `false` — correct, modal-only |
| `app/contact/page.tsx:6-14` | `ContactFormClient` | default `true` — code-split with skeleton |

`react-intersection-observer` is a devDependency but effectively unused: `ImageModal.tsx:6` imports `useInView` but never calls it (dead import). `components/ClientVisible.tsx` wraps native `IntersectionObserver` but is never imported anywhere.

### 3.3 Bundle Size

| Package | Boundary issue |
|---|---|
| `framer-motion` | Leaks into the **homepage server component tree** via `home-services.tsx` → `FadeIn` (client component) — pulls the whole animation library into the homepage bundle for a simple scroll-reveal effect |
| `swiper` | Isolated to the dead `Testimonials.tsx` — currently zero cost since unused |
| `cloudinary` (npm package) | **Zero runtime imports** — dead dependency; only URL strings are used via `utils/gallery.ts` |
| `@sentry/nextjs` | Correctly deferred (see §8.5), but replay + 100% trace sampling is heavy once active |

Bundle guard scripts exist (`scripts/guard-bundles.mjs` — 500 KB/route, `scripts/bundle-budgets.mjs` — 1.5 MB main bundle) but no current build artifacts were present to validate against.

Documented baseline (`HOMEPAGE_PERFORMANCE_REPORT.md`): homepage First Load JS ~226 KB.

### 3.4 Dynamic Imports — Full Inventory

| # | File:Line | Target |
|---|---|---|
| 1 | `components/home/home-testimonials-lazy.tsx:6` | `Testimonials` (dead path) |
| 2 | `components/Gallery.tsx:8` | `ImageModal` |
| 3 | `app/contact/page.tsx:6` | `ContactFormClient` |
| 4 | `components/WebVitalsReporter.tsx:10` | `lib/web-vitals-report` |
| 5 | `instrumentation-client.ts:6` | `sentry-client-init` |
| 6 | `instrumentation.ts:5,9,15` | Sentry server/edge configs |

### 3.5 Font Loading

```15:26:app/layout.tsx
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--font-cormorant',
});
```

Good: `next/font/google` with `display: 'swap'`, `latin` subset only, CSS variables. Minor: Cormorant loads 4 static weights instead of a single variable-font file — slightly heavier than necessary.

### 3.6 Rendering Strategy

- `dynamic = 'force-static'` on `app/contact/page.tsx:23` and `app/gallery/page.tsx:14`
- `dynamic = 'force-dynamic'` on `app/api/contact/route.ts:11`
- `generateStaticParams()` on service `[slug]` and location `[slug]` routes
- **Zero** `revalidate` exports anywhere — **no ISR** is used; all static content requires a full redeploy to update (including gallery images and location body copy)
- `middleware.ts` is a **no-op in production** by design:
  ```4:6:middleware.ts
  const SHOULD_APPLY =
    process.env.FORCE_LOCAL_HEADERS === '1' || process.env.NODE_ENV !== 'production';
  ```
  Security headers are applied via `next.config.js` `headers()` in production instead — zero per-request middleware cost.

### 3.7 Server vs Client Components

Roughly **22 client components** vs **~38 server components** in `components/`. Notable boundary issues:

- `ThemeProvider` (`'use client'`) wraps the entire page tree in `app/layout.tsx`, forcing one large client hydration root even though theming is hard-forced to dark (`forcedTheme="dark"`, `enableSystem={false}`) — the client cost buys no actual functionality.
- `components/areas/AreaPageShell.tsx` and `components/ReviewsList.tsx` are marked/behave as client-only-adjacent but contain no hooks/interactivity — candidates to simplify (ReviewsList currently has no `'use client'` directive and is fine as-is; verify no accidental client boundary is inherited).
- `LocationServicePage.tsx` imports `framer-motion` and `react-icons` **without** a `'use client'` directive — if ever wired into a route, it would fail to compile as a Server Component using client-only hooks.

### 3.8 Caching

```143:188:next.config.js
      { source: '/(sitemap\\.xml|api/sitemap\\.xml)', headers: [{ key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' }] },
      ...
      { source: '/services/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.webp', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
```

**🐛 Bug:** the `/services/:path*` rule matches **HTML routes** (e.g. `/services/birthday-decoration`), not just static assets under `public/services/`. Setting `max-age=31536000, immutable` on an HTML page means any CDN/browser that caches the response will serve stale content for a year after a content update, even after redeployment (unless the deployment platform bypasses this via versioned asset URLs — verify Vercel's behavior specifically for this pattern).

No `fetch()`-level caching strategy exists because there is no live external data fetching in the current build (the Google Reviews fetch path is dead code).

---

## 4. Accessibility

### 4.1 ARIA — Strengths

- `ContactForm.tsx`: `aria-invalid`, `aria-describedby`, `role="alert"` on errors, `role="status"` on success, `aria-busy` while submitting (lines ~151, 169–178, 318–319).
- `ReviewsList.tsx:25`: star ratings wrapped in `aria-label="{n} out of 5 stars"`.
- Navbar hamburger has `aria-label="Menu"` and `aria-expanded` (`components/Navbar.tsx:48-53`).
- Decorative SVGs/quote marks correctly use `aria-hidden` throughout (hero, footer, FAQ chevrons).

### 4.2 ARIA — Gaps

| Issue | File:Line |
|---|---|
| Hamburger button has no `aria-controls` linking it to the mobile panel; SVG icon lacks `aria-hidden` | `components/Navbar.tsx:48-58` |
| Mobile nav panel is a plain `<div>`, not `role="navigation"`/`role="dialog"` with an accessible name | `components/Navbar.tsx` |
| `Testimonials.tsx` stars use `aria-hidden` on each SVG but no parent `aria-label` (unlike `ReviewsList.tsx`) — screen readers get nothing | `components/Testimonials.tsx:53-64` |
| `home-testimonials.tsx` doesn't render star ratings at all, despite `rating` existing in the data | `components/home/home-testimonials.tsx` |
| Swiper prev/next buttons have no custom `aria-label` | `components/Testimonials.tsx` |
| `ImageModal.tsx` references `aria-describedby="gallery-modal-desc"` but **no element has that `id`** — broken reference | `components/ImageModal.tsx:95-98` |
| Gallery category cards are clickable `<div>`s with `tabIndex={0}` + `onKeyDown`, but no `role="button"` — ESLint's `jsx-a11y/no-static-element-interactions` rule appears disabled | `components/Gallery.tsx:63-74` |
| `ImageModal` grid thumbnails are `motion.div` with `onClick` only — not keyboard-operable | `components/ImageModal.tsx:146-152` |
| No skip-to-content link anywhere in the app shell | `app/layout.tsx` |
| Required form fields rely on native `required` + visual `*`, but not `aria-required="true"` | `components/ContactForm.tsx:162` |

### 4.3 Form Accessibility (`ContactForm.tsx`)

Strong overall: proper `<label htmlFor>`, per-field errors with `id` + `aria-describedby`, honeypot field with `aria-hidden`/`tabIndex={-1}`, Turnstile widget with `aria-label="Security verification"`.

Gaps: the `eventType` select's error message (lines ~236–251) has no `id`, so its `aria-invalid` isn't backed by a linked description; the Turnstile error message (lines ~303–306) isn't linked via `aria-describedby` either.

### 4.4 Keyboard Navigation & Modals

| Component | Escape closes? | Focus trap? | Keyboard-operable controls? |
|---|---|---|---|
| `ImageModal.tsx` | ✅ Yes | ❌ `focusTrapRef` declared but never used | Nav buttons ✅, grid thumbnails ❌ |
| `LocationGallery.tsx` modal | ❌ No | ❌ No | Close button ✅, backdrop click ❌ no keyboard equivalent, no `aria-labelledby` |
| Mobile nav menu | N/A | ❌ No trap, no focus return to hamburger on close | Links ✅ |
| FAQ accordions (`home-faq.tsx`, `FAQAccordion.tsx`) | N/A | N/A | ✅ Native `<details>/<summary>` |
| FAQ page (`FAQ.tsx`) | N/A | N/A | ✅ Headless UI `Disclosure.Button` renders as real `<button>` |

### 4.5 Semantic HTML

Generally solid: `<header>`/`<nav>` in Navbar, `<main>` in root layout, `<footer>` in Footer, `<section>` blocks with correct heading levels on the homepage, `<ul>/<li>` for service and testimonial lists, `html lang="en"`.

**Bug:** `app/not-found.tsx` renders its own `<main>` while `app/layout.tsx:49` already wraps `{children}` in `<main>` — this produces **two nested `<main>` landmarks** on the 404 page, which violates the "one main landmark" rule (and is one of the rules explicitly filtered out of the Axe test suite — see §4.7).

### 4.6 Color Contrast

Two separate token systems exist with an internal inconsistency:

```12:26:tailwind.config.js
        lux: {
          ...
          muted: '#2E2638',   // first definition
          ...
          muted: '#C9C2B8',   // duplicate key — silently overwrites the above
```

The second `muted` key wins in JS object literals, so `bg-lux-muted` and `text-lux-muted` both resolve to the tan color `#C9C2B8` — likely unintended if `#2E2638` was meant as a dark surface color anywhere.

**Estimated WCAG AA risk table** (against background `#0f0a12`):

| Foreground | Approx. ratio | Verdict |
|---|---|---|
| `#c8a96b` (gold) | ~7.5:1 | Pass |
| `#d4cdc3` / `#c9c2b8` (body/label text) | ~9–10:1 | Pass |
| `#a8a099` / `#9e968e` (muted/small text) | ~4.8–5.2:1 | Pass, borderline |
| `text-lux-gold/75` at ~10px uppercase (`app/(site)/locations/page.tsx:72`) | ~4.0–4.3:1 | **Likely fails AA** for normal text |
| `text-lux-gold/85` at ~10px (`app/services/page.tsx:116`) | ~4.5:1 | At-risk borderline |

Focus indicator is correctly implemented globally:

```51:54:app/globals.css
  *:focus-visible {
    outline: 1px solid var(--lux-gold);
    outline-offset: 2px;
  }
```

Minimum 44×44px tap target is enforced for most buttons, but explicitly disabled for `.lux-icon-btn` (`app/globals.css:56-61`) — the hamburger and modal close buttons may fall under 44px (measured ~40px).

### 4.7 Existing a11y Test Coverage (`tests/a11y.spec.ts`, `@axe-core/playwright`)

**Covered:** single-H1 check on homepage, gallery H1 + first-5-image alt check, locations-hub link text, 3-tab focus-visibility smoke test, contact-form label check, filtered Axe scan on `/`, `/gallery`, `/locations`, `/contact`.

**Explicitly filtered out of the Axe scan (i.e., known issues are being suppressed, not fixed):**

```92:114:tests/a11y.spec.ts
      const violations = results.violations.filter((v: any) => {
        if (v.id === 'color-contrast' && v.impact !== 'serious' && v.impact !== 'critical') {
          return false;
        }
        ...
        if (v.id === 'landmark-main-is-top-level' ||
            v.id === 'landmark-no-duplicate-main' ||
            v.id === 'landmark-unique') {
          return false;
        }
```

**Not covered at all:** `/pricing`, `/about`, `/services`, `/reviews`, `/faq`, any `/locations/[slug]` detail page, modal keyboard behavior, mobile menu, WhatsApp/phone CTA accessibility, form error/success states, Swiper controls.

---

## 5. UX Audit

### 5.1 Homepage Structure

```22:35:app/page.tsx
export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <LocalBusinessSchema />
      <HomeHero />
      <HomeServices />
      <HomeWhy />
      <HomeGalleryPreview />
      <HomeTestimonials />
      <HomeCta />
      <HomeContact />
      <HomeFaq />
    </>
  );
}
```

Flow is logical (hero → services → differentiation → visual proof → social proof → conversion → contact → objection handling), but:
- **Trust signals appear late** (section 5 of 8) and quantitative proof ("500+ events", "75+ five-star reviews") lives only on `/about`, never surfaced on the homepage.
- **No inline enquiry form on the homepage** — visitors must navigate to `/contact` or use WhatsApp/phone.
- **No pricing visibility or link** on the homepage despite a transparent, well-designed `/pricing` page existing.

### 5.2 Navigation

```9:17:components/Navbar.tsx
const NAV = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/locations', label: 'Locations' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;
```

Clean, service-oriented IA with a local-SEO-friendly `/locations` entry. **`/reviews` is missing** from both the nav and footer despite being a real, indexable page. Header is sticky/fixed with a blur backdrop; footer has brand, "Explore" links, and an "Enquire" column with phone/WhatsApp/contact-form links.

### 5.3 Mobile Responsiveness

Responsive patterns are used consistently (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `clamp()` typography, `flex-col sm:flex-row` CTA stacking). Specific risks:
- `.lux-icon-btn` is exempt from the 44px minimum tap-target rule — hamburger/close buttons risk being too small on mobile.
- There is **no persistent/sticky mobile WhatsApp or call button** on the live layout — a `CTAStickyBar` component exists but is only wired into unused generator-script output, not the live location page template.
- Gallery modal uses a 2-column grid on mobile, producing small thumbnail tap targets.

### 5.4 CTA Placement

Homepage CTAs are well distributed: hero (WhatsApp primary + Gallery secondary), services footer link, gallery-preview link, testimonials external Google-reviews link, a dedicated CTA band (WhatsApp + "Send an enquiry"), and a contact section with phone/WhatsApp. This repetition rhythm is good. The one structural gap is the missing persistent/sticky CTA noted above — currently users must scroll back up or down to find a conversion point rather than always having one visible.

### 5.5 Forms UX

`/contact` has a strong value-proposition header and a form with 5 required + 2 optional fields + Turnstile (7 total — moderate-to-high friction for a first-touch enquiry). Field order is Name → Phone → Email → Event type → Date → Budget → Message, which is reasonable for a phone-first Indian market. On success, the form **auto-opens a new WhatsApp tab** with the lead's details prefilled — a strong bridge to conversion but potentially surprising if the user isn't expecting a new tab.

### 5.6 Trust Signals

| Signal | Where shown | Gap |
|---|---|---|
| Testimonials | Homepage (no stars), `/reviews` (has stars) | Homepage cards don't render the `rating` field even though it exists in `fallbackTestimonials` data |
| "500+ Events", "75+ Five-Star Reviews", "25+ Areas Served" | `/about` only | Not surfaced on homepage at all |
| Google reviews link | Testimonials, `/reviews` | Verifiable, good — but external, not deep-linked to `/reviews` |
| Client logos | Not found anywhere | Missing entirely |
| Guarantee/warranty language | Not found | Missing |

### 5.7 Customer Journey

```
Landing (Hero) → Services/Gallery browse → Why Us → Testimonials (late) → CTA band → WhatsApp or /contact → FAQ
```

Friction points identified: no sticky conversion CTA while scrolling; trust metrics buried on a separate page; form requires a full page navigation with no inline/homepage capture option; `/reviews` is hard to discover; pricing messaging is inconsistent between `FAQ.tsx` and `home-faq.tsx` (see §1.6) which could actively erode trust once a prospective customer notices the contradiction.

---

## 6. Conversion Rate Optimization

### 6.1 WhatsApp Flow

Central, consistent phone config:

```4:20:lib/contact.ts
export const PHONE_E164 = {
  primary: '918880544452',
  secondary: '919591232166',
};
...
  waUrl: (msg?: string) => {
    const base = `https://wa.me/${PHONE_E164.primary}`;
    if (!msg) return base;
    return `${base}?text=${encodeURIComponent(msg)}`;
  },
```

| Context | Pre-filled message? |
|---|---|
| Homepage hero CTA (`home-hero.tsx:43`) | ❌ No |
| Homepage CTA band (`home-cta.tsx:16`) | ❌ No |
| Footer (`Footer.tsx:70`) | ❌ No |
| Location pages | ✅ Yes, locality-specific |
| Decoration service pages | ✅ Yes, via `config.waPrefill` |
| Contact form success handoff | ✅ Yes, full lead details |

The homepage — the highest-traffic page — sends visitors to WhatsApp with a **blank chat window**, forcing them to type context from scratch. Location and service pages already prove the pattern works; it just isn't applied site-wide.

**No click tracking on WhatsApp links.** `data-gtm="click-whatsapp"` attributes exist only in the dead `components/Layout.tsx`. Live homepage/footer/hero WhatsApp `<a>` tags have no `onClick`, no `data-gtm`, no `gtag('event', ...)` call — meaning the single most important conversion action on the site (WhatsApp click) is **completely unmeasured**, while form submissions *are* tracked (see §8.7). This is a major analytics blind spot for a WhatsApp-first business.

### 6.2 Contact Form CRO

Strengths: phone-first field order, specific button copy ("Submit enquiry" rather than generic "Submit"), strong value-proposition copy above the form, WhatsApp fallback always visible below the form, and a good post-submit bridge into WhatsApp with full context. Weakness: 7 total fields is on the high side for a first-touch B2C lead form; email being required (vs optional) adds friction in a market where phone/WhatsApp is the dominant channel.

### 6.3 Hero Section

```31:44:components/home/home-hero.tsx
        <p className="lux-eyebrow mb-5 md:mb-6">Bengaluru · Celebrations reimagined</p>
        <h1 ...>Where every celebration becomes a memory</h1>
        <p className="lux-body mt-7 md:mt-8 max-w-md">
          Immersive wedding, haldi, and engagement atmospheres — composed with editorial restraint.
        </p>
```

The single primary CTA (WhatsApp) with one non-competing secondary CTA ("View our work") is correct CRO practice. However, the H1 itself is emotional/poetic and doesn't state "decoration," "Bangalore," or a concrete value proposition — location context lives only in the small eyebrow text and image alt. There is **no trust signal above the fold** (no star rating, no "500+ events," no starting price) and no urgency/scarcity element.

### 6.4 Testimonials

Homepage testimonials render quotes only — no star ratings, despite `rating: 5` existing on every entry in `fallbackTestimonials`. `/reviews` page's `ReviewsList` does render stars correctly. `SimpleGoogleReviewsEmbed` displays a hardcoded "5.0 (50+ reviews)" string that isn't backed by a live API call — this is presented as fact but isn't verifiably live data.

### 6.5 Pricing Presentation

`/pricing` is a genuine CRO asset — transparent three-tier pricing with clear anchoring:

```14:34:app/pricing/page.tsx
const experiences = [
  { name: 'Intimate', price: '₹2,999+', ... },
  { name: 'Celebration', price: '₹7,999+', featured: true, ... },
  { name: 'Grand', price: '₹15,999+', ... },
] as const;
```

"Starting from" framing avoids locking in a price while still reducing quote-request anxiety, and the featured middle tier uses classic price-anchoring psychology. The problem is **discoverability**: this page is not linked from the homepage, so most visitors will never see it unless they proactively click "Pricing" in the nav.

### 6.6 CTA Effectiveness

Button copy across the site is specific and action-oriented ("WhatsApp for a quote", "Chat on WhatsApp", "Submit enquiry"), and visual contrast is strong (emerald gradient primary buttons on a dark background). The main gaps are the missing persistent/sticky CTA on scroll and the complete absence of urgency or scarcity messaging anywhere on the site (e.g., no "X dates already booked this month," no limited-availability framing).

---

## 7. Code Quality

### 7.1 TypeScript Configuration

```9:12:tsconfig.json
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
```

`strict: true` is good. Missing stricter opt-in flags: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`. `allowJs: true` permits untyped `.js` files into the compiled set. The build pipeline does **not** ignore TypeScript errors (`ignoreBuildErrors: false` in `next.config.js:26`) but **does** ignore ESLint (`ignoreDuringBuilds: true`, line 25) — meaning lint regressions can ship silently.

### 7.2 Loose Types / `any` Usage

Application runtime code is largely clean. Notable exceptions:

| File:Line | Issue |
|---|---|
| `components/ImageModal.tsx:11` | `images: any[]` — should be typed as `GalleryImage[]` from `utils/gallery`; this 289-line component loses type safety on its primary prop |
| `components/SeoHead.tsx:9,12` | `seo?: Record<string, any>`, `schemaMarkup?: any` — dead file, low priority |
| `components/Layout.tsx:9` | `seo?: Record<string, any>` — dead file |
| `lib/gtag.ts:5,8,10` | `(window as any).gtag`, `Record<string, any>` — common pattern for untyped globals; could use a `Window` interface augmentation instead |

No `any` usage found under `app/` — page-level code is cleanly typed. `@ts-ignore`/`@ts-expect-error` appear only in test files (`tests/feature.smoke.spec.ts:45`).

### 7.3 Large / Complex Components (300+ lines)

| File | Lines | Notes |
|---|---|---|
| `components/LocationServicePage.tsx` | 365 | Dead code |
| `components/ContactForm.tsx` | 344 | Legitimate complexity: validation, Turnstile, analytics, field-level state |
| `components/services/DecorationServicePage.tsx` | 323 | Single template serving 9 services — acceptable given reuse |
| `components/ImageModal.tsx` | 289 | Grid/fullsize views, keyboard nav, focus handling, framer-motion |
| `app/(site)/locations/[slug]/page.tsx` | ~272 | Inline hero/services/FAQ/landmarks/gallery — should be decomposed into the already-built `components/areas/*` primitives |
| `lib/services/decoration-service-pages.ts` | 548 | Data config, not UI — still a high-maintenance single file |

### 7.4 Prop Drilling / Context

No custom `createContext`/`useContext` usage found anywhere in application code — no prop-drilling smell. The architectural issue is the opposite: page-level monoliths (location page, `ImageModal`, `ContactForm`) that could be decomposed, plus an entire orphaned component library (`components/areas/*`) that was clearly built to solve this decomposition problem but never wired in.

### 7.5 Naming Convention Inconsistency

| Location | Convention |
|---|---|
| `components/home/*` | kebab-case (`home-testimonials.tsx`) |
| `components/lux/*`, `components/areas/*`, `components/services/*`, root `components/*` | PascalCase (`ContactForm.tsx`) |
| `components/seo/*` | Mixed (`JsonLd.tsx` vs `local-business-schema.tsx`) |

No enforced convention across the codebase. Import path style is also inconsistent — most files use the `@/` alias, but:

```16:16:app/(site)/locations/[slug]/page.tsx
import LocationGallery from '../../../../components/LocationGallery';
```

uses a relative path instead.

### 7.6 Summary Counts

| Metric | Count |
|---|---|
| Component files | 60 |
| Orphaned component files | ~20 |
| Orphaned `lib/data/*` + `lib/image.ts` | ~1,200 lines |
| App routes (`page.tsx`) | 19 |
| Dynamic location pages | 30 |
| npm scripts | 99 |
| Script files | 72 |
| Redundant script pairs identified | ~15 groups |
| Components over 300 lines | 4 (1 dead) |
| `any` usages in runtime components/lib | 6 sites |
| Placeholder gallery images | 4 (70–74 bytes) |
| Near-duplicate testimonial components | 3 active/legacy + 1 stub |
| Near-duplicate partner service route boilerplate | 7 pages, ~175 lines |

---

## 8. Analytics

| Tool | Status | Evidence |
|---|---|---|
| **Google Analytics (GA4)** | ✅ Implemented, conditional on `NEXT_PUBLIC_GA_ID` | `lib/gtag.ts`, loaded via `next/script` `strategy="lazyOnload"` in `app/layout.tsx:53-67` |
| **Google Tag Manager** | ❌ Not implemented | No `GTM-XXXX` container, no `gtm.js` loader anywhere. Only the GA4 `gtag.js` loader (also served from `googletagmanager.com`, easily confused with GTM but is not GTM) |
| **Meta / Facebook Pixel** | ⚠️ Coded but never loaded | `lib/analytics/conversion-events.ts` calls `fbq(...)` gated on `NEXT_PUBLIC_META_PIXEL_ID`, but no Pixel bootstrap script (`connect.facebook.net`, `fbevents.js`) exists anywhere, and the env var isn't even in `PUBLIC_ENV_SPEC`. Setting the env var alone does nothing. |
| **Microsoft Clarity** | ❌ Not found | No `clarity.ms` references anywhere |

**GA4 implementation detail:**

```1:11:lib/gtag.ts
export const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID || '';
export const pageview = (url: string): void => {
  if (!GA_ID) return;
  (window as any).gtag?.('config', GA_ID, { page_path: url });
};
export const event = (name: string, params: Record<string, any> = {}): void => {
  if (!GA_ID) return;
  (window as any).gtag?.('event', name, params);
};
```

`pageview()` is exported but **never called anywhere** — client-side route changes in this App Router SPA are not tracked as virtual pageviews; only the initial page load fires `gtag('config', ...)`.

**Web Vitals → GA4 pipeline (implemented):** `components/WebVitalsReporter.tsx` lazily imports `lib/web-vitals-report.ts`, which collects CLS/FID/INP/LCP/TTFB via the `web-vitals` package and forwards them as GA4 custom events. This only works if `NEXT_PUBLIC_GA_ID` is actually set in the deployment environment.

**Sentry (@sentry/nextjs) — partially implemented, production-only:**

- `instrumentation.ts` loads `sentry.server.config.ts` / `sentry.edge.config.ts` server-side, production-only.
- `instrumentation-client.ts` lazily imports `sentry-client-init.ts` on router transition, production-only, gated on `NEXT_PUBLIC_SENTRY_DSN`.
- **Two separate client-init files exist with conflicting sample rates** — legacy `sentry.client.config.ts` (`tracesSampleRate: 0.1`) and the new `sentry-client-init.ts` (`tracesSampleRate: 1`, plus session replay). Both are present in the repo; only confirm which one is actually the live path before assuming Sentry client behavior.
- Sentry is **entirely disabled in development** — local errors are invisible to it, which is intentional (documented reason: avoids breaking dev client chunks) but worth knowing when debugging.
- Server uses `SENTRY_DSN`; client uses `NEXT_PUBLIC_SENTRY_DSN` — if only one is set in Vercel, coverage is split between server and client errors.

**Conversion/lead event tracking (`lib/analytics/conversion-events.ts`, consumed by `ContactForm.tsx`):**

| Event | GA4 | Meta | Google Ads |
|---|---|---|---|
| Form submit attempt | `generate_lead` (`submit_attempt`) | — | — |
| Form success | `generate_lead` (`submit_success`) | `Lead` (if Pixel ever loads) | `conversion` (if env vars + gtag present) |
| Form failure | `form_error` | — | — |

Google Ads conversion vars (`NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`) are referenced in code but **not validated** in `env/validation.ts`'s `PUBLIC_ENV_SPEC`.

**Business impact summary:**

| Gap | Impact |
|---|---|
| WhatsApp clicks untracked | Cannot measure the site's primary conversion action or attribute leads to specific pages/campaigns |
| No GTM | No trigger-based tracking or tag changes without code deploys |
| Meta Pixel not loaded | Paid social campaigns cannot optimize for or attribute conversions |
| No Clarity/session replay outside Sentry | No behavioral UX diagnostics (heatmaps, rage clicks) for CRO decisions |
| `pageview()` unused | Route changes under-counted in GA4 session/pageview metrics |

---

## 9. Security

### 9.1 Security Headers

Full CSP string (`next.config.js:5-18`):

```
default-src 'self'; img-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.jsdelivr.net https://browser.sentry-cdn.com https://static.elfsight.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https:; connect-src 'self' https: wss:; font-src 'self' https: data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; frame-src 'self' https://www.google.com https://challenges.cloudflare.com; form-action 'self'; upgrade-insecure-requests
```

| Header | Value | Prod only? |
|---|---|---|
| `Referrer-Policy` | `strict-origin-when-cross-origin` | No |
| `Permissions-Policy` | Blocks geolocation, camera, mic, payment, usb, sensors | No |
| `X-Frame-Options` | `DENY` | No |
| `Content-Security-Policy` | See above | ✅ Prod only (Report-Only elsewhere) |
| `X-Content-Type-Options` | `nosniff` | No |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | ✅ Prod only |

**CSP weaknesses:**

| Directive | Problem | Severity |
|---|---|---|
| `script-src ... 'unsafe-inline' 'unsafe-eval'` | Defeats the primary XSS mitigation CSP is meant to provide | High |
| `connect-src 'self' https: wss:` | Permits fetch/XHR/WebSocket to **any** HTTPS or WSS origin — if an XSS bug is ever introduced, data exfiltration to an attacker-controlled HTTPS endpoint would not be blocked | High |
| `style-src 'self' 'unsafe-inline' https:` | Any HTTPS stylesheet + inline styles allowed | Medium |
| `img-src ... https:` | Any HTTPS image host allowed | Low–Medium |
| No `report-uri`/`report-to` | `app/api/csp-report/route.ts` exists but the CSP header never references it, so violations are never actually reported anywhere | Low |

`middleware.ts` applies a separate, even looser CSP for local dev — irrelevant to production risk since middleware is disabled there (§3.6), but worth knowing if `FORCE_LOCAL_HEADERS=1` is ever set in a shared environment.

### 9.2 Environment Variable Validation

```1:6:app/env-guard.ts
import { assertValidEnv } from '@/env/validation';
if (process.env.NODE_ENV === 'production') {
  assertValidEnv();
}
```

Imported at the top of `app/layout.tsx` — enforced at production runtime startup. `assertValidEnv()` in `env/validation.ts` checks:
- `NEXT_PUBLIC_SITE_URL` is the **only** variable marked `requiredInProduction: true`.
- A `DANGEROUS_PUBLIC_SUFFIXES` list (`API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`, `PRIVATE`) flags any `NEXT_PUBLIC_*` variable whose name contains one of these substrings, with an explicit allow-list (`ALLOWED_PUBLIC_KEYS = new Set(['NEXT_PUBLIC_SENTRY_DSN'])`).
- A dedicated legacy check blocks `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` specifically (a real past incident, per `SECURITY_REMEDIATION_REPORT.md`).

**Gaps:**
- This is substring-based naming-convention linting, not a comprehensive secret-exposure firewall — a variable like `NEXT_PUBLIC_MY_INTERNAL_KEY` would slip through if it doesn't contain one of the exact dangerous suffixes... (it does contain `KEY`? No — the list is `API_KEY` specifically, not bare `KEY`, so a var like `NEXT_PUBLIC_STRIPE_KEY` would **not** be caught).
- Real production secrets referenced elsewhere in the codebase — `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`/`TOKEN`, `LEAD_WEBHOOK_SECRET` — are **not listed** in `SERVER_ENV_SPEC` at all, so misconfiguration of these won't fail startup validation.
- Validation only runs when `NODE_ENV === 'production'` — preview/staging deployments can run with a broken or insecure env configuration undetected.

### 9.3 Secrets & Git Hygiene

`.gitignore` correctly excludes all `.env*` variants except `.env.example`:

```15:31:.gitignore
.env
.env.*
!.env.example
.env.local
...
/env/.env
/env/.env.local
/env/.env.production
```

Confirmed via `git ls-files` that only `env/.env.example` is tracked. No live API keys, tokens, or credentials matching common patterns (`AIza…`, `sk_live_`, `ghp_`, `AKIA…`) were found in the current working tree.

**Historical risk:** `SECURITY_REMEDIATION_REPORT.md` documents a previously committed `.env.production` containing a real `GOOGLE_PLACES_API_KEY` and Vercel OIDC token. This has been remediated in the current tree, but **git history rewrite/purge of those old commits is flagged as a manual action that may still be pending** — if the repo is public or will become public, this needs verification.

**Weak default noted:**

```74:74:app/api/contact/route.ts
    const ipSalt = process.env.LEAD_IP_HASH_SALT || 'we-decor';
```

If `LEAD_IP_HASH_SALT` is unset in production, IP hashes for lead deduplication use a predictable, publicly-known salt — reduces the privacy value of hashing.

Automated protection exists: pre-commit hook runs `npm run verify:secrets`; CI workflow (`.github/workflows/secret-scan.yml`) runs Gitleaks plus the same script.

### 9.4 External Scripts vs CSP Cross-Reference

| Third party | Domain | CSP-allowed? | Actually active? |
|---|---|---|---|
| GA4 `gtag.js` | `www.googletagmanager.com` | ✅ | Yes, if `GA_ID` set |
| Cloudflare Turnstile | `challenges.cloudflare.com` | ✅ | Yes, if site key set |
| Elfsight | `static.elfsight.com` | ✅ | **No** — `/reviews` uses `SimpleGoogleReviewsEmbed`, not the Elfsight widget |
| Sentry | Bundled + `/monitoring` tunnel | ✅ (`browser.sentry-cdn.com` listed) | Yes, if DSN set, prod only |
| Google Fonts | Self-hosted via `next/font` | N/A, no runtime script | Yes |
| Cloudinary | `res.cloudinary.com` | N/A (`img-src https:`) | Yes, images only |

Domains that would be **blocked** if ever added without a CSP update: `connect.facebook.net` (Meta Pixel), `www.clarity.ms` (Microsoft Clarity) — consistent with neither being active today, but a heads-up for whoever implements the Analytics recommendations in §10.

### 9.5 API Route Exposure

Only 2 meaningful API routes exist:

**`/api/contact`** — well-secured:

| Control | Implementation |
|---|---|
| Input validation | Zod schema (`lib/services/leads/validators.ts`) with regex validation on name/phone |
| Rate limiting | `@upstash/ratelimit`, 5 requests / 15 min / IP, with in-memory fallback if Upstash env vars aren't configured |
| Origin check | `lib/security/origin.ts` |
| CAPTCHA | Cloudflare Turnstile, **fails closed** in production if `TURNSTILE_SECRET_KEY` is unset |
| Spam heuristics | Honeypot field, link-count check, keyword filter |
| Body size limit | 16 KB |
| Error responses | Structured JSON, no stack traces leaked |

**Caveat:** without `UPSTASH_REDIS_REST_URL`/`TOKEN` configured, rate limiting falls back to per-instance in-memory state — on a serverless platform with multiple concurrent instances, this is **effectively no rate limiting** at scale.

**`/api/csp-report`** — an unused stub:

```1:5:app/api/csp-report/route.ts
export async function POST() {
  return NextResponse.json({ ok: true });
}
```

Accepts any POST with no parsing, logging, or auth, and the CSP header doesn't even reference it as a report endpoint — dead code with negligible but nonzero attack surface (unauthenticated POST endpoint that does nothing).

No authenticated/admin endpoints exist under `app/api/` — minimal API attack surface overall.

---

## 10. Prioritized Improvements

Sorted by highest ROI first (business impact relative to effort).

| Priority | Area | Problem | Business Impact | Est. Effort | Recommended Solution |
|---|---|---|---|---|---|
| P0 | CRO/Analytics | WhatsApp link clicks are not tracked anywhere in live code (only form submissions are) | The site's primary conversion channel is completely invisible to analytics — cannot measure marketing ROI, A/B test CTAs, or attribute leads to pages/campaigns | 2–4 hrs | Add a shared `trackWhatsAppClick(source)` helper (mirroring `lib/analytics/conversion-events.ts`) and call it via `onClick` on every WhatsApp `<a>` (hero, CTA band, footer, location/service pages). Fire a GA4 `generate_lead` or custom `whatsapp_click` event with a `source` param |
| P0 | CRO | Homepage/footer WhatsApp links have no pre-filled message, while location/service pages already prove the pattern works | Every homepage visitor lands in a blank WhatsApp chat and must type context from scratch, causing avoidable drop-off at the final conversion step | 1–2 hrs | Apply `CONTACT.waUrl(message)` with a generic prefilled message (e.g. "Hi! I'd like a quote for event decoration.") to `home-hero.tsx`, `home-cta.tsx`, and `Footer.tsx` |
| P0 | SEO | Duplicate LocalBusiness JSON-LD + fabricated `aggregateRating` (5.0, 75 reviews) on homepage with no matching visible review markup | Google rich-result policy risk (fake ratings can trigger manual action/rich-result suppression); duplicate entities confuse crawlers about the canonical business entity | 1–2 hrs | Remove `components/seo/local-business-schema.tsx` from `app/page.tsx` (keep only `HomeJsonLd`'s `@graph`), or replace the hardcoded `aggregateRating` with a real value sourced from actual verified review data (or omit it entirely until live data exists) |
| P0 | SEO | Rendered page titles are double-branded ("... | We Decor | We Decor") on most pages because child titles already include the brand name on top of the root layout's `%s | We Decor` template | Cluttered, unprofessional-looking titles in search results and browser tabs hurt CTR across nearly every page on the site | 2–3 hrs | Either strip `| We Decor`/`| ${BUSINESS_NAME}` from all title strings passed into `pageMetadata()` and let the layout template add it once, or remove the `template` from `app/layout.tsx` and keep full titles inline — pick one pattern and apply site-wide |
| P0 | Security | CSP allows `'unsafe-inline'` and `'unsafe-eval'` in `script-src`, and `connect-src` permits any HTTPS/WSS origin | Materially weakens the primary browser-side XSS defense; if any injection vulnerability is ever introduced, exfiltration to attacker infrastructure would not be blocked | 1–2 days | Migrate inline `<script>` blocks (GA4 init, JSON-LD is fine as it's not executable) to nonce-based or hash-based CSP; audit and remove `'unsafe-eval'` if nothing actually requires `eval`/`Function()`; narrow `connect-src` to the specific domains actually used (GA, Sentry, Turnstile, Upstash) instead of blanket `https: wss:` |
| P1 | SEO | ~25 of 30 location pages use an identical templated meta description and hero copy skeleton; rich unique `bodyCopy`/`heroTagline` content already exists in `locations.generated.ts` but is never rendered | High duplicate-content/doorway-page risk across the local SEO location cluster — the exact investment (unique copy) needed to fix this already exists in the codebase and is simply unused | 1–2 days | Import and render `bodyCopy` and `heroTagline` from `app/(site)/_data/locations.generated.ts` inside `app/(site)/locations/[slug]/page.tsx`; write custom meta descriptions for the remaining ~25 areas following the pattern already used for the 5 completed ones |
| P1 | SEO | 8 pages (7 partner service pages + `/reviews`) reference OG image paths that don't exist on disk (`/images/reviews-og.jpg`, `/services/catering.jpg`, etc.) | Broken/blank social share previews when these pages are shared on WhatsApp, Facebook, LinkedIn, or Twitter — directly hurts organic social distribution and click-through | 2–4 hrs | Either generate/upload the missing 8 OG images at the referenced paths, or point `ogImage` at existing assets (e.g. reuse the relevant `/services/*.webp` files) in each page's `pageMetadata()` call |
| P1 | Analytics | No GTM, no live Meta Pixel (despite `fbq` calls already coded), no Microsoft Clarity | No trigger-based tag management without code deploys; paid Meta ad campaigns cannot attribute or optimize conversions; zero behavioral UX diagnostics (heatmaps/session replay) to inform CRO decisions | 1 day | Add Meta Pixel bootstrap script gated on `NEXT_PUBLIC_META_PIXEL_ID` (the event-firing code already exists in `lib/analytics/conversion-events.ts` — it just needs the loader script and CSP `script-src`/`connect-src` entries for `connect.facebook.net`); add Microsoft Clarity snippet with its own env var and CSP entry; evaluate whether GTM is worth adding given GA4 already covers current needs |
| P1 | UX/CRO | No persistent/sticky WhatsApp or call CTA while scrolling on the live site (a `CTAStickyBar` component exists but is unwired) | Conversion opportunity is lost for users who scroll past the CTA band and don't want to scroll back up — especially costly on long location/service pages | 4–6 hrs | Wire the existing `components/areas/CTAStickyBar.tsx` pattern (or build a lightweight equivalent) into `app/layout.tsx` as a mobile-visible fixed-bottom bar with WhatsApp + call actions, applied site-wide |
| P1 | UX/CRO | Homepage lacks trust signals (no stats, no star ratings on testimonials, no pricing link) that already exist elsewhere on the site (`/about`, `/pricing`) | Homepage — the highest-traffic page — under-leverages proof points that are proven to increase conversion, forcing interested visitors to hunt across multiple pages before they trust the brand enough to convert | 1 day | Add a compact stats strip ("500+ Events · 75+ Five-Star Reviews · 25+ Areas Served") near the hero or "Why Us" section; render `rating` as stars on `home-testimonials.tsx` cards; add a "From ₹2,999" link/teaser near the CTA band pointing to `/pricing` |
| P1 | Code Quality | ~20 orphaned components (~1,500 lines) and ~1,200 lines of orphaned `lib/data/*` modules exist with zero imports, including a fully-built `components/areas/*` library that was designed to replace the current 272-line inline location page | Ongoing maintenance tax — future engineers waste time reading/modifying dead code, and the existing decomposed component library that would fix the "large component" code-quality issue is sitting unused | 1–2 days | Delete confirmed-dead files listed in §1.5 after a final grep-based verification pass; alternatively, if `components/areas/*` is higher quality than the current inline page, refactor `app/(site)/locations/[slug]/page.tsx` to use it instead of deleting it |
| P2 | SEO | `/reviews` page has zero internal links from Navbar, Footer, or homepage — reachable only via sitemap | An entire indexable trust-focused page is nearly invisible to real users, wasting its SEO and conversion potential | 30 min | Add a "Reviews" link to `Navbar.tsx`'s `NAV` array and to `Footer.tsx`'s Explore column |
| P2 | SEO | `/faq` page has visible FAQ content but no `FAQPage` JSON-LD (unlike the homepage and location pages, which do have it) | Missed opportunity for FAQ rich results in search for a page whose entire purpose is answering searchable questions | 1–2 hrs | Reuse the existing `FAQJsonLd`/`buildFaqSchema` pattern already used on `home-faq.tsx` and location pages, applied to `/faq`'s question set |
| P2 | Code Quality | Two contradictory FAQ answers about pricing transparency exist between `components/FAQ.tsx` ("never pulled from a catalogue") and `components/home/home-faq.tsx` ("from ₹2,999") | If a prospective customer reads both pages, the contradiction directly damages trust in the brand at the exact moment they're evaluating whether to convert | 1 hr | Rewrite `FAQ.tsx`'s pricing answer to match the transparent, tiered messaging already used in `home-faq.tsx` and `/pricing` |
| P2 | Performance | `priority` prop is applied to below-the-fold images (`home-services.tsx`, `home-gallery-preview.tsx`) and to modal/overlay images that are never part of initial paint (`LocationGallery.tsx`, `ImageModal.tsx`) | Extra preloaded images compete with the true LCP image for bandwidth during the critical rendering path, worsening LCP/load performance especially on mobile/slow connections | 1–2 hrs | Remove `priority` from all four listed locations; only the true hero image (`home-hero.tsx`) and, optionally, the first above-the-fold gallery/services card should retain it |
| P2 | Performance | `next.config.js` applies `Cache-Control: public, max-age=31536000, immutable` to the `/services/:path*` route pattern, which matches HTML pages (e.g. `/services/birthday-decoration`), not just static image assets | Risk of serving stale HTML to users/CDNs for up to a year after a content update, even post-redeploy, depending on hosting-platform cache behavior | 30 min | Scope the immutable cache rule specifically to `/services/*.webp`/`.jpg`/`.png` (or move it under the existing `/:path*.webp` pattern) rather than the entire `/services/:path*` route tree |
| P2 | Accessibility | `ImageModal.tsx` and `LocationGallery.tsx` modals lack functional focus traps; `ImageModal` references a broken `aria-describedby` id; `LocationGallery` modal has no Escape-to-close handler | Keyboard and screen-reader users cannot reliably operate the gallery lightbox — a WCAG 2.1 AA compliance gap and real usability barrier for a visually-driven decoration business's core content | 4–6 hrs | Implement a focus trap using the existing but unused `focusTrapRef` in `ImageModal.tsx`; add an Escape keydown handler and `aria-labelledby` to `LocationGallery.tsx`'s modal; add the missing `id="gallery-modal-desc"` element |
| P2 | Analytics | `pageview()` in `lib/gtag.ts` is exported but never called; GA4 only registers the initial page load, not client-side App Router navigations | Understates real traffic/session data in GA4, skewing all downstream funnel and page-performance analysis | 2–3 hrs | Call `pageview(pathname)` from a small client component using `usePathname()` inside a `useEffect`, mounted once in `app/layout.tsx` alongside `WebVitalsReporter` |
| P3 | Code Quality | 99 npm scripts / 72 script files with ~15 groups of redundant/duplicate scripts (4 separate Lighthouse entry points, 3 bundle checks, 3 header verifiers, etc.) | High cognitive overhead for any engineer trying to find "the" correct command; increases risk of scripts silently drifting out of sync with each other | 2–3 days | Consolidate each redundant group to a single canonical script, update `package.json`, and delete the superseded files; keep `preflight` as the primary quality-gate entry point |
| P3 | Performance | `cloudinary` npm package is a dependency with zero runtime imports (only URL strings are used via `utils/gallery.ts`) | Unnecessary dependency weight in `node_modules`/install time and potential future confusion about whether the SDK is actually wired up | 15 min | Remove `cloudinary` from `package.json` dependencies if no server-side upload/transformation code needs it; confirm no build scripts under `scripts/` require it before removing |
| P3 | Accessibility | Two color-contrast risk spots (`text-lux-gold/75` and `/85` at ~10px) likely fail WCAG AA for normal-size text; a duplicate `muted` key in `tailwind.config.js` silently overwrites an intended dark-surface color with a light tan | Minor readability risk for low-vision users on two specific UI elements; the duplicate token bug could cause visually broken UI if `#2E2638` was intended as a background color anywhere it's currently used as `bg-lux-muted` | 2–3 hrs | Increase opacity or switch to a solid, higher-contrast token for the two flagged text instances; remove the duplicate `muted` key in `tailwind.config.js` and rename one of the two intended colors so both are addressable |
| P3 | Performance | 17 HEIC files (1.3–3.2 MB each, ~30+ MB total) and 4 broken 70-byte placeholder `.webp` files remain in `public/gallery/` | Unnecessary deploy artifact size/build time; the HEIC files are not even browser-servable so they serve no functional purpose in `public/` | 1 hr | Delete the 4 placeholder files (or replace with real images) and move/delete the 17 HEIC source files (convert to WebP first if the source images are still needed, otherwise remove from `public/` entirely — they don't belong in a web-served static directory) |
| P3 | SEO | `app/sitemap.ts` sets `lastModified: now` for every URL on every build, providing no real content-freshness signal | Minor — crawlers can't distinguish recently-updated pages from stable ones, slightly reducing crawl-scheduling efficiency | 2–3 hrs | Track a real `updatedAt` timestamp per content source (location data, service config) and pass it through instead of a blanket `now` |
| P3 | Code Quality | `Testimonials.tsx` (Swiper carousel) and its lazy-loading wrapper are fully coded but never imported anywhere, while `ReviewsList.tsx` duplicates similar card markup for the page that's actually live | Dead dependency (`swiper` + 3 CSS imports) shipped in the bundle graph if ever accidentally re-imported, plus duplicated maintenance surface between two testimonial card implementations | 3–4 hrs | Extract a single shared `ReviewCard` component used by both `ReviewsList` and (if kept) `Testimonials`; decide whether the Swiper carousel is still wanted anywhere — if not, delete `Testimonials.tsx`, `home-testimonials-lazy.tsx`, `home-testimonials-skeleton.tsx`, and the `swiper` dependency |

---

## Appendix: Positive Findings (Do Not Regress)

- Centralized `pageMetadata()` helper with absolute canonical URLs and a single `metadataBase` — a solid SEO foundation to build the P0/P1 fixes on top of.
- Dynamic `robots.ts` with correct preview-environment blocking (`disallow: '/'` when `isPreview`).
- `/areas/*` → `/locations/*` 301 redirect consolidation is clean and complete.
- Locality JSON-LD correctly avoids duplicate LocalBusiness entities by linking a `Service` schema to a shared `provider` reference — the pattern that should be applied to the homepage too.
- Strong `next/image` adoption: 15 usages, zero raw `<img>` tags, zero missing `alt` attributes.
- `next/font/google` configured correctly with `display: 'swap'` and minimal subsets.
- Middleware is a documented, intentional no-op in production — headers are applied via `next.config.js` instead, avoiding per-request middleware overhead.
- `/api/contact` is genuinely well-secured: Zod validation, rate limiting, origin checks, Turnstile with fail-closed behavior in production, honeypot, and safe error responses.
- `.env*` files are correctly gitignored, with automated pre-commit and CI secret scanning (Gitleaks + custom scanner) in place.
- `/pricing` page already implements strong CRO-aligned tiered pricing with anchoring — it just needs better internal linking to be seen.
- Existing Playwright + Axe accessibility test suite (`tests/a11y.spec.ts`) provides a foundation to extend rather than build from scratch.
