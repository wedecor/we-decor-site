# SEO / GEO Implementation Report — We Decor Events

Date: 8 Nov 2026. Repo: `wedecorwebsite` (Next.js 15.5 App Router, Vercel).
State: **all changes are uncommitted in the working tree.** Nothing was
pushed, deployed, or changed in Vercel, DNS, Cloudflare or Google Business
Profile. No dependency was added, upgraded or removed. No env file or
secret was touched. No URL changed.

Status vocabulary used throughout: VERIFIED (checked, already correct) ·
FIXED (changed and validated) · NEEDS OWNER ACTION · NEEDS EXTERNAL
VERIFICATION · NOT APPLICABLE.

Companion documents: `SEO_GEO_AUDIT.md` (findings 3.1–3.16),
`SERVICE_PAGE_AUDIT.md`, `LOCALITY_PAGE_AUDIT.md`,
`GOOGLE_BUSINESS_PROFILE_AUDIT.md`, `AI_SEARCH_MEASUREMENT.md`,
`SEO_VALIDATION_REPORT.md`.

---

## 1. Executive summary

The site was already technically sound at the crawl layer: valid
robots.txt with AI crawlers allowed, a clean 90-URL sitemap with every URL
returning 200, self-referencing canonicals, server-rendered content, a
`@graph` JSON-LD architecture with stable `@id`s, honest image attribution,
and an internal-link structure with no orphans. The work therefore went into
**integrity and consistency**, which is what Google and AI answer engines
reward and what the site was quietly losing:

1. A recent commit had replaced 341 hand-written locality FAQs with the
   same six questions on all 50 pages — the doorway-page pattern. Restored.
2. 150 landmark cards claimed “we regularly set up celebrations near
   {landmark}” by template. Reworded to a true statement.
3. The business entity (`/#localbusiness`) was defined only on the
   homepage; the other 87 indexable pages referenced an `@id` that did not
   exist on that page.
   Every page now carries a compact, rating-free definition.
4. The balloon service page priced itself at ₹5,000 while the rest of the
   site said ₹3,000, and the Service schema emitted a “₹15,999+” ceiling
   that was never published. Aligned to one figure; invented ceiling removed.
5. The `llms.txt` feeds contained promotional claims (“premier”, “verified
   reviews”, “100% in-house”, “45–60 minute dispatch”). Reduced to the
   verified-claims vocabulary.
6. Sitemap listed two plain-text AI feeds as landing pages; About title
   doubled the brand; one blog title/description overran limits; root
   fallback title was weak. Fixed.
7. 134 unit tests were added that load the real page modules and fail on
   any regression of the above. Against the previous code, 94 of them fail.

Validation: typecheck 0, lint 0, vitest 552/552, `next build` exit 0 (97
pages), Playwright 27/27. Details in `SEO_VALIDATION_REPORT.md`.

What this does not do: promise rankings, AI citations, or map-pack
placement. The non-brand gap is the map pack, and the map pack is won on
GBP (see §11 owner actions).

---

## 2. Initial problems found (summary — detail in `SEO_GEO_AUDIT.md` §3)

