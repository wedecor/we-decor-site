# Google Business Profile Audit — We Decor Events

Audit date: 8 Nov 2026.

**Scope note.** The Google Business Profile (GBP) was not inspected from
inside this repository — there is no API access and the brief forbids
changing it without authorisation. Everything below is either (a) what the
website asserts about the business and therefore what GBP must agree with, or
(b) a checklist for the owner to run against the live profile. Items are
marked NEEDS OWNER ACTION or NEEDS EXTERNAL VERIFICATION accordingly. Nothing
here is marked VERIFIED unless it was verified in code or on the live site.

Why this matters more than anything in the repo: brand queries convert at
~22% and non-brand at ~1% (CLAUDE.md). The gap is the map pack, and the map
pack is won on GBP — proximity, category, reviews, photos and freshness — not
in Next.js.

## 1. What the website asserts (the NAP the profile must match)

Source: `lib/local-seo/constants.ts`, `lib/contact.ts`. Emitted in JSON-LD on
every page (homepage in full; compact entity node elsewhere).

| Field            | Website value                              | Verified in code | Must match on GBP                                                    |
| ---------------- | ------------------------------------------ | ---------------- | -------------------------------------------------------------------- |
| Business name    | We Decor Events                            | yes              | exactly — no keyword stuffing (“We Decor Events – Best Decorators…”) |
| Street address   | Royal Manor, Ranoji Rao Road, Basavanagudi | yes              | exactly                                                              |
| City / PIN       | Bengaluru 560004                           | yes              | exactly                                                              |
| Primary phone    | +91 88805 44452                            | yes              | primary on GBP                                                       |
| Secondary phone  | +91 95912 32166                            | yes              | additional phone on GBP                                              |
| Email            | connect2wedecor@gmail.com                  | yes              | —                                                                    |
| Website          | https://www.wedecorevents.com              | yes              | exactly, with `www` and `https`                                      |
| Coordinates      | 12.941671, 77.578531                       | in code          | NEEDS EXTERNAL VERIFICATION — confirm the pin sits on Royal Manor    |
| Place ID         | `ChIJCac5p8MVrjsRge3h_FhBR70`              | in code          | NEEDS EXTERNAL VERIFICATION                                          |
| Hours            | Open 24 hours (Mon–Sun 00:00–23:59)        | in code          | NEEDS EXTERNAL VERIFICATION — see §3                                 |
| Founded          | June 2022                                  | in code          | set “Opening date” on GBP                                            |
| Rating / reviews | 4.9★ / 82                                  | constant         | update `GOOGLE_REVIEW_COUNT` whenever Places drifts                  |

The Justdial listing URL in `sameAs` is titled “…Near Rizwan Masjid, JP
Nagar” and the Magicpin one is filed under Kanakapura. Those are third-party
listings and reflect the second base; they are not wrong, but if either shows
a different address or phone than GBP, fix the listing. NEEDS EXTERNAL
VERIFICATION.

## 2. Category and service-area checklist — NEEDS OWNER ACTION

Open the profile at business.google.com and check:

1. **Primary category**: “Event planner” or “Wedding service” are the usual
   choices for this trade; “Party equipment rental service”, “Florist”,
   “Balloon artist” make sense as secondary categories. Choose the primary
   that matches the biggest revenue line (the site's data says haldi,
   wedding and birthday). Do not change the primary casually — it resets
   ranking signals.
2. **Service area**: the business is a service-area business operating from
   Basavanagudi/JP Nagar. List the localities the site targets, starting
   with the inner ring: Jayanagar, Bannerghatta Road, BTM Layout,
   Banashankari, Kanakapura Road, Richmond Town, Ashok Nagar, Vijayanagar,
   Koramangala, Rajajinagar, HSR Layout. Add the outer localities the data
   says perform (Whitefield, Hebbal, RT Nagar, Electronic City). Google caps
   service areas at ~20; prioritise.
3. **Services section**: add one entry per site service page with the same
   name as the page's H1 subject and the starting price the site publishes
   (₹3,000 balloon/birthday/home; ₹5,000 floral services; ₹2,500 car).
   Prices on GBP must equal prices on the site — `pricing.test.ts` now keeps
   the site to one figure per service; GBP is the owner's half.
4. **Attributes**: “Online appointments”, “Onsite services”, “Identifies as
   women-owned / family-owned” only if true.
5. **Description** (750 chars): plain first person like the About page. State
   founded 2022, Basavanagudi, the services, the ₹3,000 floor, free site
   visit. No superlatives.
6. **Opening date**: June 2022.

## 3. Hours — NEEDS EXTERNAL VERIFICATION

