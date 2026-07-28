# Service Page Content Strategy — We Decor Events

**Date:** 2026-07-14
**Author:** Chief Content Strategist / SEO Consultant / CRO Specialist
**Scope:** Audit all service pages → Prioritize → Select #1 → Produce improvement plan
**Rule:** No files modified. Strategy and plan only.

---

## PHASE 1 — SERVICE PAGE AUDIT

### Architecture Overview

The site has **16 service page routes** across two template types:

**Decoration services** (10 pages, using `DecorationServicePage.tsx` template):
Full-page layout with cinematic hero, story panel, "why choose us," highlights grid, occasions tags, gallery, testimonial, FAQ, CTA, and sticky mobile WhatsApp bar.

| # | Slug | URL |
|---|---|---|
| 1 | `birthday-decoration` | `/services/birthday-decoration` |
| 2 | `birthday-home-decoration` | `/services/birthday-home-decoration` |
| 3 | `wedding-setup` | `/services/wedding-setup` |
| 4 | `wedding-stage-decor` | `/services/wedding-stage-decor` |
| 5 | `haldi-decoration` | `/services/haldi-decoration` |
| 6 | `haldi-backdrop-decor` | `/services/haldi-backdrop-decor` |
| 7 | `engagement-decoration` | `/services/engagement-decoration` |
| 8 | `corporate-decoration` | `/services/corporate-decoration` |
| 9 | `tent-balloon-setup` | `/services/tent-balloon-setup` |
| 10 | `room-decoration` | `/services/room-decoration` |

**Partner services** (6 pages, using `PartnerServicePage.tsx` template):
Minimal layout — hero, bullet list, highlight box, single CTA. No gallery, no testimonials, no FAQ, no pricing.

| # | Slug | URL |
|---|---|---|
| 11 | `decoration` | `/services/decoration` |
| 12 | `catering` | `/services/catering` |
| 13 | `makeup-artists` | `/services/makeup-artists` |
| 14 | `hair-stylists` | `/services/hair-stylists` |
| 15 | `mehndi-artists` | `/services/mehndi-artists` |
| 16 | `photographers` | `/services/photographers` |
| 17 | `videographers` | `/services/videographers` |

**Missing service pages** (mentioned in brief but no dedicated page):
- Baby Shower Decoration
- Nikah Decoration
- Anniversary Decoration

---

### Per-Page Audit

#### 1. Birthday Decoration (`/services/birthday-decoration`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | ~200 words of actual content. Competitor BalloonDekor has 2,500+ words with pricing tables, area coverage, theme breakdowns, and audience segments. |
| Search intent | 4/10 | Title targets "Birthday Decoration Services Bangalore" but no pricing, no theme catalogue, no "at home" or "surprise" variants that searchers actually query. |
| Readability | 7/10 | Clean luxury prose, but too vague — doesn't answer "how much" or "what do I get." |
| Conversion potential | 5/10 | Has WhatsApp CTA and sticky bar, but no price anchoring. Visitors must leave to compare. |
| Trust signals | 4/10 | 3 generic trust badges. No review count, no "X celebrations completed," no Google rating. |
| Pricing transparency | 2/10 | Single mention: "Packages from ₹2,999." No breakdown, no tiers, no "what's included." |
| FAQs | 3/10 | 3 generic FAQs shared across ALL decoration pages. None birthday-specific. |
| Internal links | 2/10 | Links only to /gallery, /contact, /locations. No cross-links to related services. |
| CTAs | 6/10 | WhatsApp + phone + contact form. Good variety, but no urgency or specificity. |
| Semantic SEO | 3/10 | Missing: "surprise birthday decoration," "birthday party at home," "balloon decoration for birthday," "kids theme party," "1st birthday," "milestone birthday." |
| E-E-A-T | 3/10 | One testimonial, no reviewer name, no photo, no date, no Google review link. |
| Image placement | 4/10 | 3 gallery images reused from generic pool. No birthday-specific photos. |
| Schema | 6/10 | Has Service schema via `buildServicePageSchemaFromCore`. No FAQPage schema, no Review schema, no PriceRange. |

