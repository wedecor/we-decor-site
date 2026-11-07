# SEO / GEO Audit — We Decor Events

Audit date: 8 Nov 2026. Repository at `6465ffc` (branch `main`), production
`https://www.wedecorevents.com` fetched live during the audit.

Status labels used throughout: **VERIFIED** (confirmed in code or on
production), **FIXED** (changed in this working tree and covered by a test),
**NEEDS OWNER ACTION** (requires an account or decision we do not have),
**NEEDS EXTERNAL VERIFICATION** (cannot be confirmed from code or a public
fetch), **NOT APPLICABLE**.

---

## 1. Current architecture — VERIFIED

| Item            | Finding                                                                                                                                                                                                                                                                                                                                        | Evidence                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Framework       | Next.js `^15.5.28`, React 19, TypeScript 5.9, App Router only                                                                                                                                                                                                                                                                                  | `package.json`; no `pages/` directory                          |
| Hosting         | Vercel (`server: Vercel` header on every production response)                                                                                                                                                                                                                                                                                  | `curl -I https://www.wedecorevents.com/`                       |
| Routing         | Static pages under `app/*/page.tsx`; dynamic `app/services/[slug]`, `app/(site)/locations/[slug]`, `app/blog/[slug]`, all with `generateStaticParams`                                                                                                                                                                                          | `app/` tree                                                    |
| URL policy      | `trailingSlash: false`; non-www → www 308; `*.vercel.app` → www 308 + `X-Robots-Tag: noindex`; HTTP → HTTPS 308                                                                                                                                                                                                                                | `next.config.js` `redirects()`/`headers()`; verified live      |
| Canonical host  | `SITE_URL` from `NEXT_PUBLIC_SITE_URL`, defaults to `https://www.wedecorevents.com`, trailing slash stripped                                                                                                                                                                                                                                   | `lib/site.ts`                                                  |
| Metadata        | One helper `pageMetadata()` sets absolute title, description, canonical, OG, Twitter, robots                                                                                                                                                                                                                                                   | `lib/metadata.ts`                                              |
| robots.txt      | Native metadata route `app/robots.ts`; no `public/robots.txt`; no middleware interference (middleware excludes `robots.txt`/`sitemap.xml`)                                                                                                                                                                                                     | `app/robots.ts`, `middleware.ts`                               |
| sitemap.xml     | Native `app/sitemap.ts`, generated from `INDEXABLE_SERVICE_PATHS`, `AREAS`, `BLOG_POSTS`                                                                                                                                                                                                                                                       | `app/sitemap.ts`                                               |
| Image sitemap   | `app/image-sitemap/route.ts` — 68 URLs, 1,048 `<image:loc>` entries from the `WORK` manifest                                                                                                                                                                                                                                                   | fetched live                                                   |
| JSON-LD         | Typed builders in `lib/schema/*`, one `@graph` per page, injected by `components/seo/SchemaScript.tsx` → `lib/seo.tsx`                                                                                                                                                                                                                         | code                                                           |
| Content sources | Services: `lib/services/decoration-service-pages.ts` (+ `high-intent-service-pages.ts`); localities: `content/locations/locations.csv` + `overrides.json` → generated `app/(site)/_data/locations.ts`; FAQs: `app/(site)/_data/faqs.ts`, `lib/content/site-faq.ts`; photos: `app/(site)/_data/work-images.ts` (generated manifest, 458 photos) | code                                                           |
| Analytics       | GTM `GTM-K46BR4ZT` → GA4, `lazyOnload`; IDs from Vercel env; disabled outside production                                                                                                                                                                                                                                                       | `components/analytics/GoogleTagManager.tsx`, `lib/analytics/*` |
| AI feeds        | `/llms.txt`, `/llms-full.txt` route handlers                                                                                                                                                                                                                                                                                                   | `app/llms.txt/route.ts`                                        |
| Git state       | Branch `main`, clean apart from untracked scratch files (`scratch/`, `*_PROMPT.md`, `scripts/sulekha-*.mts`) which were left untouched                                                                                                                                                                                                         | `git status`                                                   |

The two most recent commits (`c4178a2`, `6465ffc`, both 8 Nov 2026 03:37–03:45)
landed minutes before this audit and are relevant to several findings below.

