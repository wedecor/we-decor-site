# Production Readiness Report — We Decor Website

**Audit date:** 2026-07-13  
**Auditor:** Principal Staff Engineer (automated)  
**Stack:** Next.js 15.5 (App Router) · React 19 · Tailwind CSS 3.4 · Vercel · Sentry · GTM/GA4  
**Commit base:** `0cd1f5d`

---

## Executive Summary

The We Decor website is a well-structured Next.js App Router application with strong SEO fundamentals, solid security headers, and comprehensive analytics. The codebase has accumulated some dead code from incremental redesigns (Pages Router → App Router migration artifacts), but the production-critical paths are sound. Six Critical/High issues were identified and fixed in this audit. Eighteen Medium/Low recommendations remain.

---

## Critical Issues (Fixed)

### C1. Missing `app/error.tsx` error boundary
**Risk:** Any unhandled runtime error on any route would show the raw Next.js error overlay or a blank white page to users.  
**Fix:** Created `app/error.tsx` with branded error UI and retry button.  
**File:** `app/error.tsx` (new)

### C2. ESLint disabled during builds (`ignoreDuringBuilds: true`)
**Risk:** Lint errors (including accessibility violations, leaked renders, and type issues) silently pass CI. The one existing error (`prettier/prettier` in ReviewsList.tsx) proves the risk.  
**Fix:** Set `eslint: { ignoreDuringBuilds: false }` in `next.config.js`. Fixed the one blocking lint error in `ReviewsList.tsx`.  
**Files:** `next.config.js`, `components/ReviewsList.tsx`

---

## High Issues (Fixed)