| #    | Problem                                                                                           | Severity                                                           | Status                      |
| ---- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------- |
| 3.1  | Templated locality FAQs (6 × 50) replaced 341 unique ones                                         | High — scaled-content risk on the only performing non-home format  | FIXED                       |
| 3.2  | Unverifiable “regularly set up near {landmark}” ×150                                              | High — fabricated past work                                        | FIXED                       |
| 3.3  | Business entity undefined on 87/88 indexable pages                                                | Medium — AI crawlers reading a page alone see a dangling reference | FIXED                       |
| 3.16 | Balloon page ₹5,000 vs site ₹3,000; invented `priceRange` ceiling; home-decoration Offer mismatch | Medium — conflicting prices                                        | FIXED                       |
| 3.2b | Promotional / unverifiable claims in `llms.txt`, `llms-full.txt`                                  | Medium                                                             | FIXED                       |
| 3.4  | `/llms.txt`, `/llms-full.txt` in sitemap                                                          | Low                                                                | FIXED                       |
| 3.5  | `/about` title → “About We Decor — … \| We Decor”                                                 | Low                                                                | FIXED                       |
| 3.6  | Blog title 91 chars, description 189 chars                                                        | Low                                                                | FIXED                       |
| 3.7  | Root fallback title                                                                               | Low                                                                | FIXED                       |
| 3.8  | Local lint failing on 2,526 third-party plugin files (`.cursor/`, `.claude/`)                     | Dev-only                                                           | FIXED                       |
| 3.9  | 41/50 locality taglines “Top-Rated Event Decorators in {Area}”                                    | Medium — superlative by template                                   | NEEDS OWNER ACTION          |
| 3.10 | Car decoration page has zero photographs; proposal has 3                                          | Medium                                                             | NEEDS OWNER ACTION          |
| 3.11 | Dead `gallery` config with wrong captions (never rendered)                                        | None (dead code)                                                   | NOT APPLICABLE              |
| 3.12 | Homepage canonical without trailing slash                                                         | None                                                               | NOT APPLICABLE              |
| 3.13 | Hours (24h) and geo in schema vs GBP                                                              | Unknown                                                            | NEEDS EXTERNAL VERIFICATION |
| 3.14 | `GOOGLE_REVIEW_COUNT` drift                                                                       | Recurring                                                          | NEEDS OWNER ACTION          |
| 3.15 | Vercel firewall vs AI crawlers                                                                    | Unknown                                                            | NEEDS EXTERNAL VERIFICATION |

---

## 3. Files modified (16)

| File                                        | Change                                                                                                                                                                       | Rollback impact                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `app/(site)/_data/faqs.ts`                  | Restored 341 unique per-area FAQs from `c4178a2^` verbatim (replaces 6-question template)                                                                                    | reverting reintroduces doorway FAQs                   |
| `app/(site)/locations/[slug]/page.tsx`      | Landmark card copy → “Homes and venues around {landmark} are within our {Area} service area”; explanatory comment                                                            | independent                                           |
| `app/about/page.tsx`                        | Title → “About Us — Event Decorators in Bangalore Since 2022” (brand suffix added once by `withBrandTitle`)                                                                  | independent                                           |
| `app/layout.tsx`                            | Fallback `title.default` → “Event Decorators in Bangalore \| We Decor”                                                                                                       | independent                                           |
| `app/llms.txt/route.ts`                     | “verified” removed; hours line factual; gallery count from `WORK.length`; balloon ₹3,000                                                                                     | independent                                           |
| `app/llms-full.txt/route.ts`                | “premier”/“verified”/“100% in-house”/“45–60 minute”/“rapid same-day” claims removed; balloon ₹3,000 row + pricing bullet                                                     | independent                                           |
| `app/sitemap.ts`                            | Removed `/llms.txt`, `/llms-full.txt`; comment                                                                                                                               | independent (sitemap test expects it)                 |
| `eslint.config.js`                          | `ignores` += `.cursor/**`, `.claude/**`                                                                                                                                      | dev-only                                              |
| `lib/content/blog-posts.ts`                 | One post: title 91→64 chars, description 189→166                                                                                                                             | independent                                           |
| `lib/content/site-faq.ts`                   | 8 high-intent FAQs appended to `SITE_FAQS` (haldi cost, birthday cost, home haldi, lead time, fresh flowers, same/next-day, rain, advance). `HOME_PAGE_FAQS` unchanged       | independent                                           |
| `lib/schema/_helpers.ts`                    | `buildBusinessReferenceNode()`, `buildWebsiteReferenceNode()`, `hasNodeWithId()`, `referencesId()`; `asGraph()` appends the compact nodes only when referenced-but-undefined | reverting restores dangling `@id`s; jsonld tests fail |
| `lib/schema/blog.ts`                        | `publisher` → `{ "@id": …/#localbusiness }` instead of an inline LocalBusiness copy                                                                                          | depends on `_helpers` change                          |
| `lib/schema/index.ts`                       | export the two new builders                                                                                                                                                  | —                                                     |
| `lib/schema/service.ts`                     | `balloon-decoration`, `home-decoration` → ₹3,000 floor; `priceRange` removed from `Service`                                                                                  | independent (pricing test expects it)                 |
| `lib/seo.tsx`                               | Pure `serializeJsonLd()` extracted; `JsonLd` uses it (same output)                                                                                                           | —                                                     |
| `lib/services/high-intent-service-pages.ts` | Balloon title/description ₹5,000 → ₹3,000; “Fast setup” → “Free quote”                                                                                                       | independent                                           |

