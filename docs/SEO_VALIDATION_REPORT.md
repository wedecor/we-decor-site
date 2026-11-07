# SEO Validation Report — We Decor Events

Run date: 8 Nov 2026, on the working tree described in
`SEO_IMPLEMENTATION_REPORT.md`. Nothing has been committed, pushed or
deployed. Every result below was produced by actually running the command
named; where something could not be run, it says so.

## 1. Automated checks — all run locally

| Check                                            | Command                                                                           | Result                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TypeScript                                       | `npm run typecheck`                                                               | exit 0                                                                                                                                                                                                                                                                                                                                                                               |
| ESLint (`--max-warnings=0`)                      | `npm run lint`                                                                    | exit 0                                                                                                                                                                                                                                                                                                                                                                               |
| Unit tests                                       | `npx vitest run`                                                                  | **26 files, 552 tests, 552 passed** (baseline before this work: 418 tests; 134 added)                                                                                                                                                                                                                                                                                                |
| Production build                                 | `NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com npx next build`               | exit 0 — compiled, types checked, **97/97 static pages generated**; 50 locality + 17 service HTML files present in `.next/server/app`                                                                                                                                                                                                                                                |
| Production build without the env var             | `npx next build`                                                                  | exit 1: `NEXT_PUBLIC_SITE_URL is required in production` from `env/validation.ts`. Pre-existing and intentional — `.env.local` carries no production values; Vercel supplies them. Not a regression.                                                                                                                                                                                 |
| Playwright e2e (27 specs)                        | `npx playwright test --workers=2` against `next start -p 3001` on the fresh build | **27 passed**                                                                                                                                                                                                                                                                                                                                                                        |
| Playwright, first attempt at default parallelism | same, default workers                                                             | 24 passed, 3 timed out on `/gallery` `networkidle` (226 remote Cloudinary images loaded concurrently by several workers); all 3 pass in isolation and with `--workers=2`. Environmental, not a regression; the gallery was not modified. The Chromium binary for the pinned Playwright version was missing and was installed to `~/Library/Caches/ms-playwright` (outside the repo). |

Regression evidence: with the 16 source changes stashed and only the new
tests present, **94 of the new tests fail** against the previous code (FAQ
reuse across localities, dangling `@id`, sitemap listing text feeds, brand
doubled in the About title, pricing mismatch, etc.). They pass on the new
code. The tests detect the defects they were written for.

## 2. Built-output inspection (`.next/server/app/*.html`)

| Page                           | What was checked                                                                            | Result                                                                                                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/services/balloon-decoration` | `<title>`; Service `Offer.priceSpecification`; presence of `priceRange`; LocalBusiness node | Title “Balloon Decoration in Bangalore — Arches & Setups from ₹3,000 \| We Decor”; `minPrice: 3000, price: 3000`; no `priceRange`; `LocalBusiness @id …/#localbusiness`, phone `+918880544452`, **no** `aggregateRating` |
| `/locations/whitefield`        | node types in `@graph`                                                                      | `WebPage ×1, Service ×1, FAQPage ×1 (8 questions), LocalBusiness ×1, WebSite ×1, BreadcrumbList ×1` — entity node present                                                                                                |
| `/`                            | `aggregateRating`                                                                           | `4.9`, `82` — the only page that carries it                                                                                                                                                                              |
| `/locations/jayanagar`         | string “regularly set up”                                                                   | 0 occurrences in rendered HTML (survives only in a source comment)                                                                                                                                                       |
| `/sitemap.xml`                 | `<loc>` count                                                                               | **88** (production currently 90: the two `llms*.txt` entries are gone)                                                                                                                                                   |

## 3. Live production checks (read-only, 8 Nov 2026)

Production still runs the previous deploy; these confirm the starting state
and that nothing in this report depends on an assumption about it.

| Check                                     | Result                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /robots.txt`                         | 200, `text/plain`; `User-Agent: OAI-SearchBot` → `Allow: /`, `Disallow: /api/ /admin/ /private/`; sitemap lines for `/sitemap.xml` and `/image-sitemap` |
| `GET /sitemap.xml`                        | 200, 90 URLs (will be 88 after deploy)                                                                                                                  |
| All 90 sitemap URLs                       | fetched: **90 × 200** (earlier in this audit)                                                                                                           |
| `GET /llms.txt`                           | 200                                                                                                                                                     |
| Service-page internal links               | 36–40 unique internal hrefs (`/services/haldi-decoration` 40, `/services/car-decoration` 36)                                                            |
| Partner slugs (`/services/catering` etc.) | 301 → `/services` (earlier in this audit)                                                                                                               |
| Canonicals                                | self-referencing, `https://www.wedecorevents.com{path}`                                                                                                 |

## 4. Validation that could NOT be performed here — NEEDS EXTERNAL VERIFICATION

| Item                                                                         | Why not here                                                     | How the owner verifies                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Rich Results Test on the new JSON-LD                                  | tool needs a public URL; changes are not deployed                | after deploy: paste `https://www.wedecorevents.com/locations/whitefield` and `/services/balloon-decoration` into search.google.com/test/rich-results; expect LocalBusiness, FAQ, Breadcrumb detected, 0 errors |
| Schema.org validator                                                         | same                                                             | validator.schema.org on the same two URLs                                                                                                                                                                      |
| Search Console: sitemap resubmission                                         | requires GSC login                                               | Indexing → Sitemaps → resubmit `/sitemap.xml`; confirm “Success”, 88 discovered                                                                                                                                |
| Search Console: URL inspection of the four previously unlinked service pages | requires GSC login                                               | `home-decoration`, `terrace-decoration`, `nikah-decoration`, `car-decoration` → Request indexing if still “Discovered – not indexed”                                                                           |
| Bing Webmaster Tools                                                         | requires login                                                   | Import from GSC; submit sitemap                                                                                                                                                                                |
| AI crawler reachability through Vercel's firewall                            | dashboard-only setting; server logs not accessible from the repo | Vercel → project → Logs, filter `user-agent` contains `OAI-SearchBot` or `PerplexityBot`; expect 200s, not 403/429. Also Firewall → check no bot-challenge rule matches them                                   |
| PageSpeed / Core Web Vitals after deploy                                     | not deployed                                                     | pagespeed.web.dev on `/` mobile; LCP should remain unaffected (hero untouched; inner pages gain ~400 B of JSON-LD)                                                                                             |
| GBP consistency                                                              | no API, no authorisation                                         | checklist in `GOOGLE_BUSINESS_PROFILE_AUDIT.md` §7                                                                                                                                                             |

## 5. Rollback

All changes are uncommitted in the working tree. To discard everything:
`git checkout -- . && git clean -fd docs/ tests/unit/seo/` (that `clean` is
scoped so it does not touch the owner's pre-existing untracked files:
`GALLERY_PROMPT.md`, `IMPECCABLE_PROMPT.md`, `PRODUCT.md`, `scratch/`,
`scripts/sulekha-*.mts`, `scripts/save-captcha.mts`). To roll back a single
item after commit, each change is self-contained per file; see the
file-by-file table in `SEO_IMPLEMENTATION_REPORT.md`.

## 6. Verdict

Local validation is complete and green: typecheck, lint, 552 unit tests,
production build, 27 e2e specs. Deployment and all search-engine-side
confirmation remain with the owner and are listed in §4 with the exact
check to run for each.