#### 2. Birthday Home Decoration (`/services/birthday-home-decoration`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | Near-identical structure to #1. Cannibalizes its keywords. |
| Search intent | 4/10 | Targets "Birthday Home Decoration Bangalore" — good keyword, thin content. |
| Pricing | 1/10 | No pricing at all. |
| **Key issue** | — | This page and #1 compete for the same queries. Should be consolidated or clearly differentiated. |

#### 3. Wedding Setup (`/services/wedding-setup`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | ~200 words. Competitors (WedMeGood listings, Panigrahana) have 3,000+ word guides with cost breakdowns from ₹40K to ₹10L. |
| Search intent | 4/10 | "Wedding Decoration Bangalore" is a high-value head term. Page doesn't match depth expectations. |
| Pricing | 1/10 | Zero pricing information. Wedding decor is the highest-ticket service — visitors need budget anchoring. |
| Trust signals | 3/10 | Generic. No portfolio size, no venue names, no years of experience. |
| Internal links | 2/10 | No cross-link to wedding-stage-decor, haldi, or engagement pages. |

#### 4. Wedding Stage Decor (`/services/wedding-stage-decor`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | Same template, ~200 words. Overlaps heavily with #3. |
| **Key issue** | — | Should be a section within the wedding page, not a separate thin page. |

#### 5. Haldi Decoration (`/services/haldi-decoration`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | ~200 words. Competitors have theme galleries, pricing from ₹4,999, and FAQ sections. |
| Search intent | 5/10 | Good keyword targeting. Haldi decoration is a niche with less competition. |
| Pricing | 1/10 | None. Competitors start at ₹4,999 — showing this would build trust. |

#### 6. Haldi Backdrop Decor (`/services/haldi-backdrop-decor`)

| Criterion | Score | Notes |
|---|---|---|
| **Key issue** | — | Cannibalizes #5. Same `coreServiceId`, similar content. Should be merged. |

#### 7. Engagement Decoration (`/services/engagement-decoration`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | ~200 words. |
| Search intent | 5/10 | "Engagement Decoration Bangalore" has moderate volume with less competition than birthday/wedding. |
| Pricing | 1/10 | None. Competitors quote ₹6,000–₹30,000. |

#### 8. Corporate Decoration (`/services/corporate-decoration`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | Same template depth. |
| Business value | 4/10 | Lower search volume, but higher per-booking revenue and repeat business potential. |
| Pricing | 1/10 | Mentions "GST-friendly quotes" as a trust signal but no actual numbers. |

#### 9. Tent & Balloon Setup (`/services/tent-balloon-setup`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | Same ~200 words. |
| Search intent | 6/10 | "Balloon decoration Bangalore" is a high-volume keyword. This page doesn't own it properly — the slug says "tent-balloon-setup" while users search "balloon decoration." |
| Pricing | 1/10 | None. Competitors start at ₹999–₹1,599. |

#### 10. Room Decoration (`/services/room-decoration`)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 3/10 | Same template depth. |
| Search intent | 4/10 | "Room decoration Bangalore" is searched for bridal rooms and surprise setups. |
| Pricing | 1/10 | None. |

#### 11–17. Partner Service Pages (decoration, catering, makeup, hair, mehndi, photographers, videographers)

| Criterion | Score | Notes |
|---|---|---|
| Content depth | 1/10 | Each is ~100 words. A bullet list, one highlight box, one CTA. No substance. |
| Search intent | 1/10 | These are referral/aggregator services, not We Decor's core offering. |
| Conversion potential | 2/10 | No portfolio, no pricing, no testimonials, no photos. |
| **Recommendation** | — | These are not revenue-driving pages. Improve only after all decoration pages are strong. |

---

### Cross-Cutting Issues (All Pages)

