# We Decor Events — working notes for Claude

Marketing site for an event decoration business in Bengaluru, run by two
founders. Next.js 15 App Router, Tailwind, deployed on Vercel.

**Leads arrive on WhatsApp, not by email.** Almost every CTA on the site is a
WhatsApp link. That shapes most decisions here.

---

## Commands

```bash
npm run dev         # local, analytics disabled regardless of .env.local
npm run typecheck   # tsc --noEmit
npm run lint        # eslint, --max-warnings=0 (warnings fail)
npm test            # playwright
npx vitest run      # unit tests in tests/unit
```

Lint runs with `--max-warnings=0`, so an unused import fails the build. If you
remove the last consumer of a variable, remove the variable.

**The Impeccable design plugin is not in git.** `.claude/` and `.cursor/` are
ignored — committing them means ~4.5MB of third-party files duplicated across
both harnesses plus a 17MB platform-specific engine binary each, pinned at a
version upstream has moved past. Reinstall it on a new machine with:

```bash
npx impeccable install --providers=claude,cursor --scope=project
```

Then `/impeccable init` in the agent chat. Its `DESIGN.md` must derive from the
house rules below, not contradict them — where Impeccable's defaults disagree,
the house rules win, because they came from the owner rejecting real work.

---

## Things that have bitten before

**`pageMetadata()` used to hardcode the homepage title** and silently discard
whatever `app/page.tsx` passed. It no longer does, but the lesson stands: check
`lib/metadata.ts` before assuming a page controls its own title. `withBrandTitle`
appends `| We Decor` — do not add the brand yourself or it doubles up.

**Sitemap entries need an internal link.** Four service pages
(`home-decoration`, `terrace-decoration`, `nikah-decoration`, `car-decoration`)
sat in `sitemap.xml` with no inbound link anywhere. Search Console reported
"Discovered – currently not indexed / Referring page: None detected" and Google
never crawled them. `tests/unit/service-hub-links.test.ts` now fails the build
if a sitemap path loses its last inbound link. Adding a slug to `SERVICE_PATHS`
means adding it to `moreDecorations` in `app/services/page.tsx` too.

**Do not add `AggregateRating` to more pages.** The homepage LocalBusiness node
already emits it (`buildLocalBusiness()`). `/reviews` deliberately does not
(`buildReviewsPageGraph`). Google ignores ratings a business publishes about
itself, so extra copies earn no rich result and risk a structured-data manual
action. Search Console showing "Review snippets: 1 valid page" is the correct
state, not a bug. The real 4.9★ / 81 reviews (see `GOOGLE_REVIEW_COUNT` in
`lib/local-seo/constants.ts`) show in the map pack, where they count. Update
the constant when Places drifts.

**The schema.org organisation logo is the ink lockup on cream**
(`/brand/logo-schema.png`), not the gold one. Google composites org logos onto
light surfaces, where gold on white is unreadable and a transparent PNG has no
background to save it.

**The hero image must never be lazy.** It was once `loading="lazy"`, which gave
an 11.8s LCP on mobile. `components/home/home-hero.tsx` uses a single
`next/image` with `fill`, `priority`, and `fetchPriority="high"` so the 16:9
banquet frame is the LCP image. Do not set `loading="lazy"` on it.

**`npm run locations:sync` used to destroy hand-written locality content.**
`app/(site)/_data/locations.ts` says AUTO-GENERATED, but it had been hand-edited
for months: `getAreaBySlug`, `getAllAreaSlugs`, the `heroTagline` / `waPrefill` /
`uniqueFAQ` fields on 10 areas, and richer `vibe` / `landmarks` / `venueTypes`
on those same 10 existed only in the generated file. The generator emitted none
of it, so the first `locations:sync` run in months silently wiped all of it and
broke typecheck. Fixed Oct 2026: the generator now emits both helpers and the
extra `Area` fields, `content/locations/overrides.json` holds the per-slug
hand-written content and is merged in (sync fails loudly if it names a slug with
no CSV row), the 10 stale CSV rows were resynced, and sync runs prettier so the
output does not fail lint. **Never hand-edit `locations.ts`** — put prose in
`overrides.json` and facts in the CSV. After any sync, diff against the previous
`locations.ts` and confirm no area lost a field.