`git diff --stat`: 16 files, +1,084 / −717 (the FAQ restore is most of it).

## 4. New files (13)

| File                                        | Purpose                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/unit/seo/_routes.ts`                 | Route registry derived from real data (`DECORATION_SERVICE_SLUGS`, `AREAS`, `BLOG_POSTS`) + static pages; helpers                                                                                                                                                                                                                                                                                         |
| `tests/unit/seo/metadata.test.ts` (9)       | Brand once; title ≤ 90; description 50–170; unique titles/descriptions; canonical = `SITE_URL + path`; only `/thank-you` noindex; OG/Twitter = title; OG image absolute                                                                                                                                                                                                                                   |
| `tests/unit/seo/sitemap.test.ts` (11)       | No duplicates; https www; no trailing slash/query; every indexable route listed and nothing else; excludes noindex/redirect/api; valid non-future lastmod; robots advertises sitemap; `OAI-SearchBot` allowed; no disallow overlaps sitemap; `/_next/image` not blocked                                                                                                                                   |
| `tests/unit/seo/jsonld.test.ts` (96)        | Builds the graph for all 88 indexable pages: serializer escaping; one business `@id`; business defined with consistent NAP on every page; `AggregateRating` only on `/`; no `Review` nodes; every bare `@id` resolves; Service `provider` → business; one `WebPage` per page with canonical url; breadcrumb ends; FAQPage non-empty, no duplicate questions; locality FAQ answers not reused across areas |
| `tests/unit/seo/internal-links.test.ts` (7) | Every hard-coded internal href in `app/`, `components/`, `lib/` resolves to a live route or asset; no links into redirect-only URLs; related services ≥ 3, live, not self; nearby localities valid, reciprocal, no orphans; blog `relatedServiceHref` live                                                                                                                                                |
| `tests/unit/seo/images.test.ts` (8)         | Manifest alt ≥ 20 chars, locality only when verified, positive dimensions, no camera filenames; every service has photos except `KNOWN_EMPTY = ['car-decoration']`; every JSX image has `alt`; hero `Image` has `priority` and no `loading="lazy"`                                                                                                                                                        |
| `tests/unit/seo/pricing.test.ts` (3)        | Service title ↔ description ↔ `Offer` agree; only ₹2,500 / ₹3,000 / ₹5,000 advertised                                                                                                                                                                                                                                                                                                                     |
| `docs/SEO_GEO_AUDIT.md`                     | Full audit                                                                                                                                                                                                                                                                                                                                                                                                |
| `docs/SEO_IMPLEMENTATION_REPORT.md`         | This file                                                                                                                                                                                                                                                                                                                                                                                                 |
| `docs/SERVICE_PAGE_AUDIT.md`                | 17-page inventory and per-criterion status                                                                                                                                                                                                                                                                                                                                                                |
| `docs/LOCALITY_PAGE_AUDIT.md`               | 50-page inventory, findings, owner actions                                                                                                                                                                                                                                                                                                                                                                |
| `docs/GOOGLE_BUSINESS_PROFILE_AUDIT.md`     | NAP the site asserts; GBP checklist                                                                                                                                                                                                                                                                                                                                                                       |
| `docs/AI_SEARCH_MEASUREMENT.md`             | 12-query monthly benchmark; GA4 AI channel setup                                                                                                                                                                                                                                                                                                                                                          |

No temporary files remain in the repository. Pre-existing untracked files
belonging to the owner (`GALLERY_PROMPT.md`, `IMPECCABLE_PROMPT.md`,
`PRODUCT.md`, `scratch/`, `scripts/sulekha-*.mts`, `scripts/save-captcha.mts`,
all dated 22 Oct – 6 Nov) were not touched.

---

## 5. SEO improvements by area

### 5.1 Structured data

| Item                                                                                                                                | Status                                  | Evidence                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Business entity `/#localbusiness` defined on every page (compact: name, url, telephone, email, logo, image, address; **no** rating) | FIXED                                   | built `/locations/whitefield` → `LocalBusiness ×1, WebSite ×1` in graph; test “business node defined on every page”                        |
| `@id` kept as `/#localbusiness` rather than renaming to the suggested `/#business`                                                  | VERIFIED (decision)                     | existing id is consistent across all 88 pages and Google has indexed it; renaming would churn the entity with no benefit. Documented here. |
| `AggregateRating` only on `/`                                                                                                       | VERIFIED                                | test; built HTML                                                                                                                           |
| No `Review` nodes anywhere                                                                                                          | VERIFIED                                | test                                                                                                                                       |
| Blog `publisher` references the entity instead of duplicating it                                                                    | FIXED                                   | `lib/schema/blog.ts`                                                                                                                       |
| Service `Offer` floor equals advertised price; `priceRange` ceiling removed                                                         | FIXED                                   | built balloon page: `minPrice 3000`, no `priceRange`                                                                                       |
| Every bare `{ "@id" }` resolves within its page                                                                                     | FIXED                                   | test over 88 pages                                                                                                                         |
| One `WebPage` per page with `url` = canonical                                                                                       | VERIFIED                                | test                                                                                                                                       |
| `FAQPage` only where FAQs are visibly rendered                                                                                      | VERIFIED                                | locality + service + `/faq` render the same arrays                                                                                         |
| `BreadcrumbList` on every inner page                                                                                                | VERIFIED                                | test                                                                                                                                       |
| JSON-LD serializer escapes `<` and `-->`                                                                                            | FIXED (pure function extracted, tested) | `lib/seo.tsx`                                                                                                                              |
| Rich Results Test on deployed pages                                                                                                 | NEEDS EXTERNAL VERIFICATION             | after deploy                                                                                                                               |

