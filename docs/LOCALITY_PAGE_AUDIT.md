# Locality Page Audit — We Decor Events

Audit date: 8 Nov 2026. 50 locality pages under `/locations/{slug}` plus the
`/locations` hub. Data: `app/(site)/_data/locations.ts` (generated from
`content/locations/bangalore-areas.csv` + `content/locations/overrides.json`),
`app/(site)/_data/faqs.ts`, `app/(site)/_data/location-metadata.ts`,
`app/(site)/_data/work-images.ts`. Production HTML spot-checked on
`/locations/jayanagar`, `/locations/basavanagudi`, `/locations/whitefield`,
`/locations/gottigere`.

Search Console baseline (18 Jul – 17 Oct 2026, from CLAUDE.md): locality
pages are the only non-homepage format that earns clicks. Whitefield (22 km
out) is the best performer at 678 impressions / 11 clicks; Basavanagudi — the
home locality — had 299 impressions and **0 clicks**; JP Nagar, the second
base, had 14 impressions. Snippets were rewritten on 21 Oct 2026; do not
rewrite them again before a fresh measurement window (late Nov 2026).

## 1. What the template does

Every locality page renders, in order: breadcrumbs → H1 “Event decorators in
{Area}, Bengaluru” → tagline → call/WhatsApp CTAs → “Decorating celebrations
in {Area}” body copy (hand-written, from `bodyCopy`) → services grid linked to
service pages with locality anchors → area FAQ (`FAQPage` schema) → landmarks
→ photo gallery → “Explore more” (5 nearby localities + rotated service
links) → CTA band. Schema: `WebPage` + `LocalBusiness` areaServed subset +
`Service` list + `FAQPage` + `BreadcrumbList`, now also the compact business
entity node via `asGraph()`.

## 2. Inventory

Columns: local photos = images in the manifest whose `areaSlug` is this area
(a verified claim rule; photos are only attributed to an area when the shoot
location is known). FAQ = unique hand-written questions. Tagline: _unique_ =
hand-written in `overrides.json`; _templated_ = “Top-Rated Event Decorators in
{Area}”.

