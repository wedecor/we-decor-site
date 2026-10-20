# We Decor — what's left to do

Everything the website code could fix is committed and live as of `cc284f6`.
What remains is almost entirely off-site. Ordered by expected return.

**The core finding driving this order:** your Google Business Profile gets
**1,986 views/month**. Your entire website gets ~3,500 search impressions/month
across 39 indexed pages. One listing does more than half the volume of the whole
site — and converts better, because Maps users are ready to call.

Your biggest non-brand query, "event decorators near me" (496 impressions),
converts at **1%**. Brand searches convert at **31–38%**. That gap is the map
pack, and the map pack is won on the Business Profile, not the website.

---

## 1. Google Business Profile

### ✅ 1a. Website field changed to `https://` — DONE
Was `http://www.wedecorevents.com/`, now `https://www.wedecorevents.com/`.

It is already working: Search Console's Recommendations panel now flags
`http://www.wedecorevents.com/` as getting **60% fewer impressions than usual**
— exactly the duplicate collapsing into the canonical HTTPS homepage.

<details>
<summary>Original diagnosis (kept for reference)</summary>

This is the last thing feeding a duplicate HTTP version of your homepage.
Last 28 days: **1,392 impressions and 16 clicks** landed on `http://` instead of
`https://` — roughly 48% of homepage impressions split onto the wrong URL.

The site already redirects http→https correctly and the canonical tag is right.
No code change can fix this: your own verified listing is telling Google the
HTTP version is the real one.

**Where:** Business Profile → Edit profile → Contact → Website

</details>

### ✅ 1b. Services list rewritten — DONE
Removed "Bar and bat mitzvah planning". Added Event decor design, Event decor
rental, Outdoor event planning, Party planning, Private event planning,
Religious event, Religious event planning. Google confirmed *"Your edit is
pending review. It may take up to one day to be published."*

**Caveat worth knowing:** Google's services editor only offers its own
predefined chips. The India-specific terms below — haldi, mehndi, roka, nikkah,
sangeet, gruhapravesham, namakarana — **cannot** be added as GBP services. They
live on the website instead, which is why the service pages matter.

<details>
<summary>Original wish-list (not achievable in the GBP editor)</summary>
Google auto-added generic categories. The list currently includes
**"Bar and bat mitzvah planning"** and is missing everything you actually sell.

Remove: Bar and bat mitzvah planning, Retirement party planning, School event
(unless you genuinely do these)

Add: **Haldi decoration · Mehndi decoration · Roka ceremony · Nikkah · Walima ·
Sangeet · Housewarming (Gruhapravesham) · Naming ceremony (Namakarana) ·
Reception · Engagement · Proposal setup · Room decoration · Balloon decoration ·
Floral decoration**

These are searched constantly in Bangalore. No competitor's list will match them
as precisely, and services feed Maps filtering and query matching.

**Note:** there's a pending notice — *"Services were changed based on feedback
from Google users or other sources."* Review and correct it while you're there.

</details>

### 1c. Add a cover photo + 20–30 photos — 45 minutes ⚡ *now the top job*
Currently no cover photo set; Google is actively prompting for one. The cover
photo is the first thing shown in the map pack.

Source: `~/Desktop/wedecor images` — 94 originals, many at 4624×3472 or
6720×4480. Best candidates already identified:
- `home page/engagement.jpg` — floral arch, velvet chairs
- `engagement/1664888637300.jpg` — gold drape arch (now your website hero)
- `home page/tent and baloon.jpg` — MARRY ME proposal setup
- `home page/haldi.jpg` — marigold and fairy lights
- `birthday/313A0339.JPG` — professionally shot, sharp

Avoid the ~25 phone photos with "EDMI NOTE 8 PRO" and a date burned into the
frame — crop the stamp off first if you want to use them.

Sort into Google's categories: Cover, Logo, Interior, Team, At work, Products.

### 1d. Add Products with prices — 20 minutes
The Products section is empty. This is where your starting prices should live,
visible directly in search results without anyone clicking through.