### 5.2 Metadata

| Item                                                    | Status                                                   |
| ------------------------------------------------------- | -------------------------------------------------------- |
| Unique title and description on all 88 indexable routes | VERIFIED (test)                                          |
| Brand appears once in every title                       | FIXED (`/about`), tested                                 |
| Title ≤ 90, description 50–170                          | FIXED (one blog post), tested                            |
| Canonical self-referencing on every page                | VERIFIED (test)                                          |
| OG/Twitter mirror title; OG image absolute              | VERIFIED (test)                                          |
| `/thank-you` noindex and not in sitemap                 | VERIFIED (test)                                          |
| Root fallback title                                     | FIXED                                                    |
| Locality snippets (rewritten 21 Oct)                    | VERIFIED — deliberately not touched; re-measure late Nov |

### 5.3 Robots and sitemap

| Item                                                                | Status                                 |
| ------------------------------------------------------------------- | -------------------------------------- |
| `OAI-SearchBot` allowed on `/`; `GPTBot` policy preserved (allowed) | VERIFIED (live + test)                 |
| `/api/`, `/admin/`, `/private/` disallowed; `/_next/image` open     | VERIFIED (test)                        |
| Sitemap lists exactly the indexable routes (88 after this change)   | FIXED (two text feeds removed), tested |
| Image sitemap advertised in robots                                  | VERIFIED                               |
| Sitemap resubmission in GSC / Bing                                  | NEEDS OWNER ACTION                     |

### 5.4 Service pages

See `SERVICE_PAGE_AUDIT.md`. Pricing consistency FIXED; entity node FIXED;
car/proposal photographs NEEDS OWNER ACTION; everything else VERIFIED.

### 5.5 Locality pages

See `LOCALITY_PAGE_AUDIT.md`. Unique FAQs FIXED; landmark claim FIXED;
entity node FIXED; 41 templated taglines NEEDS OWNER ACTION.

### 5.6 Images