---

## 2. Existing SEO implementation — VERIFIED

Already in place and working on production:

- Unique, intent-led titles and descriptions on every indexable page, brand
  appended once by `withBrandTitle`.
- Self-referencing canonicals on every page; sitemap and canonical agree.
- `robots.txt` allows `*`, `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`,
  `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`,
  `Applebot-Extended`; disallows `/api/`, `/admin/`, `/private/`; declares both
  sitemaps.
- All 90 sitemap URLs return HTTP 200 (checked individually), no duplicates,
  no redirecting URLs, `/thank-you` (noindex) excluded.
- Homepage graph: `LocalBusiness` (`/#localbusiness`) with NAP, geo, opening
  hours, `sameAs` (Instagram, Facebook, Justdial, WedEazzy, InstaVendor,
  Magicpin, ServicesCorpo, Google Maps place), `hasOfferCatalog`,
  `AggregateRating` 4.9/82, `WebSite`, `WebPage`, 8 core `Service` nodes,
  `FAQPage`, City/Place entities.
- Service pages: `WebPage` + `Service` (provider → `/#localbusiness`) +
  `FAQPage` + `BreadcrumbList`.
- Locality pages: `WebPage` + locality `Service` with 16-item `OfferCatalog` +
  `FAQPage` + `BreadcrumbList`.
- Blog: `BlogPosting` + `WebPage` + `BreadcrumbList`, `lastModified` in sitemap
  from real `datePublished`/`dateModified`.
- Breadcrumbs rendered visibly (`SiteBreadcrumbs`) from the same array that
  feeds the schema.
- Hero image is the only `priority` image on `/`; everything else lazy.
- Events for WhatsApp clicks, phone clicks, form submit/attempt/error,
  `generate_lead` on confirmed delivery, pricing-page view, portfolio image
  click.
- Tests already guard: locality snippet quality (`serp-metadata.test.ts`),
  services-hub inbound links (`service-hub-links.test.ts`), FAQ coverage,
  robots AI-bot allow-list.

This is a well-instrumented site. The problems below are mostly content
integrity and single-page machine-readability, not missing plumbing.

---

## 3. Findings

### 3.1 Templated locality FAQs reintroduced doorway pattern — FIXED

- **Files:** `app/(site)/_data/faqs.ts` (commit `c4178a2`)
- **Inspected:** All 50 locality FAQ sets; diffed against `c4178a2^`.
- **Evidence:** Each locality had the same six questions with the area name
  substituted (“Can you decorate apartment clubhouses and flats in {Area}?”,
  “Do you offer same-day or next-day event decoration in {Area}?” …) and the
  same answers, 300 near-identical Q&A pairs also emitted as `FAQPage`
  JSON-LD on 50 URLs. The file header still read “fully unique Q&A, no shared
  templates”. The existing duplicate-question test passed only because the
  area name differs in each question string. Before `c4178a2` the file held
  341 hand-written, locality-specific questions (5–8 per area) with no
  template.
- **Why it matters:** Google’s scaled-content and doorway guidance targets
  exactly this; locality pages are the only non-homepage format earning
  clicks (CLAUDE.md), so they carry the most risk.
- **Change:** Restored the pre-`c4178a2` unique FAQ sets. Moved the genuinely
  useful high-intent questions (haldi cost, birthday cost, home haldi, lead
  time, fresh flowers, same-day, rain, advance) **once** to
  `lib/content/site-faq.ts` (`/faq`) with answers drawn only from verified
  statements. New test `jsonld.test.ts › does not repeat one locality FAQ
answer across localities` normalises the area name out of each answer and
  fails on any repeat.
- **Priority:** High.

### 3.2 Unverifiable past-work claims by template — FIXED

- **Files:** `app/(site)/locations/[slug]/page.tsx` (landmark cards),
  `app/(site)/_data/faqs.ts` (templated answers), `app/llms-full.txt/route.ts`,
  `app/llms.txt/route.ts`
