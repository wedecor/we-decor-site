# Cursor prompt — ship the audit fixes

Paste everything below the line into Cursor, in this repo.

---

You are working in the We Decor Events repo (`~/Desktop/wedecorwebsite`), a
Next.js 15 App Router marketing site deployed on Vercel. Read `CLAUDE.md`
first — it carries the project conventions and several traps this codebase has
already sprung.

## Context

`git log` HEAD is `8a17129`. There are **35 uncommitted files** containing a
full pass of security, SEO, accessibility and dependency fixes from a code
audit, plus two fixes made afterwards. `npm run typecheck` and `npm run lint`
both pass on the working tree. Nothing has been deployed.

**The single most urgent item is a live caching bug.** Verified on production
right now:

```
GET https://www.wedecorevents.com/services/birthday-decoration
  content-type:  text/html
  cache-control: public, max-age=31536000, immutable
```

A `/services/:path*` rule in `next.config.js` intended for WebP files matched
the whole route, so all 16 service pages told browsers and Google to cache the
HTML for a year and never revalidate. The fix (deleting that rule — the
`/:path*.webp` rule below it already covers WebP anywhere) is in the working
tree but not deployed. **Deploying the code is not sufficient**: anyone who has
already loaded a service page keeps the frozen HTML until the CDN is purged.

## Your tasks, in order

### 1. Verify the tree before committing

Run all four and confirm they pass. Do not proceed if any fail:

```bash
npm run typecheck
npm run lint
npx vitest run
npm run build
```

`npm run build` is the one that has not been run in this environment. If it
fails, fix the failure before committing — do not commit a tree that does not
build.

### 2. Commit in four logical commits, not one

35 files spanning dependencies, security, SEO and CI is too much to revert as a
unit. Group them so that if the SEO change needs reverting in three weeks it
comes out without taking the security hardening with it.

**Commit 1 — dependencies**
`package.json`, `package-lock.json`

```
chore(deps): upgrade Next to 15.5.28 and pin sharp 0.35.5

Next 15.5.22 sat in the GHSA-2xp9-vwfh-vxw4 advisory range (AVIF image
optimization RCE). This site enables AVIF in next.config.js images.formats,
so the advisory applied in practice and not only on paper.

Do not run `npm audit fix --force` — it pulls Tailwind 4 and the remaining
highs are Tailwind 3 transitive.
```

**Commit 2 — the cache bug and honest galleries**
`next.config.js`, `app/(site)/_data/gallery.ts`,
`app/(site)/locations/[slug]/page.tsx`, `components/LocationGallery.tsx`

```
fix(seo): stop serving service HTML with a year-long immutable cache

A `/services/:path*` Cache-Control rule meant for WebP matched the route, so
every service page sent `max-age=31536000, immutable` on text/html. Title and
copy changes to those 16 pages could not reach anyone who had already loaded
one. Verified live before and after: / and /locations/* correctly sent
must-revalidate throughout; only /services and /services/* were affected.

Deleted rather than narrowed — the `/:path*.webp` rule already covers WebP
anywhere, including under /services/. Never scope a long-cache header to a
route prefix; match the file extension.

Also: locality galleries no longer relabel one shared Cloudinary photo set
with each of 30 area names under a "Recent setups in {area}" heading. The same
images were claiming provenance in thirty neighbourhoods, which is a doorway
signal on pages Google is already slow to index. Alts are location-neutral and
the heading is about the work.
```

**Commit 3 — security, privacy, accessibility**
`app/api/contact/route.ts`, `lib/rate-limit.ts`, `lib/security/origin.ts`,
`lib/security/sanitize.ts`, `lib/security/sentry-scrub.ts`,
`lib/services/leads/validators.ts`, `env/validation.ts`, `middleware.ts`,
`sentry-client-init.ts`, `sentry.edge.config.ts`, `sentry.server.config.ts`,
`components/Navbar.tsx`, `app/api/csp-report/route.ts` (deleted),
`tests/unit/rate-limit-ip.test.ts`, `tests/unit/leads-validators.test.ts`