| Path                             | Local photos | FAQ | Tagline   | Nearby links | Meta |
| -------------------------------- | ------------ | --- | --------- | ------------ | ---- |
| /locations/bangalore (catch-all) | 0            | 8   | templated | 5            | yes  |
| /locations/koramangala           | 3            | 8   | unique    | 5            | yes  |
| /locations/whitefield            | 9            | 8   | unique    | 5            | yes  |
| /locations/indiranagar           | 0            | 8   | unique    | 5            | yes  |
| /locations/jayanagar             | 30           | 8   | unique    | 5            | yes  |
| /locations/hsr-layout            | 9            | 8   | unique    | 5            | yes  |
| /locations/rt-nagar              | 2            | 8   | templated | 5            | yes  |
| /locations/hebbal                | 12           | 8   | templated | 5            | yes  |
| /locations/electronic-city       | 12           | 8   | unique    | 5            | yes  |
| /locations/btm-layout            | 4            | 8   | templated | 5            | yes  |
| /locations/marathahalli          | 0            | 8   | unique    | 5            | yes  |
| /locations/bellandur             | 0            | 8   | unique    | 5            | yes  |
| /locations/sarjapur-road         | 4            | 8   | unique    | 5            | yes  |
| /locations/domlur                | 11           | 8   | templated | 5            | yes  |
| /locations/ulsoor                | 27           | 8   | templated | 5            | yes  |
| /locations/richmond-town         | 4            | 8   | templated | 5            | yes  |
| /locations/ashok-nagar           | 4            | 8   | templated | 5            | yes  |
| /locations/banashankari          | 0            | 8   | templated | 5            | yes  |
| /locations/basavanagudi          | 12           | 8   | templated | 5            | yes  |
| /locations/jp-nagar              | 11           | 8   | templated | 5            | yes  |
| /locations/bannerghatta-road     | 0            | 8   | templated | 5            | yes  |
| /locations/kanakapura-road       | 13           | 8   | templated | 5            | yes  |
| /locations/malleshwaram          | 8            | 8   | templated | 5            | yes  |
| /locations/rajajinagar           | 1            | 8   | templated | 5            | yes  |
| /locations/vijayanagar           | 8            | 8   | templated | 5            | yes  |
| /locations/yelahanka             | 0            | 8   | templated | 5            | yes  |
| /locations/sahakarnagar          | 4            | 8   | templated | 5            | yes  |
| /locations/mathikere             | 4            | 8   | templated | 5            | yes  |
| /locations/yeshwanthpur          | 4            | 8   | templated | 5            | yes  |
| /locations/peenya                | 0            | 8   | templated | 5            | yes  |
| /locations/hanumanthanagar       | 4            | 5   | templated | 5            | yes  |
| /locations/thyagarajanagar       | 0            | 5   | templated | 5            | yes  |
| /locations/puttenahalli          | 7            | 5   | templated | 5            | yes  |
| /locations/chamrajpet            | 0            | 5   | templated | 5            | yes  |
| /locations/isro-layout           | 4            | 5   | templated | 5            | yes  |
| /locations/wilson-garden         | 4            | 5   | templated | 5            | yes  |
| /locations/shanti-nagar          | 4            | 5   | templated | 5            | yes  |
| /locations/bilekahalli           | 0            | 5   | templated | 5            | yes  |
| /locations/girinagar             | 4            | 5   | templated | 5            | yes  |
| /locations/arekere               | 0            | 5   | templated | 5            | yes  |
| /locations/kumaraswamy-layout    | 0            | 5   | templated | 5            | yes  |
| /locations/padmanabhanagar       | 0            | 5   | templated | 5            | yes  |
| /locations/katriguppe            | 0            | 5   | templated | 5            | yes  |
| /locations/hulimavu              | 4            | 5   | templated | 5            | yes  |
| /locations/konanakunte           | 0            | 5   | templated | 5            | yes  |
| /locations/uttarahalli           | 8            | 5   | templated | 5            | yes  |
| /locations/vasanthapura          | 4            | 5   | templated | 5            | yes  |
| /locations/gottigere             | 15           | 5   | templated | 5            | yes  |
| /locations/begur                 | 0            | 5   | templated | 5            | yes  |
| /locations/nagarbhavi            | 8            | 5   | templated | 4            | yes  |

Totals: 50 pages, 341 unique FAQs, 19 areas with zero attributed photos
(gallery falls back to city-wide work and says so in the copy), 9 unique
taglines, 41 templated.

## 3. Findings

### 3.1 Templated FAQs had replaced the unique ones — FIXED

Commit `c4178a2` (“locality FAQ cleanup”) replaced the 341 hand-written
per-area FAQs with the same six questions on all 50 pages, differing only in
the area name. That is the textbook definition of doorway content and would
have undone the one locality asset the site has. Restored from
`c4178a2^` verbatim; `tests/unit/seo/jsonld.test.ts` now fails if any FAQ
answer is reused across areas once the area name is normalised.

### 3.2 Landmark card claimed regular work near every landmark — FIXED

“We regularly set up celebrations near {landmark}” was emitted for ~200
landmarks (150 across 50 areas). Not provable; now reads “Homes and venues around
{landmark} are within our {Area} service area”, which is simply true.

### 3.3 Photo attribution — VERIFIED

Only photos with a known shoot location carry an `areaSlug`. Pages with fewer
than six local photos pad with other-area work and say so (“Nearby work, if
shown, is captioned with where it was actually shot”). 19 areas have no local
photos and show the city-wide heading. No change needed; this is the honest
behaviour.

### 3.4 Taglines — NOT CHANGED, documented