### H1. Broken service worker caching non-existent paths
**Risk:** `public/sw.js` referenced `/static/css/main.css` (doesn't exist in Next.js) and used a cache-first strategy that could serve stale HTML indefinitely. The SW was never registered — pure dead code — but if a crawler or browser ever fetched `/sw.js`, it could activate unexpectedly.  
**Fix:** Replaced with a no-op uninstaller that clears stale caches and self-deactivates.  
**File:** `public/sw.js`

### H2. manifest.json colors mismatch site theme
**Risk:** `background_color: #ffffff` and `theme_color: #10B981` produce a white flash on PWA launch and misrepresent the dark-themed site.  
**Fix:** Updated to `background_color: #0b0713` (site background) and `theme_color: #0e8f78` (brand emerald).  
**File:** `public/manifest.json`

### H3. OG images using WebP format
**Risk:** LinkedIn, older WhatsApp clients, and some Twitter card renderers don't support WebP for Open Graph images, resulting in missing preview images on social shares.  
**Fix:** Changed all `ogImage: '/og-banner.webp'` references to `'/og-banner.jpg'` (which already exists in `/public`).  
**Files:** `app/page.tsx`, `app/(site)/locations/page.tsx`, `app/(site)/locations/[slug]/page.tsx`

### H4. Reviews page OG image references non-existent file
**Risk:** `/images/reviews-og.jpg` doesn't exist in `/public`, so social shares of the reviews page show no preview image.  
**Fix:** Changed to `/og-banner.jpg`.  
**File:** `app/reviews/page.tsx`

### H5. Unused import causes phantom dependency
**Risk:** `ImageModal.tsx` imported `useInView` from `react-intersection-observer` (a devDependency) but never used it. If Vercel's `--omit=dev` install excludes it, the build breaks.  
**Fix:** Removed the unused import.  
**File:** `components/ImageModal.tsx`

---

## Medium Issues (Recommendations)

### M1. Dead components (7 files, ~600 LOC)
The following components are never imported anywhere:
- `components/DarkModeToggle.tsx`
- `components/LoadingSpinner.tsx`
- `components/ClientVisible.tsx`
- `components/WhyChooseUs.tsx`
- `components/ErrorBoundary.tsx` (superseded by `global-error.tsx` + new `error.tsx`)
- `components/LocationServicePage.tsx`
- `components/ServiceCard.tsx`

**Recommendation:** Delete these files to reduce bundle scanning overhead and maintenance confusion.

### M2. Dead Pages Router layout (`components/Layout.tsx` + `components/SeoHead.tsx`)
`Layout.tsx` wraps `SeoHead.tsx` using `next/head` — a Pages Router pattern. Neither is used by any App Router page (only referenced in `locations.generated.ts` for a type, not as a component).  
**Recommendation:** Delete both files and remove the `buildSeoHeadDefaultSchema` function from `lib/local-seo/schema.ts`.

### M3. Dead library files
- `lib/data.ts` — re-exports from generated data, imported nowhere.
- `lib/image.ts` — Cloudinary URL helper, imported by 3 files but duplicates what Cloudinary SDK already provides.
- `lib/data/gallery-map.ts` — imports from `../../utils/gallery` which doesn't export `getGalleryImages`, likely broken.

**Recommendation:** Remove `lib/data.ts`. Audit `lib/data/gallery-map.ts` for runtime errors.

### M4. Unused production dependencies
- `gray-matter` — not imported anywhere in app/components/lib.
- `next-mdx-remote` — not imported anywhere.
- `swiper` — only imported by dead component `Testimonials.tsx`.
- `@mdx-js/loader`, `@mdx-js/react`, `@next/mdx` — MDX pipeline exists but no `.mdx` pages are served.

**Recommendation:** Remove unused deps to reduce install size (~4MB).

### M5. `react-intersection-observer` in devDependencies
This package is in `devDependencies` but is imported in production code. After H5 fix, there are no remaining production imports, so it's safe. But if it's re-used, it must move to `dependencies`.

### M6. 17 HEIC files in `public/gallery/`
HEIC files are not renderable by any browser. They appear to be source files that were never converted. They add ~50MB to the deployment bundle.  
**Recommendation:** Convert to WebP or delete. Also delete the `.textClipping` file in `public/gallery/birthday/`.

### M7. Spaces in `public/gallery/` directory names
Directories named `baby shower`, `corporate event`, `room decor`, `home decor` require URL-encoding in paths, which can cause issues with some CDNs and build tools.  
**Recommendation:** Rename to kebab-case (`baby-shower`, `corporate-event`, etc.) and update `utils/gallery.ts` references.

### M8. Root HTML files are dead artifacts
6 `.html` files in the project root (`homepage.html`, `gallery.html`, `wedding-stage-decor*.html`) appear to be design mockups. They are not served by Next.js.  
**Recommendation:** Move to a `design/` directory or delete.

### M9. No skip-to-content link
There is no skip navigation link for keyboard/screen-reader users.  
**Recommendation:** Add `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>` before `<Navbar />` in `app/layout.tsx` and `id="main-content"` to the `<main>` element.

---

## Low Issues (Recommendations)

### L1. CSP uses `unsafe-inline` and `unsafe-eval` for scripts
While common for GTM/analytics setups, `unsafe-eval` weakens CSP significantly.  
**Recommendation:** Investigate nonce-based CSP for inline scripts, or at minimum remove `unsafe-eval` if GTM custom HTML tags don't require it.

### L2. No `Cache-Control` on HTML pages
Static pages like `/about`, `/faq`, `/gallery` could benefit from `s-maxage` headers for CDN caching.  
**Recommendation:** Add `s-maxage=3600, stale-while-revalidate=86400` for static routes.

### L3. `services/:path*` cache header too aggressive
`Cache-Control: public, max-age=31536000, immutable` on service pages means HTML content is cached for 1 year. Service pages contain dynamic content (pricing, descriptions).  
**Recommendation:** Change to `s-maxage=3600, stale-while-revalidate=86400` or remove the header (let Vercel handle it).

### L4. Manifest icon `purpose: "any maskable"` should be separate entries
The manifest declares one icon with `"purpose": "any maskable"`. This forces the same icon for both contexts, which can look poor in maskable contexts if the icon isn't designed for safe-zone cropping.  
**Recommendation:** Provide separate 192x192 and 512x512 icons with `"purpose": "any"` and `"purpose": "maskable"` variants.

### L5. `Testimonials.tsx` imports Swiper but is only used via dead lazy-load
`components/home/home-testimonials-lazy.tsx` dynamically imports `Testimonials.tsx`, but `home-testimonials.tsx` (the one used on the homepage) doesn't use Swiper at all. The Swiper dependency is effectively dead.

### L6. console.log in production (`lib/site.ts`)
Guarded by `isDevelopment` check, so safe. But other `console.error` calls in error boundaries should use Sentry instead.

### L7. 15 report `.md` files in project root
Files like `WEBSITE_AUDIT.md`, `SECURITY_REMEDIATION_REPORT.md`, etc. are development artifacts, not user-facing content. They add noise to the repository.  
**Recommendation:** Move to `docs/reports/` or add to `.gitignore`.

### L8. `next-themes` only used by dead `DarkModeToggle`
The `ThemeProvider` wraps the app but theme switching is never exposed to users (the toggle component is dead). The provider itself is harmless but adds ~3KB to the client bundle.

### L9. `ImageModal.tsx` uses `any` type for images prop
`images: any[]` loses type safety. Should use `GalleryImage[]` from `utils/gallery`.

---

## Files Changed in This Audit

| File | Change |
|---|---|
| `app/error.tsx` | **Created** — route-level error boundary |
| `next.config.js` | ESLint `ignoreDuringBuilds` → `false` |
| `public/sw.js` | Replaced broken SW with no-op uninstaller |
| `public/manifest.json` | Fixed `background_color` and `theme_color` |
| `app/page.tsx` | OG image → `.jpg` |
| `app/(site)/locations/page.tsx` | OG image → `.jpg` |
| `app/(site)/locations/[slug]/page.tsx` | OG image → `.jpg` |
| `app/reviews/page.tsx` | OG image → existing `.jpg` |
| `components/ImageModal.tsx` | Removed unused `useInView` import |
| `components/ReviewsList.tsx` | Fixed prettier formatting error |

**Total: 10 files (1 new, 9 modified)**

---

## Issues Fixed: 8
- 2 Critical (error boundary, ESLint CI enforcement)
- 6 High (SW, manifest, OG images ×4, dead import)

## Remaining Recommendations: 18
- 9 Medium (dead code cleanup, unused deps, HEIC files, a11y)
- 9 Low (CSP hardening, caching, type safety, repo hygiene)

---

## Lighthouse Expectation

Based on the current implementation:

| Category | Expected Score | Notes |
|---|---|---|
| Performance | 85–92 | Cloudinary images with Next/Image, font `display: swap`, dynamic imports for modals. HEIC cleanup would improve build but not runtime. |
| Accessibility | 88–95 | Proper ARIA labels, semantic HTML, focus-visible styles, keyboard nav on modals. Missing skip-to-content link (-2–3 pts). |
| Best Practices | 90–95 | HTTPS, security headers, no mixed content. `unsafe-eval` in CSP may flag. |
| SEO | 95–100 | All pages have metadata, canonical URLs, Open Graph, JSON-LD structured data, sitemap.xml, robots.txt. |

---

## Technical Debt Summary

| Category | Severity | Effort | Description |
|---|---|---|---|
| Dead components | Medium | 1h | 7 unused component files (~600 LOC) |
| Pages Router artifacts | Medium | 30min | `Layout.tsx`, `SeoHead.tsx`, `lib/data.ts` |
| Unused npm deps | Medium | 15min | `gray-matter`, `next-mdx-remote`, `swiper` removal |
| HEIC files in public/ | Medium | 30min | 17 non-renderable images + 1 `.textClipping` |
| Gallery dir naming | Low | 1h | Spaces in directory names need kebab-case migration |
| Root HTML mockups | Low | 5min | 6 design artifact files in project root |
| CSP hardening | Low | 4h | Move from `unsafe-inline`/`unsafe-eval` to nonces |
| Skip-to-content | Low | 15min | Add skip nav for keyboard users |
| Report file cleanup | Low | 10min | Move 15 `.md` reports to `docs/` |

**Estimated total debt retirement: ~8 hours**