| Item                                                                                          | Status             |
| --------------------------------------------------------------------------------------------- | ------------------ |
| 458 manifest photos with descriptive alt, true dimensions, verified-only locality attribution | VERIFIED (test)    |
| Hero image `priority`, never lazy                                                             | VERIFIED (test)    |
| Every JSX image has `alt`                                                                     | VERIFIED (test)    |
| Car decoration: 0 photos                                                                      | NEEDS OWNER ACTION |

### 5.7 Internal linking

| Item                                                                  | Status                                          |
| --------------------------------------------------------------------- | ----------------------------------------------- |
| Every hard-coded internal href resolves; none into redirect-only URLs | VERIFIED (test)                                 |
| Related services ≥ 3 per service page                                 | VERIFIED (test)                                 |
| Nearby localities reciprocal; no orphan locality                      | VERIFIED (test)                                 |
| Sitemap paths all have an inbound link                                | VERIFIED (existing `service-hub-links.test.ts`) |

### 5.8 FAQ / high-intent content

8 questions added to `/faq` using only the verified-claims vocabulary
(prices from `pricing-tiers.ts`, “often same or next day, subject to crew
availability”, “amount stated on the written quote”). FIXED. Homepage FAQ
set unchanged.

### 5.9 AI discoverability

Entity on every page (FIXED), factual `llms` feeds (FIXED), AI crawlers
allowed (VERIFIED), measurement plan delivered (`AI_SEARCH_MEASUREMENT.md`).
Vercel firewall reachability NEEDS EXTERNAL VERIFICATION. No claim is made
that any engine will recommend the business.

### 5.10 Analytics

VERIFIED, unchanged: GTM → GA4 production-only; `whatsapp_click`,
`phone_click`, `form_submit` (attempt/success/error), `generate_lead` only on
confirmed delivery then `/thank-you`, `quote_request`, `pricing_visit`,
`portfolio_image_click`. AI-referral channel group is a GA4 admin setting
(NEEDS OWNER ACTION, steps in `AI_SEARCH_MEASUREMENT.md` §3).

---

## 6. Tests executed

| Suite                                                     | Result                                                                                                                                               |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`                                       | exit 0                                                                                                                                               |
| `npm run lint`                                            | exit 0 (`--max-warnings=0`)                                                                                                                          |
| `npx vitest run`                                          | 26 files, **552/552** (418 before; +134 in `tests/unit/seo/`)                                                                                        |
| New tests against the _old_ code (source stashed)         | 94 fail — confirms they detect the fixed defects                                                                                                     |
| `npx playwright test --workers=2` on the production build | **27/27** (default parallelism: 3 `/gallery` `networkidle` timeouts from 226 concurrent remote image loads; pass in isolation; gallery not modified) |

## 7. Build results

`NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com npx next build` → exit 0,
compiled in 8.3 s, 97/97 static pages, 50 locality + 17 service HTML files
present. Without the inline env var the build fails at
`env/validation.ts` (`NEXT_PUBLIC_SITE_URL is required in production`) —
pre-existing, intentional, supplied by Vercel. Inspected built HTML for
`/`, `/services/balloon-decoration`, `/locations/whitefield`,
`/locations/jayanagar`, `/sitemap.xml`: see `SEO_VALIDATION_REPORT.md` §2.

## 8. Before / after

| Metric                                                                                            | Before                  | After                     |
| ------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------- |
| Locality FAQ questions, distinct across site                                                      | 6                       | 341                       |
| Pages where `/#localbusiness` is defined                                                          | 1                       | 88 (every indexable page) |
| Pages with unresolved `@id` references                                                            | 87                      | 0                         |
| Distinct starting prices for balloon decoration across site                                       | 2 (₹3,000 / ₹5,000)     | 1                         |
| Service schema nodes with unpublished `₹15,999+` ceiling                                          | 17                      | 0                         |
| Sitemap URLs                                                                                      | 90 (incl. 2 text feeds) | 88                        |
| Titles with brand twice                                                                           | 1                       | 0                         |
| Titles > 90 / descriptions > 170 chars                                                            | 1 / 1                   | 0 / 0                     |
| “We regularly set up celebrations near …” statements                                              | 150                     | 0                         |
| Unverifiable claims in `llms*.txt` (“premier”, “verified”, “100%”, “45–60 min”, “rapid same-day”) | 6                       | 0                         |
| High-intent FAQs on `/faq`                                                                        | 6                       | 14                        |
| SEO-specific unit tests                                                                           | 0                       | 134                       |
| Local lint errors                                                                                 | 2,526 (plugin files)    | 0                         |