The site's schema says the business is open 24 hours every day. If GBP shows
different hours, one of them is wrong and Google will trust neither. Either
set GBP to 24 hours (if phone/WhatsApp really is answered round the clock)
or change `BUSINESS_HOURS` in `lib/local-seo/constants.ts` to the real
hours. Do not leave them disagreeing.

## 4. Photos — NEEDS OWNER ACTION

The map pack rewards fresh, geotagged, categorised photos. The site has 458
manifest photos; GBP should carry the strongest 30–50 of them, uploaded over
weeks rather than in one batch, with a cover photo that is a real setup (not
the logo), the logo set as the profile image (use `/brand/logo-schema.png`,
the ink lockup on cream — gold-on-transparent is unreadable on Google's light
surfaces), and at least one photo per service category. Car decoration has
zero photos on the site; do not upload a stock car photo to GBP either.

## 5. Reviews — NEEDS OWNER ACTION

- Reply to every review, including the 4★ ones, within a week, in first
  person, naming the service and locality where the reviewer mentioned it
  (“Thanks for having us for the haldi in Jayanagar”). That text is indexed.
- Share the review link after every completed job via the WhatsApp thread
  that already exists — the site funnels every lead to WhatsApp, so the
  follow-up belongs there too.
- Do **not** gate or incentivise reviews; both are policy violations.
- When the count changes, update `GOOGLE_REVIEW_COUNT` (currently 82) so the
  homepage `AggregateRating` stays truthful. Only the homepage carries it, by
  design.

## 6. Posts and Q&A — NEEDS OWNER ACTION

- One GBP post a week is enough. Photo of a recent setup, one line saying
  what and where (locality only when true), link to the matching service or
  locality page. Posts expire; consistency beats volume.
- Seed the Q&A section with the questions people actually ask on WhatsApp —
  the eight added to `/faq` this round (haldi cost, birthday cost, home
  haldi, lead time, fresh flowers, same/next-day, rain, advance) are the
  right list. Answer them yourself; keep the answers identical to the site.

## 7. Consistency checks the owner can run in 10 minutes

| Check                                                                          | How                                                                              | Status                      |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | --------------------------- |
| GBP name = site name                                                           | compare visually                                                                 | NEEDS EXTERNAL VERIFICATION |
| GBP address = `Royal Manor, Ranoji Rao Road, Basavanagudi, Bengaluru 560004`   | compare                                                                          | NEEDS EXTERNAL VERIFICATION |
| GBP primary phone = +91 88805 44452                                            | compare                                                                          | NEEDS EXTERNAL VERIFICATION |
| GBP website = https://www.wedecorevents.com (no UTM, no trailing junk)         | compare                                                                          | NEEDS EXTERNAL VERIFICATION |
| GBP hours = site hours                                                         | compare with §3                                                                  | NEEDS EXTERNAL VERIFICATION |
| Place ID in `constants.ts` resolves to this profile                            | open `https://www.google.com/maps/place/?q=place_id:ChIJCac5p8MVrjsRge3h_FhBR70` | NEEDS EXTERNAL VERIFICATION |
| Justdial / Magicpin / WedEazzy / InstaVendor / ServicesCorpo show the same NAP | open each `sameAs` URL                                                           | NEEDS EXTERNAL VERIFICATION |
| Review count on Maps = `GOOGLE_REVIEW_COUNT` (82)                              | compare                                                                          | NEEDS EXTERNAL VERIFICATION |

## 8. What the repo already does right for GBP

| Item                                                                                                                                                           | Status   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `LocalBusiness` with `@id`, NAP, geo, hours, `sameAs` (incl. Maps place URL), `hasMap`, `areaServed`, `hasOfferCatalog` on the homepage                        | VERIFIED |
| Compact business node on every inner page (new)                                                                                                                | FIXED    |
| `AggregateRating` only on the homepage                                                                                                                         | VERIFIED |
| Schema logo is the ink-on-cream lockup                                                                                                                         | VERIFIED |
| “View reviews on Google” link to the Maps place on the homepage testimonials and `/reviews` (which fetches live Places reviews server-side, revalidated daily) | VERIFIED |
| Phone and WhatsApp clicks tracked to GA4 as conversions                                                                                                        | VERIFIED |

## 9. Measurement

GBP Insights is the only place these actions show up: calls, direction
requests, website clicks, and “how customers searched” (discovery vs direct).
Export monthly alongside the Search Console and GA4 figures in
`AI_SEARCH_MEASUREMENT.md`. The target that matters is **discovery searches
→ website clicks + calls** rising month on month; brand searches will follow.