```
fix(security): trusted-hop rate limiting, CSP cleanup, Sentry PII scrubbing

- rate limit keys off Vercel's request IP / rightmost trusted XFF hop rather
  than the first, which is attacker-controlled
- CSP drops dead third-party hosts (Elfsight was removed from the reviews
  widget, jsDelivr is unused) and unsafe-eval. unsafe-inline stays: Next still
  emits inline bootstrap scripts.
- Sentry beforeSend strips request bodies, cookies and auth headers. The
  contact form carries names, phones and emails.
- contact route caps bytes while reading instead of trusting Content-Length,
  which a client can omit
- lead IP hash is HMAC-SHA-256 rather than a 32-bit string hash
- mobile nav gains aria-controls, Escape-to-close and a focus trap
- /api/csp-report deleted: it returned 200, was unreferenced by any CSP
  directive, and had no rate limit
```

**Commit 4 — CI, metadata, docs**
`.github/workflows/ci.yml`, `scripts/verify.sh`, `scripts/bundle-budgets.mjs`,
`app/sitemap.ts`, `lib/metadata.ts`, `lib/schema/service.ts`, `lib/site.ts`,
`app/(site)/_components/LocalBizJsonLd.tsx`, `app/(site)/_data/faqs.ts`,
`app/(site)/_data/locations.ts`, `app/(site)/locations/page.tsx`,
`CLAUDE.md`, `SITE_CONFIGURATION.md`, `DEPLOY_PROMPT.md`

```
fix(ci): unbreak Production Readiness; align titles, H1 and schema

The job had failed on every main push since 20 Aug because it grepped
.next/build-log.txt, which only `npm run build:log` writes. build:log now
writes artifacts/build-log.txt, matching the upload step.

Locality title, H1 and JSON-LD WebPage.name now use one phrase. Sitemap stops
stamping lastModified: now on every URL. GOOGLE_REVIEW_COUNT and CLAUDE.md
updated to the live 81 reviews and the current Search Console baseline.
```

### 3. Push and wait for Vercel

```bash
git push
```

Wait for the Vercel deployment to finish before the next step. Do not purge
the cache while the build is still running.

### 4. Purge the Vercel CDN — do not skip this

The code change stops *new* responses carrying the bad header. It does not
release clients that already cached a service page. In the Vercel dashboard:
project → Settings → Data Cache → **Purge Everything**, or redeploy with
"Use existing build cache" unchecked.

### 5. Verify on production, not locally

```bash
# must say must-revalidate, NOT immutable
curl -sI https://www.wedecorevents.com/services/birthday-decoration | grep -i cache-control

# must say must-revalidate
curl -sI https://www.wedecorevents.com/services | grep -i cache-control

# must be 0 — no alt may claim a shared photo was shot in a named area
curl -s https://www.wedecorevents.com/locations/koramangala | grep -o 'alt="[^"]*Koramangala[^"]*"' | wc -l

# must be 200
curl -s -o /dev/null -w '%{http_code}\n' https://www.wedecorevents.com/
curl -s -o /dev/null -w '%{http_code}\n' https://www.wedecorevents.com/services/haldi-decoration
```

Report the actual output of each. If the cache-control still says `immutable`,
the purge did not take — purge again rather than assuming propagation delay.

### 6. Confirm the CI job goes green

Check the Actions tab. "Production Readiness" has been red since 20 Aug 2026.
It should pass on this push. If it still fails, read the failing step and fix
it; do not disable the job.

## Rules

- **Do not run `npm audit fix --force`.** It upgrades to Tailwind 4. The
  remaining high advisories are Tailwind 3 transitive and are a separate,
  deliberate piece of work.
- **Do not commit `.env.local`**, and never print key values.
- **Do not use `--force` on any git command.**
- If `npm run build` fails, stop and fix it. Do not push a broken tree.
- If any verification in step 5 does not return the expected value, say so
  plainly rather than reporting success.

## What is deliberately not in scope

- **Locality pages are still templated.** The gallery fix removes the doorway
  signal, but `serviceDescriptions` are still generated from name and
  landmarks, and `uniqueFAQ` is empty on all 30 generated records. Writing
  genuinely distinct copy for 30 areas is content work, not a code change.
- **Upstash is not required in production.** Add `UPSTASH_REDIS_REST_URL`,
  `UPSTASH_REDIS_REST_TOKEN` and `LEAD_IP_HASH_SALT` to the Vercel project
  when convenient. Turnstile is carrying abuse prevention today and
  fail-closes in production.
- **Tailwind 3 transitive advisories.** Fixing them means Tailwind 4.
