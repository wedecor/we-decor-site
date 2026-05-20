# Homepage Performance Optimization Report

**Date:** 2026-05-20  
**Scope:** Core Web Vitals — homepage (`/`)  
**Stack:** Next.js 15.5, React 19

---

## Executive summary

The homepage was fully client-rendered (`HomePageClient`) with **framer-motion**, **opacity-0 until hydration**, and heavy below-fold libraries (Swiper, Headless UI). That pattern inflated LCP and First Load JS.

The homepage is now a **Server Component** composition with a **priority LCP hero image**, CSS-only above-the-fold content, and **code-split** testimonials. Local Lighthouse mobile performance improved from audit baseline **~53 → ~81** (target **>85** is close; remaining gap is mostly shared layout JS and unoptimized source image files).

| Metric | Before (audit) | After (build + local LH) |
|--------|----------------|---------------------------|
| Mobile Lighthouse Performance | ~53 | **~81** |
| First Load JS (`/`) | ~311 kB | **~226 kB** (−27%) |
| Route-specific JS (`/`) | ~9.5 kB | **~3.0 kB** |
| LCP (audit) | ~5.5 s | **Hero image (expected <2.5s on prod CDN)** |
| SEO score | — | **100** (preserved JSON-LD) |

---

## Root causes identified

### 1. LCP blocked by client-only hero
- Hero text used `opacity-0` until `useEffect` set `mounted=true`.
- LCP element was effectively **invisible until JavaScript hydrated** → multi-second LCP.
- No hero image in viewport; text-only hero missed image-based LCP optimization.

### 2. Entire page was a client component
- `app/page.tsx` → `HomePageClient` pulled **framer-motion** into the critical path.
- **FAQ** (Headless UI) and **Testimonials** (Swiper + CSS) loaded on first paint.

### 3. Oversized service source assets
- `/public/services/*.jpg` range from **1.8 MB – 16 MB** per file.
- `next/image` optimizes output, but large sources still increase encode latency on first request.

### 4. Render / main-thread weight
- Navbar logo used `priority`, competing with LCP.
- GA + web-vitals loaded early (`afterInteractive` / side-effect import).
- Shared layout bundle ~217–218 kB (Navbar, theme, Sentry, etc.) applies to all routes.

---

## Changes implemented

### Architecture: server-first homepage

| Component | Type | Role |
|-----------|------|------|
| `app/page.tsx` | Server | Composes sections, metadata |
| `components/home/home-json-ld.tsx` | Server | LocalBusiness, Organization, WebSite JSON-LD |
| `components/home/home-hero.tsx` | Server | LCP hero with `og-banner.jpg`, `priority` + `fetchPriority="high"` |
| `components/home/home-services.tsx` | Server | Service grid; `priority` only first image, `loading="lazy"` for rest |
| `components/home/home-cta.tsx` | Server | CTA band |
| `components/home/home-contact.tsx` | Server | Contact cards |
| `components/home/home-faq.tsx` | Server | Native `<details>` + FAQPage JSON-LD (no Headless UI) |
| `components/home/home-testimonials-lazy.tsx` | Client | `dynamic()` Swiper testimonials, `ssr: false` |

**Removed:** `components/HomePageClient.tsx` (framer-motion, mounted fade-in, client JSON-LD).

### LCP optimization
- Hero uses **`/og-banner.jpg`** (43 KB source) as full-bleed `next/image` with `priority` and `fetchPriority="high"`.
- Text renders **immediately in HTML** (no hydration gate).
- Gradient overlay for contrast; accessible alt text.

### JavaScript reduction
- Eliminated **framer-motion** from homepage critical path.
- Replaced homepage **FAQ** with native `<details>` (zero FAQ JS on first load).
- **Testimonials** lazy-loaded in separate chunk (`swiper` not in initial homepage bundle).
- **Web Vitals** reporting deferred via `WebVitalsReporter` + dynamic `import('@/lib/web-vitals-report')`.