- **Evidence:** Every landmark card on every locality page read “We regularly
  set up celebrations near {landmark}” (150 cards). Templated FAQ answers said
  “We regularly style living rooms … across {Area}”. `llms-full.txt` said
  “100% In-House Execution (No Middlemen)”, “premier”, “Who is the best event
  decorator in JP Nagar … top-rated … 45–60 minute rapid setup arrival”, “We
  regularly style high-rise apartments (Prestige, Sobha, Brigade, Divyasree)”,
  “Same-day setups”, and a heading “Why AI Assistants & Search Engines
  Recommend We Decor”. `llms.txt` called reviews “verified”, hard-coded “458
  Real Event Photos”, and labelled hours “Same-day and next-day setups
  available”.
- **Why it matters:** The brief forbids fabricated project counts, venue
  claims and same-day guarantees; AI engines quote these feeds verbatim.
  CLAUDE.md’s verified-claims list is: 4.9★, 82 reviews, Bengaluru, since
  2022, free site visit, from ₹3,000, _often_ same or next day.
- **Change:** Landmark card now reads “Homes and venues around {landmark} are
  within our {Area} service area” (a service-area fact). FAQ template removed
  (3.1). llms feeds rewritten to the verified-claims vocabulary; photo count
  now computed from `WORK.length`; JP Nagar Q&A rewritten as a service-area
  answer.
- **Priority:** High.

### 3.3 Business entity undefined on 87 of 88 indexable pages — FIXED

- **Files:** `lib/schema/_helpers.ts`, `lib/schema/blog.ts`
- **Evidence:** Every non-home page referenced `{"@id": ".../#localbusiness"}`
  (as `about`, `provider`, `publisher`) and `{"@id": ".../#website"}`
  (`isPartOf`) but defined neither. Confirmed live on
  `/services/haldi-decoration` and `/locations/jayanagar`.
- **Why it matters:** Google resolves @ids across its index so rich results
  were unaffected, but an AI crawler reading a single locality page saw a
  provider with no name, phone or address. Entity consistency across pages is
  the main GEO lever this site can pull from code.
- **Change:** `asGraph()` now appends a compact `LocalBusiness` (name, url,
  telephone, email, logo, image, PostalAddress) and `WebSite` node when a
  graph references but does not define them. The homepage graph, which
  defines both fully, is untouched. The compact node carries **no**
  `AggregateRating` (CLAUDE.md rule). Blog `publisher` now references the same
  node instead of a second inline copy. Test: `jsonld.test.ts › defines the
business on every page that references it`, `every bare @id reference
resolves`.
- **Priority:** High.

### 3.4 Sitemap listed plain-text AI feeds — FIXED

- **File:** `app/sitemap.ts`
- **Evidence:** `/llms.txt` and `/llms-full.txt` were in `sitemap.xml` at
  priority 0.6.
- **Why it matters:** A sitemap nominates search results; `.txt` feeds are
  not landing pages and Bing in particular will index raw text. Discovery of
  `llms.txt` is by well-known path, not sitemap.
- **Change:** Removed. `sitemap.test.ts › lists nothing that is not a known
indexable HTML route` prevents recurrence.
- **Priority:** Medium.

### 3.5 `/about` title carried the brand twice — FIXED

- **File:** `app/about/page.tsx`
- **Evidence:** Rendered `About We Decor — Event Decorators in Bangalore | We
Decor`.
- **Change:** `About Us — Event Decorators in Bangalore Since 2022` (the “since
  2022” claim is in the verified list). Test: `metadata.test.ts › title
carrying the brand exactly once`.
- **Priority:** Low.

### 3.6 Blog post title 91 chars / description 189 chars — FIXED

- **File:** `lib/content/blog-posts.ts`
  (`home-decoration-ideas-bangalore-haldi-engagement-birthday`)
- **Change:** Title 67 chars, description 163 chars. Test: `metadata.test.ts`
  length guards (title ≤ 90, description 50–170).
- **Priority:** Low.

### 3.7 Root layout fallback title — FIXED

- **File:** `app/layout.tsx`
- **Evidence:** `We Decor - Event Decorations Services in Bangalore`
  (ungrammatical; only reaches error/not-found boundaries since every page
  sets an absolute title).
- **Change:** `Event Decorators in Bangalore | We Decor`.
- **Priority:** Low.

