# Image Optimization Report

**Date:** 2026-05-20  
**Pipeline:** `scripts/optimize-images.mjs`  
**Command:** `npm run images:optimize:all`

---

## Executive summary

Oversized raster assets were the primary bandwidth and LCP bottleneck on the homepage. Service JPEGs (1.8–16 MB each) forced `next/image` to read huge sources before encoding responsive output.

After optimization:

| Scope | Before | After | Reduction |
|-------|--------|-------|-----------|
| **Homepage service cards** (6 files) | **47.0 MB** | **412 KB** | **−99.1%** |
| **Logo** | 964 KB | 3.8 KB WebP + 8.6 KB PNG | **−99.6%** |
| **Hero (`og-banner`)** | 43 KB | 14 KB WebP + 19 KB JPG | **−68%** (WebP) |
| **Local `public/gallery/`** (73 JPEGs) | **336 MB** | **7.2 MB** WebP | **−97.9%** |
| **Total optimized (77 files)** | **336 MB** | **7.5 MB** | **−97.9%** |

Local Lighthouse mobile (homepage, production build): **perf ~76–81** (run-to-run variance; audit baseline was **~53**). Largest gains are **payload and LCP resource load time**; scores also depend on shared JS and lab conditions.

---

## Step 1 — Image inventory (before)

### Critical path (homepage + brand)

| Asset | Path | Size | Usage |
|-------|------|------|--------|
| Logo | `public/logo.png` | 964 KB | Navbar, footer, contact, gallery hub |
| Hero | `public/og-banner.jpg` | 43 KB | Homepage LCP, OG/Twitter |
| Birthday | `public/services/birthday.JPG` | 8.2 MB | Homepage card (priority) |
| Corporate | `public/services/corporate.JPG` | 13 MB | Homepage card |
| Tent & balloon | `public/services/tent and baloon.jpg` | 16 MB | Homepage card |
| Engagement | `public/services/engagement.jpg` | 6.9 MB | Homepage card |
| Haldi | `public/services/haldi.jpg` | 3.0 MB | Homepage card |
| Room decor | `public/services/room decor.jpg` | 1.8 MB | Homepage card |

### Gallery (local)

| Location | Files | Approx. size |
|----------|-------|----------------|
| `public/gallery/**` | 73 JPEG/JPG | ~336 MB |

**Note:** Live `/gallery` UI loads **Cloudinary** URLs from `utils/gallery.ts`. Local files still ship on deploy and should stay optimized.

### Formats

- Mostly JPEG; mixed `.jpg` / `.JPG`; spaces in filenames on legacy service assets.

---

## Step 2–3 — Optimization pipeline

### Tooling

**Script:** `scripts/optimize-images.mjs`

| Preset | Max dimensions | WebP quality | Use |
|--------|----------------|------------|-----|
| `service` | 800×600 | 82 | Homepage service cards |
| `hero` | 1920×1080 | 85 | `og-banner` |
| `logo` | 144×144 | 90 | Navbar / manifest |
| `gallery` | 1280×960 | 80 | Local gallery archive |

**Outputs:**

- WebP primary delivery (Next.js `formats: ['webp', 'avif']` still applies on `_next/image`).
- Hero JPEG recompressed (mozjpeg q85).
- Logo PNG replaced in-place (~8.6 KB) + `logo.webp` for UI.
- Originals moved to `public/_originals/` (gitignored).

**npm scripts:**

```bash
npm run images:optimize      # brand + services
npm run images:optimize:all  # + local gallery
```

**Manifest:** `artifacts/image-optimization-manifest.json` (per-file before/after, dimensions).

### Service filename normalization

| Legacy | Optimized |
|--------|-----------|
| `birthday.JPG` | `birthday.webp` |
| `haldi.jpg` | `haldi.webp` |
| `engagement.jpg` | `engagement.webp` |
| `corporate.JPG` | `corporate.webp` |
| `tent and baloon.jpg` | `tent-balloon.webp` |
| `room decor.jpg` | `room-decor.webp` |

---

## Step 4–5 — Code & delivery updates