### Images
- Service cards: `quality={65}`, explicit `sizes`, lazy load except first card.
- Navbar logo: removed `priority` to avoid competing with hero LCP.

### Fonts
- Added **`next/font`** Inter with `display: 'swap'` in `app/layout.tsx`.

### Third-party scripts
- GA/gtag: `strategy="lazyOnload"` (was `afterInteractive`).

---

## Files modified

| File | Action |
|------|--------|
| `app/page.tsx` | Server composition + `og-banner` OG image |
| `app/layout.tsx` | `next/font`, lazy GA, WebVitalsReporter |
| `components/home/*` | **New** server home sections |
| `components/home/home-testimonials-lazy.tsx` | **New** client lazy boundary |
| `components/WebVitalsReporter.tsx` | **New** deferred vitals |
| `lib/web-vitals-report.ts` | **New** vitals module |
| `components/Navbar.tsx` | Remove logo `priority` |
| `components/HomePageClient.tsx` | **Deleted** |
| `app/_app-web-vitals.client.ts` | **Deleted** |

---

## Bundle analysis (production build)

```
Before:  ○ /    ~9.5 kB   ~311 kB First Load JS
After:   ○ /    ~3.0 kB   ~226 kB First Load JS
Shared:                      ~218 kB (layout, Navbar, theme, framework)
```

Homepage-specific JavaScript dropped sharply; total First Load JS reduced by **~85 kB**. Further gains require trimming **shared layout** dependencies (Sentry, theme provider) or route-level code splitting outside homepage scope.

---

## Core Web Vitals expectations

| Vital | Before | After (expected) |
|-------|--------|------------------|
| **LCP** | ~5.5s (text hidden until hydrate) | **<2.5s** with priority hero image on CDN |
| **INP/TBT** | High (motion + swiper + FAQ) | Lower (less sync JS on load) |
| **CLS** | Low–moderate | Stable skeleton for testimonials; fixed hero aspect via `min-h` |

Local Lighthouse (mobile, production build, `localhost:3010`):

```
/  → perf: 81, a11y: 96, bp: 93, seo: 100
```

---

## SEO & accessibility preserved

- All structured data retained (LocalBusiness, Organization, WebSite, FAQPage).
- Semantic HTML: `<section>`, `<article>`, `<h1>`–`<h3>`, `<details>/<summary>`.
- Hero image descriptive `alt`.
- `prefers-reduced-motion` global rules unchanged in `globals.css`.
- Canonical/metadata unchanged (`pageMetadata` on `/`).

---

## Remaining bottlenecks (recommended follow-ups)

1. **Compress `/public/services/*` sources** — run `npm run images:convert` or replace 8–16 MB JPEGs with WebP/AVIF under ~200 KB each. Largest win for service-grid LCP on slow networks.
2. **Optimize `/public/logo.png`** (964 KB) — resize to 72×72 WebP for navbar.
3. **Shared layout bundle (~218 kB)** — audit Sentry client bundle, consider `productionBrowserSourceMaps: false`, lazy theme toggle.
4. **Lighthouse >85** — after image compression + CDN, re-run `npm run verify:lighthouse` on production URL.
5. **Testimonials** — optional static SSR fallback (no Swiper) for SEO/crawlability of review text.

---

## Post-deploy validation checklist

- [ ] `npm run build` passes
- [ ] `npm run typecheck` passes
- [ ] Homepage shows hero image immediately (no flash of hidden text)
- [ ] View Source contains JSON-LD scripts
- [ ] `npm run test:smoke` — homepage title, canonical, CTAs
- [ ] Production Lighthouse mobile **≥85** performance
- [ ] CrUX / GSC CWV report LCP **<2.5s** after 28 days
- [ ] Run PageSpeed Insights on `https://www.wedecorevents.com/`

### Commands

```bash
npm run build
npm run typecheck
npm run start
LH_BASE=http://localhost:3000 npm run lh
```

---

*Production-safe optimizations only; no SEO regressions intended.*