- Balloon Décor — from ₹3,000
- Floral Decoration — from ₹5,000
- Haldi Setup — from ₹5,000
- Engagement Stage — from ₹5,000
- Room Decoration — from ₹3,000

### ~~1e. Fix the primary phone~~ — no action needed
I got this wrong earlier. The GBP **primary** phone is already **088805 44452**,
matching the website and the WhatsApp link. The 095912 32166 I saw was the
secondary number showing on the public search panel. Nothing to change.

### 1f. Complete the "More" section — 10 minutes
`From the business`, `Accessibility`, `Amenities`, `Parking` are all empty.
These feed Maps filters. "From the business" is the one worth writing properly.

---

## 1.5 CTR rewrite — WRITTEN BUT NOT DEPLOYED

> **Status check, 20 Oct 2026.** The rewrite is still uncommitted. `git log`
> has HEAD at `cc284f6`; production still serves the old title
> `We Decor - Event Decoration Services in Bangalore`. **None of the numbers
> below reflect it.** Commit and deploy before measuring anything.

**Current baseline — measure against THIS (18 Jul – 17 Oct 2026):**

| Metric | 15 Jun – 14 Sep | 18 Jul – 17 Oct | Change |
| --- | --- | --- | --- |
| Clicks | 252 | **329** | +31% |
| Impressions | 13,200 | **16,500** | +25% |
| CTR | 1.9% | **2.0%** | flat |
| Average position | 9.9 | **9.7** | +0.2 |
| Queries | 785 | **948** | +21% |

**Read it carefully: the growth is visibility, not efficiency.** A quarter more
impressions converting at the same rate. That is the exact problem the rewrite
targets, and it is still unaddressed.

The case got stronger over the month, not weaker:

- **`event decorators near me`: 603 → 675 impressions, 6 → 5 clicks.** CTR fell
  from 1.0% to **0.74%**. More visibility on the most commercially valuable
  query in the market, fewer clicks from it.
- **Whitefield doubled** — 392 → 670 impressions, 5 → 11 clicks — and is now the
  strongest locality page, still at 1.6% CTR. Its rewritten snippet is in the
  undeployed batch.
- `/reviews` has started earning (4 clicks / 209 impressions, new entrant).
- Homepage share unchanged at **73%** of all clicks.

**The HTTP duplicate fix is working.** `http://` homepage went 3,258 → **1,681**
impressions and 46 → **20** clicks, roughly halved, from the two-minute GBP
website-field change. Best return of anything in this document.

**Watch, do not act on yet:** pages earning any impressions fell 62 → 54. Could
be variance across shifted windows, could be real. Check again next measurement.

The original diagnosis stands: you are seen and not clicked. Position ~9.7 with
16.5k impressions means the titles lose the click, not the ranking.

Three things were wrong. All three are fixed **in the working tree, not in
production** — they ship with the commit described above:

1. `pageMetadata()` **hardcoded the homepage title**, silently discarding what
   `app/page.tsx` passed. Editing the page alone would have changed nothing.
2. Titles said "Event decoration in X". The largest non-brand query is
   **"event decorators near me" (603 impressions, 6 clicks)** — the pages did
   not contain the phrase being searched. All 30 localities now lead with
   "Event decorators in/on X".
3. Descriptions were page copy, not snippets — atmospheric prose about load-in
   timing and waiter paths. Every one now carries proof (4.9★/76 reviews),
   a price floor (₹3,000) and the free-visit offer, in under 160 characters
   and with no two alike.

`tests/unit/serp-metadata.test.ts` fails the build if any of that regresses.

**What this is not:** a ranking fix. It multiplies impressions you already
have. Google also rewrites titles roughly a third of the time. If CTR moves
2.0% → 4%, that is ~330 → ~660 clicks a quarter with no new rankings.
"Event decorators near me" is won in the map pack — section 1c and 2 below.