**The hero needs a height on mobile and the aspect ratio only on desktop.**
`aspect-ratio: 16 / 9` was put on `.lux-hero-root` (`components/lux/
CriticalStyles.tsx`) so the whole banquet frame would show. At 375px wide that
is a **211px strip**, while the overlaid eyebrow, 84-character h1, body and two
CTAs are **564px** — so `overflow: hidden` clipped the lot and the `<h1>`
rendered at `top: -293px`, entirely off-screen. Every phone visitor landed on a
homepage with no headline. The ratio now applies only at `min-width: 768px`;
below that the hero is `min-height: 88svh` (with a `88vh` fallback first).
Verified at 375×812: hero 715px, content 564px, nothing clipped. **Never give
`.lux-hero-root` a definite height smaller than its own content**, and check any
hero change at 375px before calling it done — desktop hides this entirely.

**Verify against the live site before diagnosing.** Several confident diagnoses
in this repo's history were wrong because they were made from the code alone —
a "missing" set of service pages that existed in a file the grep missed, a
"broken" hero that had already been fixed, a GBP phone number that was already
correct. Check production, then conclude.

---

## Design system

Tokens live in `lib/design/tokens.ts` and `tailwind.config.js`; they must agree.
Everything is `lux-*`: `lux-bg` `#0F0A12`, `lux-gold` `#C8A96B`, `lux-ivory`
`#F5F0E6`, `lux-secondary`, `lux-text-muted`. Layout helpers are `lux-section`,
`lux-section-tight`, `lux-btn-primary`, `lux-btn-secondary`, `lux-footer-link`.

The site is dark-only. `dark` is hardcoded on `<html>`; there is no theme
toggle and no light mode.

**Fonts are Cormorant Garamond (display) + Jost (body).** Not Inter — it was
never in the brand kit, and the owner rejects it on sight. `--font-jost`.

### House rules — these are enforced taste, not preference

The owner identifies a specific set of patterns as "AI-generated" and rejects
work containing them. All of these were found in this codebase and removed in
Oct 2026; do not reintroduce any of them.

- **No gradient fills** on buttons, cards or page backgrounds. Flat colour.
- **No glow or drop shadows** for separation. Use a 1px hairline rule.
- **No inset white highlights** (`inset 0 1px 0 rgba(255,255,255,…)`) — that is
  the glassmorphism tell, a fake light source on a flat surface.
- **No radial "glow blobs"** on backgrounds. The hero vignette is the one
  exception: it is photographic treatment that keeps the headline legible, not
  decoration.
- **Border radius ≤ 4px.** Anything above 8px reads as a floating card.
- **No pill buttons** (`rounded-full`). Buttons are 4px.
- **No three-column feature-card sections** — icon, heading, blurb. A grid of
  real photographs is not this and is fine; `home-services` is six photos of
  actual work and should stay.
- **No decorative avatars**, fake initials or chips carrying no information.

**The emerald teal `#00B89C` is dead.** It survived a first cleanup because
only the `--lux-emerald` token was removed and the raw hex values were not
grepped — the primary CTA stayed teal for weeks afterwards, failing WCAG AA at
2.96:1. If you remove a colour, grep every hex form of it:
`00b89c 009e88 00ad96 00a892 00c2a8` and the `rgba(0, 184, 156, …)` form.

**Mobile first, and that is not a slogan.** Most visitors are on phones. Inputs
must stay at `text-base` (16px) on mobile or iOS force-zooms the form. Nav
lockup renders at 34px on mobile, 46px on desktop.

### Brand

Artwork comes from the official brand kit (charcoal/cream/slate/gold, Marcellus
wordmark). `components/lux/BrandLockup.tsx` is the only place lockups are
rendered — `nav` (mark + wordmark) and `footer` (with the
`EVENTS · DECOR · CELEBRATIONS` descriptor). The nav variant omits the
descriptor on purpose: at 34px its caps are under 3px and turn to mush.

---

## SEO — what the data actually says

Baseline 18 Jul – 17 Oct 2026 (Search Console, see ACTION_PLAN.md §1.5):
**329 clicks, 16.5k impressions, 2.0% CTR, average position 9.7.**
The prior window (15 Jun – 14 Sep) was 252 / 13.2k / 1.9% / 9.9.
Growth is impressions, not CTR — still *seen but not clicked*.

- **73% of clicks go to the homepage.** Location pages are the only other
  format earning traffic. **Service pages earn approximately nothing** — do not
  invest more effort there without evidence it changed.