### 3.8 Local lint failed on third-party plugin files — FIXED

- **File:** `eslint.config.js`
- **Evidence:** `npm run lint` reported 2,526 errors, all in
  `.cursor/skills/impeccable/**` and `.claude/skills/impeccable/**`
  (gitignored, never deployed). Repository code was clean.
- **Change:** Added `.cursor/**` and `.claude/**` to `ignores`. Lint now exits
  0 locally as it does in CI.
- **Priority:** Low (developer experience; CI was unaffected).

### 3.9 Templated hero taglines on 41 locality pages — VERIFIED, NEEDS OWNER ACTION

- **File:** `content/locations/overrides.json` (→ `locations.ts`)
- **Evidence:** 41 of 50 areas have `heroTagline: "Top-Rated Event Decorators
in {Area}"`; 9 have hand-written taglines.
- **Why it matters:** Same-sentence-50-times is weak but not harmful on its
  own; “top-rated” is defensible from the 4.9★ profile but not per-area.
- **Recommendation:** Replace with one honest sentence per area over time in
  `overrides.json` (never in `locations.ts`), then `npm run locations:sync`.
  Not changed here: a rewrite of 41 taglines is a content decision for the
  owner, and swapping one template for another gains nothing.
- **Priority:** Low.

### 3.10 Car decoration page has no portfolio photographs — VERIFIED, NEEDS OWNER ACTION

- **Files:** `app/(site)/_data/work-images.ts`, `/services/car-decoration`
- **Evidence:** `workForService('car-decoration')` returns 0; the page renders
  no gallery section. Proposal has only 3 (via fallback occasions).
- **Recommendation:** Add real car-decoration photographs to the image library
  and regenerate the manifest. `images.test.ts` lists `car-decoration` as a
  known gap and will fail once photos exist so the entry can be removed.
- **Priority:** Medium (service exists on the site with a ₹2,500 price point
  and no visual proof).

### 3.11 Dead `gallery` captions with wrong localities — VERIFIED, NOT APPLICABLE

- **File:** `lib/services/decoration-service-pages.ts` lines 24–32
- **Evidence:** `GALLERY.birthday` caption “Birthday at home, Koramangala” is
  attached to a photo shot in HSR Layout; `GALLERY.tent` captions a birthday
  photo as a tent. **However** `config.gallery` is not rendered anywhere —
  `DecorationServicePage` uses `workForService()` with true alts.
- **Recommendation:** Delete the `gallery` field and `GALLERY` constant in a
  cleanup pass. Not changed here to keep the diff focused; no user-facing
  effect.

### 3.12 Homepage canonical without trailing slash — VERIFIED, NOT APPLICABLE

- `absoluteUrl('/')` returns `…com/` but Next emits
  `<link rel="canonical" href="https://www.wedecorevents.com">`; sitemap lists
  `…com/`. For the root path these are the same URL by RFC 3986; Google
  normalises them. No action.

### 3.13 Opening hours and geo coordinates — NEEDS EXTERNAL VERIFICATION

- `OPENING_HOURS` is 00:00–23:59 (comment: “GBP: Open 24 hours”); `GEO`
  latitude/longitude carry a comment pointing at the GBP pin. Both are
  plausible and documented, but only the owner can confirm against the live
  Business Profile. Not changed.

### 3.14 Review count drift — NEEDS OWNER ACTION (recurring)

- `GOOGLE_REVIEW_COUNT = 82` (synced `019d78a`). It appears in 50+
  descriptions, the homepage `AggregateRating` and both llms feeds. Re-check
  monthly against Places; `serp-metadata.test.ts` will flag descriptions that
  fall out of step.

### 3.15 Crawler access cannot be verified from robots.txt alone — NEEDS EXTERNAL VERIFICATION

- robots.txt returns 200 `text/plain`, allows `OAI-SearchBot`. Vercel edge
  returned 200 to a non-browser user agent during this audit, and there is no
  WAF/bot-challenge configuration in the repo. Whether Vercel’s account-level
  firewall or attack-challenge mode is enabled is visible only in the Vercel
  dashboard. See `docs/SEO_VALIDATION_REPORT.md` for the server-log check.