**Still unanswered:** GA4 shows **24 key events in 7 days**. If those are
WhatsApp clicks the funnel is healthy and CTR is the right lever. If they are
page views counted as conversions, the problem is on-page, not the SERP.
Check this before drawing conclusions from the next measurement.

---

## 2. Reviews — the highest-leverage ongoing habit

You have **76 reviews at 4.9**. That's genuinely strong and it's your best asset.

Review count and recency are among the heaviest local-pack ranking factors.
Pop & Props — your closest comparable competitor — has a fraction of your reviews
and a weaker site, yet competes for the same "near me" searches.

**Do:** ask every happy customer, the day after the event, with a direct link.
Business Profile → "Ask for reviews" gives you a short link to paste into
WhatsApp.

Target 5–8 new reviews a month. Reply to every one — replies are a ranking
signal and take a minute.

---

## 3. Indexing — the backlog is closing on its own

**Status as of 28 Aug: 47 indexed / 44 not indexed.** Trend over three days:
34/59 → 39/56 → **47/44**. Every bucket improved.

| Reason | Was | Now |
| --- | --- | --- |
| Discovered – currently not indexed | 19 | **10** |
| Crawled – currently not indexed | 19 | **15** |
| Page with redirect | — | 15 (by design) |
| Not found (404) | — | 4 |

Security issues: **none**. Manual actions: **none**. HTTPS: 23/23.

### The real bug found today: four orphan service pages

`/services/home-decoration`, `/services/terrace-decoration`,
`/services/nikah-decoration` and `/services/car-decoration` were in
`sitemap.xml` but linked from **nowhere on the site**. URL Inspection confirmed
it: *"Referring page: None detected."* Google discovered them from the sitemap
and then declined to spend crawl budget, because a sitemap entry with no inbound
link is a weak signal on its own.

Cause: `app/services/page.tsx` hand-maintains `moreDecorations`, and these four
slugs were added to `SERVICE_PATHS` (so they reached the sitemap) without being
added to the hub. **Fixed** — all 16 leaf service pages are now linked, plus
`tests/unit/service-hub-links.test.ts` fails the build if a sitemap path ever
loses its last inbound link again.

Two of the four turned out to be indexed already (nikah, car). The other two
were submitted for indexing today.

### All 10 submitted (30 Aug)

Every URL in the "Discovered – currently not indexed" bucket is now in the
priority crawl queue:

| URL | Result |
| --- | --- |
| `/services/home-decoration` | Indexing requested |
| `/services/terrace-decoration` | Indexing requested |
| `/services/haldi-decoration` | Indexing requested |
| `/services/engagement-decoration` | Indexing requested |
| `/services/corporate-decoration` | Indexing requested |
| `/services/room-decoration` | Indexing requested |
| `/services/floral-decoration` | Indexing requested |
| `/services/anniversary-decoration` | Indexing requested |
| `/services/baby-shower-decoration` | Indexing requested |
| `/services/tent-balloon-setup` | Indexing requested |
| `/services/nikah-decoration` | Already indexed — no action |
| `/services/car-decoration` | Already indexed — no action |

Worth knowing for next time: for the 8 that already had both a sitemap entry
and a referring page, Google's own confirmation says *"Submitting a page
multiple times will not change its queue position or priority."* Submitting
them does no harm and costs only daily quota, but the crawl date is Google's
call either way. The two that genuinely needed it were the orphans.

**Never submit:** `/services/catering`, `/services/photographers`,
`/services/makeup-artists` — these 301 to `/services` by design.

### The 4 "Not found (404)" — checked, nothing to fix

They are malformed URLs that were never real pages:
`/&`, `/faq-FAQ`, `/reviews-Reviews`, `/locations-Locations`.

The `path-Label` shape looks like a broken link builder, so I checked the code
and then the live site directly: the homepage renders 63 links and **zero** match
that pattern, and nothing in `app/`, `components/` or `lib/` concatenates a label
onto an href. These came from somewhere outside the site — a scraper or an
aggregator that mangled anchor text into the URL. Last crawled Jul–Aug.

