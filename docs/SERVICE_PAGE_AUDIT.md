# Service Page Audit — We Decor Events

Audit date: 8 Nov 2026. Data source: `lib/services/decoration-service-pages.ts`,
`lib/services/high-intent-service-pages.ts`, `app/services/birthday-decoration/page.tsx`,
`app/services/decoration/page.tsx`, `app/(site)/_data/work-images.ts`; production HTML
spot-checked on `/services/haldi-decoration`, `/services/wedding-setup`,
`/services/birthday-decoration`, `/services/decoration`.

Context from Search Console (CLAUDE.md): service pages earn approximately
nothing organically — 73% of clicks go to the homepage, the rest to locality
pages. The brief asks for an inventory and justified fixes, not a content
expansion with no evidence behind it. Changes here are integrity fixes.

## Inventory

All 17 indexable service URLs. Photo counts are from `workForService()`,
which is what the page actually renders (the `gallery` config field is dead,
see §3). Titles are the exact SERP title before the `| We Decor` suffix.

| Path                               | Title                                                                          | Title / desc chars | H1                                                                  | FAQs           | Related links | Photos                                | Core `@id`                         |
| ---------------------------------- | ------------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------- | -------------- | ------------- | ------------------------------------- | ---------------------------------- |
| `/services/birthday-decoration`    | Birthday Decoration in Bangalore — Home & Venue Setups from ₹3,000             | 66 / 151           | Give the birthday person a setup made for them                      | 8              | 4             | 45                                    | `/#service-birthday-decoration`    |
| `/services/wedding-setup`          | Wedding Decorators in Bangalore — Mandap & Stage from ₹5,000                   | 60 / 150           | Match the décor plan to the venue and budget                        | 8              | 4             | 102                                   | `/#service-wedding-decoration`     |
| `/services/haldi-decoration`       | Haldi Decoration in Bangalore — Home & Stage Setups from ₹5,000                | 63 / 159           | Set up for the haldi, not the mess after it                         | 8              | 4             | 145                                   | `/#service-haldi-decoration`       |
| `/services/engagement-decoration`  | Engagement Decoration in Bangalore — Home & Stage Setups from ₹5,000           | 68 / 144           | Start with the moment guests will gather around                     | 6              | 4             | 96                                    | page-scoped                        |
| `/services/corporate-decoration`   | Corporate Event Decoration in Bangalore — From ₹5,000                          | 53 / 151           | Decor that fits the run sheet and procurement process               | 8              | 3             | 19 (3 corporate + reception fallback) | page-scoped                        |
| `/services/room-decoration`        | Surprise Room Decoration in Bangalore — From ₹5,000                            | 51 / 157           | Open the door to a planned surprise                                 | 6              | 3             | 48                                    | `/#service-bridal-room-decoration` |
| `/services/tent-balloon-setup`     | Cabana Tent & Balloon Decoration in Bangalore — From ₹5,000                    | 59 / 156           | Make the open space usable for the party                            | 6              | 3             | 74 (fallback)                         | page-scoped                        |
| `/services/nikah-decoration`       | Nikah Ceremony Decoration in Bangalore — From ₹5,000                           | 52 / 144           | A serene setting for the nikah itself                               | 6              | 3             | 71 (fallback)                         | page-scoped                        |
| `/services/balloon-decoration`     | Balloon Decoration in Bangalore — Arches & Setups from **₹3,000** (was ₹5,000) | 61 / 148           | Colour-matched balloons that fit the room                           | 6              | 3             | 67 (fallback)                         | `/#service-balloon-decoration`     |
| `/services/baby-shower-decoration` | Baby Shower Decoration in Bangalore — Seemantham & Themes from ₹5,000          | 69 / 141           | A baby shower where every guest can settle in                       | 6              | 4             | 22                                    | page-scoped                        |
| `/services/anniversary-decoration` | Anniversary Decoration in Bangalore — Surprise Setups from ₹5,000              | 65 / 143           | Set the surprise before they get home                               | 6              | 3             | 48 (fallback)                         | page-scoped                        |
| `/services/proposal-decoration`    | Proposal Decoration in Bangalore — Romantic Setups from ₹5,000                 | 62 / 146           | Keep the plan secret. Keep the moment visible.                      | 6              | 3             | 3                                     | `/#service-proposal-decoration`    |
| `/services/home-decoration`        | Home Decoration in Bangalore — Haldi, Engagement, Birthday from ₹3,000         | 70 / 150           | Home celebrations done right: Haldi, engagement, birthday & rituals | 7              | 6             | 60                                    | page-scoped                        |
| `/services/floral-decoration`      | Flower Decoration in Bangalore — Fresh Floral Backdrops from ₹5,000            | 67 / 142           | Flowers chosen for the hours they must perform                      | 6              | 3             | 152 (fallback)                        | page-scoped                        |
| `/services/terrace-decoration`     | Terrace & Rooftop Decoration in Bangalore — From ₹5,000                        | 55 / 142           | Turn the terrace into a setting that holds up                       | 6              | 3             | 147 (fallback)                        | page-scoped                        |
| `/services/car-decoration`         | Wedding Car Decoration in Bangalore — From ₹2,500                              | 49 / 138           | Dress the car without risking the finish                            | 6              | 3             | **0**                                 | `/#service-car-decoration`         |
| `/services/decoration` (umbrella)  | Stage, Backdrop & Party Decoration in Bangalore — From ₹3,000                  | 61 / 163           | Event Decoration Services                                           | 0 (no FAQPage) | —             | 0                                     | `/#service-decoration`             |