Search Console / GA4 before-after cannot be stated until the change is
deployed and a window has passed. Baseline to compare against (18 Jul –
17 Oct 2026): 329 clicks, 16.5k impressions, 2.0% CTR, position 9.7.

## 9. Remaining issues

| Issue                                                 | Status                                               | Where                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 41 templated “Top-Rated…” taglines                    | NEEDS OWNER ACTION                                   | `content/locations/overrides.json` → `npm run locations:sync`                              |
| Car decoration 0 photos, proposal 3                   | NEEDS OWNER ACTION                                   | image library → regenerate `work-images.ts`; then drop `car-decoration` from `KNOWN_EMPTY` |
| Dead `gallery` / `GALLERY` config with wrong captions | NOT APPLICABLE (not rendered) — safe to delete later | `lib/services/decoration-service-pages.ts`                                                 |
| Hours 24h and geo pin vs GBP                          | NEEDS EXTERNAL VERIFICATION                          | `lib/local-seo/constants.ts`                                                               |
| `/locations/bangalore` zero impressions               | NEEDS EXTERNAL VERIFICATION (next window)            | consider 301 → `/locations` later                                                          |
| Vercel firewall vs AI crawlers                        | NEEDS EXTERNAL VERIFICATION                          | Vercel logs                                                                                |
| Playwright default-parallelism flake on `/gallery`    | pre-existing, environmental                          | consider `--workers=2` in CI or `waitUntil: 'load'` for that spec                          |

## 10. Decisions worth recording

- **Kept `@id` `/#localbusiness`** instead of the brief's suggested
  `/#business`: the existing id is used consistently on 88 pages and in
  Google's current index; renaming adds churn without benefit.
- **Did not rewrite locality snippets**: they were rewritten on 21 Oct 2026;
  the CTR data predates that. Re-measure first.
- **Did not change the 41 taglines**: owner-facing copy; a 41-line rewrite
  in someone else's voice is not an integrity fix.
- **Removed `priceRange` from `Service`** rather than correcting the ceiling:
  it is not a `Service` property and no upper price is published anywhere.
- **Restored FAQs verbatim from git** rather than writing new ones: the
  brief forbids invented detail, and the prior content was the owner's.

## 11. Owner actions (in priority order)

1. Review the diff — especially the FAQ restore (`app/(site)/_data/faqs.ts`)
   and the `/faq` additions — then commit and push. Vercel builds.
2. After deploy: Rich Results Test on `/`, `/services/balloon-decoration`,
   `/locations/whitefield`; resubmit `/sitemap.xml` in Search Console;
   request indexing for the four previously unlinked service pages if still
   “Discovered – not indexed”.
3. Run the GBP checklist (`GOOGLE_BUSINESS_PROFILE_AUDIT.md` §7): NAP,
   hours, services with the same prices as the site, categories, service
   areas. This is where the non-brand gap is.
4. Add the site to Bing Webmaster Tools; submit the sitemap.
5. Create the GA4 “AI Search” channel group
   (`AI_SEARCH_MEASUREMENT.md` §3) and run the first 12-query benchmark.
6. Check Vercel logs for `OAI-SearchBot` / `PerplexityBot` 200s.
7. Car-decoration photographs; then the 41 taglines.
8. Late Nov 2026: pull a fresh Search Console window and compare with the
   baseline before touching any snippet.

## 12. Rollback

Everything is uncommitted. Full rollback:
`git checkout -- . && git clean -fd docs/ tests/unit/seo/` (scoped so the
owner's pre-existing untracked files are untouched). Per-file rollback is
safe for every row in §3 marked “independent”; the `_helpers.ts` /
`blog.ts` pair and the `service.ts` / `pricing.test.ts` pair should move
together.