Returning 404 is the correct response for URLs that never existed. Leave them;
they age out of the report on their own. Do not add redirects for them.

### Next checkpoint
Once the orphan-link fix is deployed, check Pages again in ~a week. If
"Crawled – currently not indexed" keeps falling, the crawl-budget theory holds
and no content work is needed. If it stalls at ~15, section 4 becomes real.

---

## 4. Content quality — only if section 3 says so

19 pages sit in "Crawled — currently not indexed." Google looked at them and
declined. Resubmitting will not change that.

These are mostly the 32 templated locality pages. If Thursday's check shows
Google still refusing them, the honest fix is **fewer, better pages**:

- Cut to your 8–10 real service areas
- Give each genuinely distinct content: venues you have actually worked at,
  real setups, specific local detail (society rules, access constraints,
  typical venues in that area)
- More indexed pages beats more published pages

The location pages that *are* indexed do earn impressions — rt-nagar 296,
locations hub 314, rajajinagar 291, whitefield 220. So the format works when the
content is good enough to index. It is a quality problem, not a strategy problem.

---

## 5. Photography — the real ceiling on the website

The site now serves your best images at full resolution, but none of the 94
originals were shot for editorial use: fluorescent light, visible ceilings,
plastic chairs at frame edges.

If you want the website to look like the premium brand the copy claims:
shoot 5–8 setups properly. Daylight or a single warm light, phone is fine,
shoot wide and level, clear the frame first.

This is also what would let the About page carry real photographs of the three
stories it tells — the terrace proposal, the bedroom, the Roka — instead of none.

---

## What is already done (no action needed)

Committed and verified live:

- ✅ LCP fix — hero `loading="eager"`, `fetchpriority="high"`, preloads at both
  breakpoints (was an 11.8s LCP)
- ✅ Hero images re-exported at 2400px from camera originals
- ✅ Cinematic overlays lightened — the photo is visible now
- ✅ Gold brand lockup sitewide; favicons, PWA and Apple icons regenerated
- ✅ About page rewritten and redesigned on a single vertical axis
- ✅ Live Google reviews on homepage, `/reviews` and JSON-LD AggregateRating
- ✅ iOS input zoom fixed (16px inputs)
- ✅ Mobile nav 92px → 68px, section padding reduced
- ✅ Sitemap cleaned — 62 URLs, no redirecting partner paths
- ✅ 18 orphaned modules and 6 unused dependencies removed
- ✅ 32 junk files cleared from the repo root
- ✅ http→https redirect and canonical tags verified correct on the live site
- ✅ Four orphan service pages linked from `/services` + regression test added

### One thing that looks broken but isn't

Search Console → Enhancements → **Review snippets shows only 1 valid page**,
against 22 for Breadcrumbs. That is intentional and should stay that way.

`lib/schema/pages.ts` deliberately emits no `AggregateRating` or `Review` nodes
on service and reviews pages. Google ignores ratings a business publishes about
itself, so self-serving markup earns no rich result — and marking it up anyway
risks a structured-data manual action. Your 4.9★ from 76 reviews already shows
in the map pack, where it actually counts.

Do not "fix" this by adding rating markup to more pages.

---

## If you only do three things

The first two on the old list are done. What's left is the part only you can do
— everything remaining needs a phone, a camera, or your customers.

1. **Add a GBP cover photo + 20–30 photos** (45 min) — Google is actively
   prompting for the cover, and it is the first thing anyone sees in the map
   pack. Sources are already picked out in section 1c.
2. **Add GBP Products with starting prices** (20 min) — puts ₹3,000 / ₹5,000 in
   the search result itself, before anyone clicks.
3. **Ask every customer for a Google review, the day after** (ongoing) — review
   count and recency are among the heaviest local-pack ranking factors, and this
   is the one thing that compounds.

The website side is in good shape. 47 pages indexed and climbing, no security
issues, no manual actions, the HTTP duplicate collapsing, and the last real
crawl bug fixed today. The ceiling now is photography and reviews, not code.