Hub: `/services` — CollectionPage + ItemList linking all 16 leaf pages
(guarded by `service-hub-links.test.ts`).

## Per-criterion findings

| Criterion                                                 | Status                        | Notes                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search intent                                             | VERIFIED                      | Every title leads with “{Service} in Bangalore”, matching the query pattern (“haldi decorators in Bangalore”). Hub uses “decorators” per the near-me data.                                                                                                                                                          |
| Unique title                                              | VERIFIED                      | No duplicates (`metadata.test.ts`).                                                                                                                                                                                                                                                                                 |
| Meta description                                          | VERIFIED                      | 138–163 chars, all unique, all carry price floor + rating.                                                                                                                                                                                                                                                          |
| H1                                                        | VERIFIED                      | Unique, editorial, one per page. H1 does not repeat the title — intentional house style.                                                                                                                                                                                                                            |
| H2/H3 hierarchy                                           | VERIFIED                      | `DecorationServicePage` renders eyebrow → H2 per section (story, highlights, options, venues, budget, booking, timeline, themes, gallery, areas, FAQ).                                                                                                                                                              |
| Service explanation / options / materials / customisation | VERIFIED                      | 14 of 15 dynamic pages have `howWeCustomize`, `popularDecorationOptions`, `suitableVenues`, `optionalAddOns`, `budgetConsiderations` (3 points), `bookingProcess` (4), `setupTimeline` (3–4). The legacy pages (haldi, engagement, corporate, tent, room, wedding) have the same via `highlights` + process fields. |
| Actual photographs                                        | VERIFIED / NEEDS OWNER ACTION | Rendered from the manifest with true alts. **Car decoration has none**; proposal has 3. See owner actions.                                                                                                                                                                                                          |
| Alt text                                                  | VERIFIED                      | All manifest alts ≥ 20 chars, descriptive, locality only when verified (`images.test.ts`).                                                                                                                                                                                                                          |
| Pricing                                                   | FIXED                         | Balloon page said ₹5,000; the pricing constants, homepage trust strip, pricing page and locality FAQs say ₹3,000. Title, description, schema Offer and both llms feeds now agree. Service schema no longer emits an invented `₹15,999+` ceiling. `pricing.test.ts` holds title ↔ Offer ↔ constants together.        |
| Booking information                                       | VERIFIED                      | `bookingProcess` on every dynamic page; CTA band with WhatsApp + phone.                                                                                                                                                                                                                                             |
| Customer feedback                                         | VERIFIED (visible only)       | Each page shows one testimonial quote. Not marked up as `Review` — correct; self-published reviews earn nothing and risk a manual action.                                                                                                                                                                           |
| FAQs                                                      | VERIFIED                      | 6–8 unique FAQs per page, rendered once and reused for `FAQPage`. The umbrella `/services/decoration` has none (acceptable: it is a hub).                                                                                                                                                                           |
| Related services                                          | VERIFIED                      | 3–6 per page, all live routes, none self-linking (`internal-links.test.ts`).                                                                                                                                                                                                                                        |
| Locality links                                            | VERIFIED                      | `getServiceLocalitiesFor()` set per page + CoreExploreLinks rotation.                                                                                                                                                                                                                                               |
| Contact CTA                                               | VERIFIED                      | Hero + CTA band + sticky WhatsApp; all tracked.                                                                                                                                                                                                                                                                     |
| Structured data                                           | FIXED                         | `WebPage` + `Service` (provider → `/#localbusiness`) + `FAQPage` + `BreadcrumbList` + area entities; **now also** the compact `LocalBusiness`/`WebSite` nodes so each page is self-describing.                                                                                                                      |
| Internal links                                            | VERIFIED                      | 36–40 unique internal hrefs per service page in production HTML (measured 8 Nov on haldi and car pages).                                                                                                                                                                                                            |

## 3. Known debt (not changed)

- `DecorationServicePageConfig.gallery` and the `GALLERY` constant in
  `decoration-service-pages.ts` are unused. Their captions are also wrong
  (“Birthday at home, Koramangala” on an HSR Layout photo). Safe to delete.
- `tests/unit/service-hub-links.test.ts` asserts against source text of
  `app/services/page.tsx`; fine, but brittle if the hub moves to data.

## 4. Owner actions

1. **Car decoration photographs** — add real car-decoration photos to the
   image library, regenerate `work-images.ts`, then remove `car-decoration`
   from `KNOWN_EMPTY` in `tests/unit/seo/images.test.ts`.
2. **Proposal photographs** — three is thin for a ₹5,000+ service; add when
   available.
3. Confirm the ₹3,000 balloon floor is the figure you want advertised on the
   balloon page (it is what the pricing page already says).

## 5. Implementation status

| Change                                                                  | Status             |
| ----------------------------------------------------------------------- | ------------------ |
| Balloon page price aligned to ₹3,000 (title, description, schema, llms) | FIXED              |
| `home-decoration` schema Offer aligned to its advertised ₹3,000         | FIXED              |
| Invented `priceRange` ceiling removed from Service schema               | FIXED              |
| Compact business entity on every service page                           | FIXED              |
| Pricing consistency test                                                | FIXED              |
| Car / proposal photographs                                              | NEEDS OWNER ACTION |