### 3.16 Balloon page priced at ₹5,000 while everything else said ₹3,000 — FIXED

- `lib/content/pricing-tiers.ts` sets `BALLOON_START_INR = 3000`; the pricing
  page, homepage trust strip, `/faq` and every locality FAQ that names a
  balloon price say ₹3,000. `/services/balloon-decoration` alone said “from ₹5,000” in
  its title and description, and its schema `Offer` carried a third figure.
  `/services/home-decoration` advertised ₹3,000 in its title while its
  `Offer` said ₹5,000. The Service schema also emitted
  `priceRange: "… - ₹15,999+"`, a ceiling never published anywhere.
- Fixed: balloon title/description → ₹3,000 (`high-intent-service-pages.ts`);
  `resolveStartingPriceInr` returns ₹3,000 for `balloon-decoration` and
  `home-decoration`; `priceRange` removed (not a `Service` property); both
  `llms` feeds updated. `tests/unit/seo/pricing.test.ts` now fails if any
  service page's title, description and `Offer` disagree, or if a figure
  other than ₹2,500 / ₹3,000 / ₹5,000 is advertised.

---

## 4. Duplicate metadata / canonical conflicts — VERIFIED CLEAN

`tests/unit/seo/metadata.test.ts` loads the real `metadata` of all 88
indexable routes (plus the noindex `/thank-you`): no duplicate titles, no duplicate descriptions, every
canonical equals `https://www.wedecorevents.com{path}`, OG/Twitter titles equal
the document title, OG image absolute on the canonical host, `/thank-you` the
only noindex page.

## 5. Crawlability — VERIFIED CLEAN

- No `Disallow` rule overlaps any sitemap URL (tested).
- `/_next/image` and `/_next/static` are not blocked.
- All important content (H1, service copy, FAQs, JSON-LD, internal links) is
  present in the server-rendered HTML — confirmed by inspecting raw production
  HTML without JavaScript (e.g. `/locations/jayanagar` is 250 KB of HTML with
  44 internal links and 4 JSON-LD node groups).
- Gallery grid is a client component but its data ships in the HTML payload
  and every photo is in the image sitemap.

## 6. Internal linking — VERIFIED, improved by tests

- Homepage links services and a rotating locality set; services hub links all
  17 service pages (guarded); every locality links 16 services, 5 nearby
  localities (reciprocal, no orphans — tested), pricing, gallery, reviews,
  contact; every service page links related services and a locality set;
  blog posts link to their service page.
- New `internal-links.test.ts` extracts every hard-coded internal path from
  `app/`, `components/`, `lib/` and fails on anything that is not a live route
  or a static asset, and on any link into a redirect-only URL.

## 7. Image discoverability — VERIFIED

- 458 manifest photos, all with ≥20-char descriptive alt, real dimensions,
  descriptive filenames; alt names a locality only when `areaSlug` is
  verified (tested). Image sitemap carries title/caption/geo per image.
- Served via Cloudinary `f_auto,q_auto` or local WebP; `next/image` with
  AVIF/WebP formats configured.

## 8. AI search discoverability — opportunities

Done in this pass: single-page entity completeness (3.3), honest llms feeds
(3.2), unique FAQ coverage (3.1). Remaining levers are off-repo: citations
on directories already in `sameAs`, consistent NAP on those profiles, and GBP
posts/photos (see `docs/GOOGLE_BUSINESS_PROFILE_AUDIT.md`).

## 9. Risks and dependencies

- Restoring the hand-written locality FAQs (3.1) reverts content from
  `c4178a2`. The revert is in the working tree only; the owner should review
  before committing.
- The compact entity node (3.3) adds ~400 bytes of JSON-LD to each inner page.
- `GOOGLE_REVIEW_COUNT` must be kept current; it is a factual claim repeated
  everywhere.

## 10. Implementation priorities

1. Commit and deploy the content-integrity fixes (3.1, 3.2) — they remove
   risk rather than add reach.
2. Deploy the entity node (3.3) and sitemap cleanup (3.4).
3. Owner: car-decoration photographs (3.10), GBP checklist, AI benchmark.
4. Later: replace templated taglines (3.9), delete dead `gallery` config
   (3.11).