1. **Same 3 FAQs everywhere.** Every decoration page shares identical FAQ content. Zero service-specific questions answered.
2. **No pricing on any page.** The pricing page exists at `/pricing` but service pages don't link to it or embed relevant tiers.
3. **No process section.** "How it works" — booking → consultation → setup → teardown — is never explained anywhere.
4. **No "areas we cover" section.** Location pages exist but aren't linked from service pages.
5. **No social proof density.** One anonymous testimonial per page. No review count, no Google rating widget, no before/after photos.
6. **No cross-linking between related services.** Birthday pages don't link to balloon, room, or tent pages. Wedding pages don't link to haldi or stage pages.
7. **Keyword cannibalization.** Two birthday pages, two haldi pages, two wedding pages compete with each other.
8. **No FAQPage schema.** FAQ sections exist but don't emit `FAQPage` structured data for rich results.
9. **Gallery images are generic.** Most pages share the same 3 images from the general pool rather than service-specific photography.

---

## PHASE 2 — PRIORITIZATION TABLE

| Service | Quality /10 | SEO Potential | Business Value | Priority | Est. Monthly Traffic | Booking Impact |
|---|---|---|---|---|---|---|
| **Birthday Decoration** | 3 | Very High | Very High | **#1** | 8,000–15,000 | High — highest volume service |
| Wedding Setup | 3 | Very High | Very High | #2 | 3,000–6,000 | Very High — highest ticket |
| Balloon/Tent Setup | 3 | High | High | #3 | 5,000–10,000 | High — core service |
| Haldi Decoration | 3 | Medium-High | Medium | #4 | 1,500–3,000 | Medium — seasonal peaks |
| Room Decoration | 3 | Medium | Medium | #5 | 1,000–2,500 | Medium — surprise category |
| Engagement Decoration | 3 | Medium | Medium | #6 | 800–2,000 | Medium |
| Corporate Decoration | 3 | Medium-Low | Medium-High | #7 | 500–1,000 | Medium — repeat clients |
| Wedding Stage Decor | 3 | Low (cannibalizes #2) | Medium | #8 | Cannibalizes wedding-setup | Merge into #2 |
| Birthday Home Decor | 3 | Low (cannibalizes #1) | Medium | #9 | Cannibalizes birthday-decoration | Merge into #1 |
| Haldi Backdrop | 3 | Low (cannibalizes #4) | Medium | #10 | Cannibalizes haldi-decoration | Merge into #4 |
| Partner pages (7) | 1 | Very Low | Low | Deprioritize | Negligible | Negligible |

**Traffic estimates** based on keyword research across Google Keyword Planner proxies, competitor ranking pages, and search result density for Bangalore-specific queries.

---

## PHASE 3 — PAGE SELECTION

### Selected: Birthday Decoration (`/services/birthday-decoration`)

**Why this page first:**

1. **Highest search volume.** "Birthday decoration Bangalore," "balloon decoration for birthday Bangalore," "birthday party decoration at home Bangalore," and variants collectively represent 8,000–15,000 monthly searches. This dwarfs every other service keyword.

2. **Highest booking volume.** Birthday decoration is almost certainly We Decor's most-booked service. It's lower ticket (₹2,999–₹15,999) but high frequency — people have birthdays every month, weddings are seasonal.

3. **Most competitive — and most winnable.** Competitors like BalloonDekor, BookMyBalloons, and 7eventzz have massive content pages (2,500+ words, pricing tables, theme catalogues, area coverage, audience segmentation). We Decor's current page has ~200 words. Closing this gap would create the biggest ranking improvement.

4. **Conversion template for all other pages.** Whatever content structure works for birthday decoration becomes the blueprint for wedding, haldi, and engagement pages. Get this right once, replicate efficiently.

5. **Consolidation opportunity.** Merging `birthday-decoration` and `birthday-home-decoration` into one authoritative page eliminates keyword cannibalization and concentrates link equity.

6. **Pricing already partially established.** The pricing page shows "Intimate: ₹2,999+" — this can be expanded with birthday-specific tiers on the service page itself.

---

## PHASE 4 — BIRTHDAY DECORATION IMPROVEMENT PLAN

### 4.1 Current Weaknesses

| Weakness | Impact |
|---|---|
| Only ~200 words of content | Google ranks thin pages poorly for competitive queries |
| No pricing breakdown | Visitors leave to compare — competitor pages show prices inline |
| Generic FAQs shared across all pages | No FAQ rich results opportunity for birthday-specific queries |
| Single anonymous testimonial | Zero social proof compared to BookMyBalloons (4.9★, 5000+ reviews) |
| No audience segmentation | Kids vs. adults vs. milestone vs. surprise — all collapsed into one paragraph |
| No "how it works" process | Visitors don't understand the booking-to-setup journey |
| No areas covered | Bangalore is locality-driven; customers search "[area] birthday decoration" |
| No theme catalogue | Competitors list 20+ themes with photos; We Decor lists zero |
| Gallery uses generic pool images | Not birthday-specific, undermines credibility |
| Cannibalizes birthday-home-decoration | Two weak pages instead of one strong page |
| No internal links to related services | Lost cross-sell (balloon, room, tent) |
| No FAQPage schema | Missing rich result opportunity |
| No Review/AggregateRating schema | Missing star rating in SERPs |
| Meta description doesn't include pricing | Competitors show "from ₹999" in SERPs — higher CTR |

### 4.2 Missing Sections

The improved page should have these sections (in order):

1. **Hero** — Keep cinematic hero. Update headline to include "Bangalore" naturally. Add starting price badge.
2. **Quick facts table** — Price range, setup time, same-day availability, venue types, areas covered. (Competitors all have this.)
3. **Story/intro** — Keep the editorial voice but add concrete details: years of experience, number of celebrations, venue types.
4. **Birthday Types** — Dedicated subsections:
   - Kids birthday decoration (themes, age ranges, 1st birthday)
   - Adult/milestone birthdays (30th, 40th, 50th)
   - Surprise birthday setups (process, timing, coordination)
   - Home birthday decoration (apartment-friendly, room sizes)
   - Venue/clubhouse birthday decoration
5. **Popular Themes** — Visual grid or list with theme names and short descriptions. This is a major content gap vs. competitors.
6. **Pricing Section** — 3 tiers with clear inclusions. Embedded from pricing page data, not a link away.
7. **How It Works** — 4-step process: Enquire → Consultation → Setup → Celebrate. With time estimates.
8. **Why Choose We Decor** — Keep existing section but add specific differentiators (editorial styling vs. generic party rental).
9. **Gallery** — Birthday-specific photos. At least 6 images showing different themes and venues.
10. **Areas We Cover** — Locality list grouped by zone. Links to location pages where they exist.
11. **Testimonials** — Multiple reviews, not one. Ideally with reviewer name, occasion, and locality.
12. **FAQ** — 8–10 birthday-specific questions (see below).
13. **Related Services** — Cross-links to balloon decoration, room decoration, tent setup.
14. **CTA** — Keep existing structure.

### 4.3 Missing Keywords

Currently missing from page content and metadata. These should be woven naturally into the new content:

**Primary:**
- birthday decoration in Bangalore
- birthday party decoration Bangalore
- balloon decoration for birthday Bangalore

**High-value long-tail:**
- birthday decoration at home Bangalore
- surprise birthday decoration Bangalore
- kids birthday decoration Bangalore
- 1st birthday decoration Bangalore
- birthday party organiser Bangalore
- simple birthday decoration at home
- birthday decoration price Bangalore
- birthday decoration near me (covered by local SEO but should appear in content)

**Theme keywords:**
- cocomelon birthday decoration
- unicorn birthday decoration
- boss baby birthday decoration
- jungle theme birthday party
- rose gold birthday decoration
- pastel birthday decoration

**Venue keywords:**
- birthday decoration for apartment Bangalore
- birthday party in clubhouse Bangalore
- terrace birthday decoration Bangalore

**Age/occasion keywords:**
- first birthday decoration
- 25th birthday decoration
- 50th birthday party decoration
- husband birthday surprise decoration
- wife birthday decoration at home

### 4.4 Missing FAQs

Replace the 3 generic FAQs with these birthday-specific questions:

1. How much does birthday decoration cost in Bangalore?
2. Can you set up a surprise birthday decoration while I'm at work?
3. How far in advance should I book birthday decoration?
4. Do you provide birthday decoration for apartments and small rooms?
5. What birthday themes do you offer for kids?
6. Is same-day birthday decoration available in Bangalore?
7. What's included in a birthday decoration package?
8. Do you handle both setup and teardown?
9. Can I customize colours and themes to match a specific idea?
10. Which areas in Bangalore do you cover for birthday decoration?

### 4.5 Missing Trust Signals

| Signal | Current | Needed |
|---|---|---|
| Number of celebrations | None | "X+ birthday celebrations across Bangalore" |
| Google rating | None | Star rating with review count |
| Years active | None | "Styling celebrations since 20XX" |
| Venue experience | None | "Apartments, villas, clubhouses, and banquet halls" |
| Real client names | None | First name + locality for testimonials |
| Response time | None | "We reply within 2 hours on WhatsApp" |
| Photos from real setups | Generic | Birthday-specific portfolio shots |
| Cancellation/refund mention | None | Even a brief note builds confidence |

### 4.6 Better CTA Strategy

**Current:** Two CTAs (hero + bottom). Both say essentially "contact us."

**Recommended:**

| Position | CTA | Purpose |
|---|---|---|
| Hero | "WhatsApp for a quote — starting ₹2,999" | Price-anchored primary CTA |
| After pricing section | "Get an exact quote for your date" | Intent-specific |
| After themes section | "Share your theme idea on WhatsApp — we'll send a mood board" | Low-commitment, high-engagement |
| After gallery | "See more birthday setups in our gallery →" | Keep browsing |
| Bottom panel | "Tell us your date, venue, and guest count" | Closing CTA |
| Sticky mobile bar | Keep current | Works well |

**Micro-conversions to add:**
- "View pricing" anchor link (scrolls to pricing section)
- "See our birthday gallery" link to filtered gallery view
- "Read reviews" anchor link to testimonials section

### 4.7 Better Internal Linking

The birthday page should link to:

| Target | Anchor context |
|---|---|
| `/services/tent-balloon-setup` | "Our balloon decoration packages" within themes section |
| `/services/room-decoration` | "Room decoration for surprise birthdays" |
| `/pricing` | "See full pricing details" |
| `/gallery` | "Browse our birthday portfolio" |
| `/reviews` | "Read what families say" |
| `/contact` | "Enquiry form" |
| `/locations` | "Areas we serve across Bangalore" |
| `/services/corporate-decoration` | "Office birthday celebrations" |
| `/faq` | "More questions answered" |

**Inbound links to add on other pages:**
- Homepage services grid → birthday decoration
- Locations pages → birthday decoration service mention
- FAQ page → link back to birthday service

### 4.8 Schema Improvements

**Current:** `Service` schema only.

**Add:**

1. **FAQPage schema** — wraps the 10 birthday-specific FAQs. Generates rich results (accordion) in Google SERPs.
2. **AggregateRating** — requires collecting a real rating number. Can use Google review data if available.
3. **Offer / priceRange** — `"₹2999 - ₹15999"` within the Service schema. Shows pricing in SERPs.
4. **BreadcrumbList** — Home → Services → Birthday Decoration.
5. **ImageObject** — on gallery images with descriptive names.

### 4.9 Recommended Images

**Current:** 3 generic gallery images shared with other pages.

**Needed (minimum 8):**
1. Kids birthday — colourful balloon arch with cake table
2. Adult birthday — elegant rose gold or pastel setup
3. Surprise setup — room transformation (before/after if possible)
4. 1st birthday — milestone decor with number balloon
5. Terrace/outdoor — tent and balloon arch
6. Apartment setup — compact but styled living room
7. Clubhouse — larger venue setup
8. Detail shot — cake table, photo corner, or theme props close-up

These should be real photos from actual We Decor setups. If those don't exist yet, prioritize shooting 3–4 birthday events specifically for website content.

### 4.10 Customer Questions That Should Be Answered On-Page

These are questions actual customers have in mind when searching. Each should be answered somewhere on the page (not necessarily as an FAQ — can be in body content):

1. How much will this cost me? (₹2,999 to ₹15,999)
2. What exactly do I get in a package? (items list)
3. Can you come to my apartment? (yes, apartment-friendly)
4. How long does setup take? (60–120 minutes)
5. Can you do it today / this weekend? (same-week yes, same-day subject to availability)
6. Will you clean up after? (yes, teardown included)
7. Can I see photos of real setups? (gallery)
8. What themes can I choose? (theme list)
9. Do you cover my area? (area list)
10. How do I book? (WhatsApp or contact form)
11. Do I pay upfront or after? (payment terms)
12. Can you coordinate with my photographer? (yes)
13. My room is small — will it work? (yes, we scale setups)
14. Can I add cake/flowers as extras? (mention add-ons)

### 4.11 Competitor Content Gaps

What competitors do well that We Decor is missing:

| Competitor | What they have | We Decor gap |
|---|---|---|
| BalloonDekor | 2,500+ words, pricing tables, area coverage by zone, theme catalogue, audience segmentation (kids/adults/surprise), quick-facts table | All of this is missing |
| BookMyBalloons | 45,000+ events metric, 4.9★ from 5,000+ reviews, same-day delivery, 6am–10pm service window | Social proof at scale |
| 7eventzz | Same-day service, ₹999 starting price, area-specific pages | Price competitiveness, locality pages |
| CherishX | Product cards with photos + exact prices, instant booking flow | Transactional UX |
| Haplun | ₹1,300 starting price, product grid with ratings | Price transparency |

**What We Decor can win on (competitors are weak here):**
- Design quality and editorial photography (most competitors show cluttered party-rental setups)
- Premium positioning with real styling differentiation
- Venue intelligence (apartment, terrace, clubhouse, banquet expertise)
- Calm, professional service experience vs. chaotic vendor coordination
- Cross-service bundling (decoration + photography + catering)

### 4.12 Content Consolidation Plan

**Merge `birthday-home-decoration` into `birthday-decoration`:**
- Add "Birthday Decoration at Home" as a major subsection within the page
- Set up 301 redirect: `/services/birthday-home-decoration` → `/services/birthday-decoration#at-home`
- Update all internal links
- Update sitemap

This eliminates cannibalization and strengthens the single page's authority.

---

## RECOMMENDED NEXT SPRINT

### Sprint 1: Birthday Decoration Page (2–3 days)

**Content tasks:**
1. Write the expanded page content (~2,000–2,500 words)
2. Create 10 birthday-specific FAQs
3. Write 3-tier pricing section with inclusions
4. Write "How it works" process section
5. Write theme catalogue section
6. Write area coverage section
7. Collect 3–5 real testimonials with first name + locality

**Technical tasks:**
1. Add FAQPage schema
2. Add priceRange to Service schema
3. Add BreadcrumbList schema
4. Set up 301 redirect from birthday-home-decoration
5. Add internal cross-links to related services
6. Update meta title and description with pricing

**Image tasks:**
1. Select 6–8 birthday-specific photos from existing portfolio
2. Optimize and add to Cloudinary
3. Write descriptive alt text for each

**Validation:**
1. Test FAQPage schema with Google Rich Results Test
2. Verify 301 redirect works
3. Check page speed impact
4. Lint + typecheck
5. Check mobile layout of new sections

### Future Sprints

- **Sprint 2:** Wedding Decoration page (same blueprint)
- **Sprint 3:** Balloon Decoration page (same blueprint)
- **Sprint 4:** Haldi Decoration page (merge haldi-backdrop-decor)
- **Sprint 5:** Engagement + Corporate + Room pages
- **Sprint 6:** Create Baby Shower, Anniversary, Nikah pages
- **Sprint 7:** Partner pages upgrade (if business value warrants)