41 of 50 taglines are “Top-Rated Event Decorators in {Area}”. 4.9★ / 82 Google
reviews supports “highly rated”; it does not support “top-rated in {Area}”
for areas the business has never worked in. This is owner-facing copy in
`content/locations/overrides.json` and a 41-line rewrite was out of scope for
an integrity pass without the owner's voice. Recommendation in §5.

### 3.5 Snippets — VERIFIED, do not touch

`location-metadata.ts`: 50 unique titles and descriptions, every description
leads with “Event decorators in {Area}”, carries the 4.9★ / 82 proof and an
offer, stays under 160 chars (`serp-metadata.test.ts`). These were rewritten
on 21 Oct 2026; CTR data before then measured the old copy.

### 3.6 Structured data — FIXED (entity node)

Each page emitted `WebPage`, an areaServed `LocalBusiness` reference,
`Service` nodes, `FAQPage`, `BreadcrumbList`. The `/#localbusiness` node they
all reference was defined only on the homepage; `asGraph()` now appends a
compact definition wherever the id is referenced but not defined, so an AI
crawler reading `/locations/whitefield` on its own sees name, address,
phone, logo and URL.

### 3.7 Internal linking — VERIFIED

Reciprocal nearby set (5 per page; Nagarbhavi 4 — its geographic neighbours
are limited) with varied anchor text; hub `/locations` lists all 50;
service pages link back to localities via `getServiceLocalitiesFor()`.
`internal-links.test.ts` fails if a nearby slug goes stale or orphans a page.

### 3.8 `/locations/bangalore` catch-all — NOT CHANGED

Zero impressions in the baseline. It duplicates the hub's intent. Keep for
now — it is linked, indexable and harmless — but if a future window still
shows nothing, 301 it to `/locations`.

### 3.9 Home-locality gap — NEEDS OWNER ACTION

Basavanagudi (the registered address) ranks and is not clicked; JP Nagar
(second base) barely appears. Neither problem is template-level. See §5.

## 4. Hreflang / language

Single-language site, `lang="en"`. No hreflang needed. NOT APPLICABLE.

## 5. Owner actions

1. **Rewrite the 41 templated taglines** in `content/locations/overrides.json`
   (then `npm run locations:sync`). One sentence each, factual, different per
   area, no superlatives. Priority order: Basavanagudi, JP Nagar, Jayanagar,
   BTM Layout, Vijayanagar (ranking, not clicked), then the barely-ranking set
   (Banashankari, Kanakapura Road, Richmond Town, Ulsoor).
2. **Basavanagudi**: this is the home page for the business's own
   neighbourhood. Add a short first-person paragraph to `bodyCopy` stating the
   studio is at Royal Manor, Ranoji Rao Road, and what that means for site
   visits. Facts only.
3. **Photo attribution**: tag future shoots with the locality in the image
   library so the `areaSlug` rule can attribute them. 19 areas have zero.
4. **GBP service areas**: make sure the Google Business Profile service-area
   list includes the localities the site targets (see
   `GOOGLE_BUSINESS_PROFILE_AUDIT.md`).
5. **Re-measure** from late Nov 2026 before any further snippet change.

## 6. Status summary

| Item                                                   | Status                                        |
| ------------------------------------------------------ | --------------------------------------------- |
| Unique per-area FAQs restored (341)                    | FIXED                                         |
| Landmark claim corrected                               | FIXED                                         |
| Compact business entity on every locality page         | FIXED                                         |
| FAQ uniqueness, nearby links, snippet rules under test | FIXED                                         |
| Snippet titles/descriptions                            | VERIFIED                                      |
| Photo attribution honesty                              | VERIFIED                                      |
| 41 templated taglines                                  | NEEDS OWNER ACTION                            |
| Basavanagudi / JP Nagar underperformance               | NEEDS OWNER ACTION                            |
| `/locations/bangalore` zero impressions                | NEEDS EXTERNAL VERIFICATION (next GSC window) |
| Hreflang                                               | NOT APPLICABLE                                |