- The largest non-brand query is **"event decorators near me" (675 impressions,
  5 clicks, 0.74% CTR)**. Titles say "decorators", not "decoration", because of
  this. Do not use the older 603 / 6 figures.
- Brand queries convert at ~22%, non-brand at ~1%. The gap is the map pack, and
  the map pack is won on the Google Business Profile, not in this repo.

**The business operates out of Basavanagudi and JP Nagar** — one GBP pin in
south Bengaluru. Proximity drives the *map pack*, so ad geo-targeting and GBP
posts belong inside roughly 8 km: Jayanagar (2.3 km), Bannerghatta Road (2.4),
BTM Layout (2.9), Banashankari (3.4), Kanakapura Road (3.6), Richmond Town
(3.8), Ashok Nagar (4.3), Vijayanagar (5.2), Koramangala (5.3), Rajajinagar
(6.0), HSR Layout (6.4).

**Distance does not predict organic performance, and it is a mistake to assume
it does.** Per-page Search Console, 18 Jul – 17 Oct 2026: the best locality page
is **Whitefield, 22 km away — 678 impressions / 11 clicks**, ahead of Hebbal
(266/5) and RT Nagar (256/5), all outside the ring. Inner ring 2,026 impressions
/ 38 clicks (1.9%); outer ring 1,705 / 28 (1.6%). Near-parity. Do not deprioritise
or delete the outer pages on a proximity argument — that conclusion was drawn
once from distance alone and the data refuted it.

The real split is by *problem type*, not distance:
- **Ranking but not clicked** — Basavanagudi 299 impressions / **0 clicks**,
  Vijayanagar 158/1, Jayanagar 258/5, BTM Layout 245/5. Snippet problem.
- **Barely ranking** — JP Nagar 14, Ulsoor 12, Richmond Town 14, Banashankari 7,
  Kanakapura Road 19. Content and internal-link problem; snippet rewrites cannot
  help a page nobody sees. JP Nagar sitting at 14 impressions while Mathikere
  gets 20 is the clearest gap on the site.
- Ashok Nagar and the `/locations/bangalore` catch-all drew **zero** impressions.

Caution when reading that table: every snippet rewrite shipped on **21 Oct 2026**
(`7915da7`), *after* the window above closed. Those CTR figures measure the old
atmospheric copy. Do not rewrite these snippets again before a fresh window —
re-measure from late Nov 2026.

Locality snippets in `app/(site)/_data/location-metadata.ts` are **search
snippets, not page copy**: lead with "Event decorators in X", then proof
(4.9★ / 81 reviews), then an offer, under 160 characters, no two alike.
`tests/unit/serp-metadata.test.ts` enforces all of that.

Claims that are verified and safe to use: 4.9★, 81 reviews, Bengaluru, since
2022, free site visit, from ₹3,000, often same or next day. **Do not invent
others.** Keep `GOOGLE_REVIEW_COUNT` in `lib/local-seo/constants.ts` in step
with Places.

---

## Analytics

GTM (`GTM-K46BR4ZT`) loads GA4 (`G-6L9VRFJ4Q5`), both `lazyOnload` so they never
contend with LCP. IDs come from Vercel env vars; `.env.local` deliberately has
none, and `isAnalyticsEnabled()` is false outside production — so analytics
never fires in dev.

Conversions: the enquiry form fires `generate_lead` and redirects to
`/thank-you` (noindex, not in the sitemap). That page exists to make conversion
measurable — an event alone was ambiguous.

Sentry is installed and wraps the production build only; it breaks dev chunks.

---

## Gotchas

- `.env.local` is never committed. Never print key values, even partially.
- Dev server caches aggressively. If CSS or images look stale:
  `rm -rf .next && npm run dev`.
- `next build` will not complete inside a short-lived sandbox. Run typecheck and
  lint instead, then let Vercel build.
- Deploys are manual — the user commits and pushes. Do not assume work is live.
- Partner service slugs (`catering`, `photographers`, `makeup-artists`,
  `hair-stylists`, `mehndi-artists`, `videographers`) 301 to `/services` by
  design. Never submit them for indexing.

---

## Tone

The About page copy was rewritten many times because drafts "sounded AI".
What worked: plain first person, no em-dash pile-ups, no triads, no invented
detail, no throat-clearing. If you draft customer-facing copy, write the way the
About page reads now — and expect to cut your first attempt in half.
