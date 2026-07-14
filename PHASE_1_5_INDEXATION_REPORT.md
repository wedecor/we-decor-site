# Phase 1.5 — Google Indexation Recovery Report

**Site:** https://www.wedecorevents.com  
**Date:** 2026-07-15  
**Scope:** Indexability / crawlability only (no UI redesign, no content rewrite, no new service pages)

---

## Executive summary

Phase 1.5 strengthened crawl paths to `/reviews` and the core page graph, enforced a single robots sitemap reference, improved semantic section structure on thin pages, and prepared content/locality/missing-service reports for Phase 2+.

GSC context addressed: discovery gaps (especially Reviews), weak internal linking, and crawl depth — not yet thin unique locality content (Phase 2 content work).

---

## Task reports

### 1. Reviews discovery (fixed)

| Path | Before | After |
|------|--------|-------|
| Sitemap | Included | Included |
| Navbar | Missing | **Reviews** |
| Footer | Missing | **Reviews** |
| Homepage | Trust strip only | Trust strip + testimonials → `/reviews` |
| Service templates | Missing | Plan-your-event links include reviews |
| Locality pages | Explore link | Retained + About/Locations hub |
| Locations hub | Missing | Links to reviews |
| Reviews page | No breadcrumbs | Breadcrumbs + Explore block |

### 2. Internal link graph (strengthened)

Shared component: `CoreExploreLinks` + varied anchors in `lib/seo/core-explore-links.ts`.

Targets with ≥3 inbound/outbound after changes:

- Home ↔ Services ↔ Pricing ↔ Gallery ↔ Reviews ↔ Locations ↔ Contact ↔ About ↔ FAQ  
- Every decoration/partner service → Pricing, Gallery, Reviews, Contact, About, Localities  
- Every locality → Services, Pricing, Gallery, Reviews, Contact, About, Locations hub  

**No orphans.** Post-ship crawl of all sitemap URLs: every page has ≥3 inbound and ≥3 outbound HTML links (nav/footer + explore + locality ring + partner/service cross-links).

### 3. Thin content audit (no rewrite)

| Page | Approx. words | Issues | Phase 2 readiness |
|------|---------------|--------|-------------------|
| About | ~250–350 | Shares “editorial / venue / calm” tropes with service pages | Needs unique story, team, process |
| Services hub | ~100–150 | Directory, not content | Needs intro + occasion intent blocks |
| Partner services | ~80–120 each | Template-identical shells | Needs unique intent per vertical |
| Gallery | ~40–60 prose | Image-led, almost no body | Needs collection intros / captions SEO |
| Pricing | ~180–250 | Tier labels only | Needs inclusions, occasion bands |
| FAQ | ~150–200 | 5 generic Qs | Needs deeper, linked answers |

**Status:** Pages structurally prepared (H2 purpose, explore links, breadcrumbs). **Content expansion deferred.**

### 4. Locality page audit (structural only)

| Signal | Finding |
|--------|---------|
| Shared structure | ~100% identical section order (30 pages) |
| Shared FAQs | 6 shared FAQ templates + generated uniques |
| Shared gallery | Same 12 images; alt/caption area-swap only |
| Shared headings | Same H2 pattern with `{area}` token |
| Uniqueness | Landmarks, vibe, bodyCopy, sparse meta overrides |

**Structural improvements shipped:** full SERVICE_LINKS for Anniversary / Proposal / Baby Shower (mapped to closest existing service URLs), About + Locations hub in Explore.

**Not done (Phase 2):** unique gallery sets, unique FAQ bodies, differentiated headings.

### 5. Missing service pages (report only — not built)

| Demand signal | Standalone `/services/*` | Notes |
|---------------|--------------------------|-------|
| Baby Shower | **Missing** | Locality SERVICES + gallery + form |
| Anniversary | **Missing** | Locality SERVICES + gallery |
| Proposal | **Missing** | Locality SERVICES; schema aliases engagement |
| Nikah | Not in UI | No current demand signal |
| Balloon | Exists as `tent-balloon-setup` | Partial naming match |
| Floral | **Missing** | Gallery tags only |
| Terrace | **Missing** | Copy-only keyword |
| Home | Partial (`room-decoration`, `birthday-home-decoration`) | Present |

### 6. Sitemap audit

- Single generator: `app/sitemap.ts` → `/sitemap.xml`
- Includes all static hubs, `SERVICE_PATHS`, 30 localities, `/reviews`
- No duplicates in generator
- `/api/sitemap.xml` is **redirect only** (legacy) — not listed in robots
- Image sitemap remains at `/image-sitemap` but **no longer listed in robots** (Task 6: one sitemap reference)

### 7. Robots audit

```
Allow: /
Disallow: /api/, /_next/, /admin/, /private/
Host: https://www.wedecorevents.com
Sitemap: https://www.wedecorevents.com/sitemap.xml
```

Preview env still disallows all.

### 8–9. Content quality signals & crawl depth

- Breadcrumbs + JSON-LD on About, FAQ, Pricing, Gallery, Reviews, Services hub (plus prior service/locality)
- Clear H2 purpose headings without rewriting marketing copy
- Sitewide Reviews in nav/footer → important pages ≤ 2 clicks from home

---

## Page ratings (indexation readiness)

| Page / group | Rating |
|--------------|--------|
| Homepage | **Good** |
| Service decoration pages | **Good** |
| Locality pages (structure) | **Needs Improvement** (duplication risk) |
| Partner service pages | **Needs Improvement** (thin) |
| About | **Needs Improvement** |
| Services hub | **Needs Improvement** |
| Gallery | **Needs Improvement** |
| Pricing | **Needs Improvement** |
| FAQ | **Needs Improvement** |
| Reviews | **Good** (discovery fixed; still embed-dependent) |
| Contact | **Good** |
| Locations hub | **Good** |

None rated **Critical** for crawl *blocking* after Phase 1.5. Locality duplication remains the largest indexation quality risk (soft signals → “Crawled – currently not indexed”).

---

## Remaining risks

1. **Thin / near-duplicate locality pages** — Google may still leave many in “Discovered/Crawled – not indexed” until unique content/media ships.
2. **Missing occasion URLs** — Baby Shower / Anniversary / Proposal demand without canonical pages.
3. **Partner pages** — template shell may underperform vs decoration pages.
4. **GSC lag** — indexing recovery is not instantaneous after ship.
5. **Image sitemap** — still available but not in robots; submit manually only if needed.

---

## Is the website ready for Phase 2 (Schema.org)?

**Yes, for starting Schema.org work**, with conditions:

- Crawl foundations (sitemap, robots, reviews discovery, internal graph) are in place.
- Schema should not be used to paper over thin/duplicate locality content.
- Phase 2 should still prioritize **unique locality & thin-page content** alongside/or immediately after schema, or “Crawled – not indexed” volume will persist.

**Blocker for expecting GSC indexed-count recovery from schema alone:** No. Schema helps understanding; **content uniqueness** drives bulk locality indexation.