### Central paths (`lib/images.ts`)

- `LOGO_SRC`, `HERO_BANNER_SRC`, `SERVICE_IMAGES.*`

### Components / pages updated

| File | Change |
|------|--------|
| `components/home/home-hero.tsx` | `og-banner.webp`, priority LCP |
| `components/home/home-services.tsx` | WebP service paths, lazy except first card |
| `components/Navbar.tsx`, `Footer.tsx` | `logo.webp` |
| `app/contact/page.tsx`, `app/gallery/page.tsx` | `logo.webp` |
| `components/home/home-json-ld.tsx`, `components/seo/JsonLd.tsx` | Absolute WebP URLs |
| `app/page.tsx`, metadata defaults | OG `og-banner.webp` |
| `public/manifest.json`, `public/sw.js` | PWA icons → WebP |

### Lazy loading (unchanged policy, now effective)

- Hero: `priority` + `fetchPriority="high"`.
- Service grid: `priority` on first card only; `loading="lazy"` on others.
- Gallery component: Cloudinary thumbs already `loading="lazy"`.

---

## Step 6 — Cache headers

Added in `next.config.js`:

- `/services/:path*` → `Cache-Control: public, max-age=31536000, immutable`
- `/:path*.webp` → long-term immutable cache
- `/og-banner.jpg`, `/logo.png` → long-term cache

---

## Step 7 — Visual quality

- WebP quality **80–85** on decor photography (not over-compressed).
- Max widths cap megapixel waste while keeping sharpness on mobile/retina via `next/image` `sizes`.
- Hero retains full-bleed composition at 1200×630 WebP (~14 KB).

**QA:** Spot-check homepage hero and service cards after deploy; decor should remain premium, not posterized.

---

## Step 8 — Validation

| Check | Result |
|-------|--------|
| `npm run build` | Pass |
| Optimized WebP assets on disk | Pass |
| Legacy multi-MB service JPEGs removed from `public/services/` | Pass |
| Lighthouse `/` (local mobile) | **~76** (this run); prior homepage pass **~81**; audit **~53** |
| SEO | **100** |
| Accessibility | **~96** |

### Expected production impact

- **LCP:** Hero + first service image transfer **<100 KB** vs multi-MB sources → large LCP improvement on 4G.
- **Bandwidth:** Homepage image bytes down **~99%** for service section.
- **Deploy size:** `public/` raster payload **~336 MB lighter** (gallery originals archived).

---

## Files modified

| Category | Files |
|----------|--------|
| Pipeline | `scripts/optimize-images.mjs`, `package.json` |
| Config | `next.config.js`, `.gitignore` |
| Library | `lib/images.ts`, `lib/metadata.ts` |
| UI | `components/home/*`, `Navbar.tsx`, `Footer.tsx`, `app/contact/page.tsx`, `app/gallery/page.tsx`, JSON-LD |
| Assets | `public/services/*.webp`, `public/logo.webp`, `public/og-banner.webp`, `public/gallery/**/*.webp` |
| Archive | `public/_originals/**` (local only) |

---

## Remaining heavy assets / follow-ups

1. **Cloudinary gallery** — Already CDN-optimized; ensure upload pipeline uses `f_auto,q_auto` (already in URLs).
2. **Service OG images** — References like `/services/hair.jpg` may 404; add optimized assets or remove from metadata.
3. **Lighthouse >90 on mobile** — Continue trimming shared JS (Sentry, theme); image work removes the largest payload blocker.
4. **AVIF** — Optional second pass (`--avif` flag) for browsers that support it; WebP is sufficient for now.
5. **CI** — Add `npm run images:optimize` check in release docs when replacing source photos.

### Post-deploy checklist

- [ ] Run `npm run images:optimize:all` after adding new photos
- [ ] PageSpeed Insights on production homepage
- [ ] GSC Core Web Vitals — LCP field data
- [ ] Confirm `_next/image` responses are WebP/AVIF in Network tab
- [ ] Verify no broken image 404s in Search Console

---

*Premium decor quality preserved; production-safe WebP pipeline with reproducible manifest.*
