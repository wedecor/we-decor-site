# ROOT CAUSE ANALYSIS — GTM Absent from Production HTML

**Date:** 2026-07-13
**Site:** wedecorevents.com
**GTM Container:** GTM-K46BR4ZT
**GA4 Measurement ID:** G-6L9VRFJ4Q5

---

## Root Cause

**All analytics implementation files exist only in the local working directory and have never been committed to git.** Vercel deploys from the git repository, so the production build contains none of the analytics code. The deployed `app/layout.tsx` is the old version — it does not import or render `GoogleTagManager` or `AnalyticsPageView`.

---

## Evidence

### 1. Untracked files (`??` in git status)

The following files have **never** been committed:

| File | Git Status |
|------|-----------|
| `components/analytics/` (entire directory) | `??` (untracked) |
| `lib/analytics/config.ts` | `??` (untracked) |
| `lib/analytics/dataLayer.ts` | `??` (untracked) |
| `lib/analytics/events.ts` | `??` (untracked) |

### 2. Modified but uncommitted files

| File | Git Status |
|------|-----------|
| `app/layout.tsx` | `M` (modified, not staged) |
| `env/validation.ts` | `M` (modified, not staged) |
| `lib/env.ts` | `M` (modified, not staged) |
| `lib/analytics/conversion-events.ts` | `M` (modified, not staged) |

### 3. Git history confirms absence

```
git log --all --oneline -- 'components/analytics/GoogleTagManager.tsx'
```

**Result: empty** — the file has never existed in any branch or commit.

### 4. Deployed layout.tsx does not reference analytics

The `git diff app/layout.tsx` shows the committed (deployed) version:
- Imports `Script` from `next/script` and `GA_ID` from `@/lib/gtag`
- Renders a basic `gtag.js` snippet gated on `GA_ID`
- Does **not** import `GoogleTagManager` or `AnalyticsPageView`

The local (uncommitted) version:
- Imports `GoogleTagManager` from `@/components/analytics/GoogleTagManager`
- Imports `AnalyticsPageView` from `@/components/analytics/AnalyticsPageView`
- Renders `<GoogleTagManager />` and `<AnalyticsPageView />` in the body
- Removes the old `gtag.js` snippet entirely

### 5. Vercel environment variables are irrelevant without the code

`NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` are set in Vercel, but the deployed code never reads them because `lib/analytics/config.ts` (which exports `GTM_ID`, `GA_MEASUREMENT_ID`, and `isAnalyticsEnabled()`) does not exist in git.

### 6. No `.env.production` file

No `.env.production` file exists locally. All `.env*` files are gitignored. This is not the root cause (Vercel env vars are set correctly), but confirms the env vars play no role when the consuming code is absent.

### 7. `next.config.js` is clean

`next.config.js` does not manipulate, filter, or override any `NEXT_PUBLIC_*` environment variables. CSP headers already allow `googletagmanager.com` in `script-src`, `connect-src` (via `https:`), and `frame-src`. No build-time interference.

---

## Confidence Level

**100%.** This is not speculative. `git status` and `git log` definitively prove the files were never committed. Vercel deploys from git. Therefore production cannot contain code that does not exist in git.

---

## Exact Fix

Execute the following commands from the project root:

```bash
# Stage all analytics implementation files
git add components/analytics/GoogleTagManager.tsx
git add components/analytics/AnalyticsPageView.tsx
git add lib/analytics/config.ts
git add lib/analytics/dataLayer.ts
git add lib/analytics/events.ts

# Stage modified files that support analytics
git add app/layout.tsx
git add env/validation.ts
git add lib/env.ts
git add lib/analytics/conversion-events.ts

# Commit
git commit -m "feat(analytics): add GTM + GA4 analytics implementation

- GoogleTagManager server component with dataLayer seed
- AnalyticsPageView client component for SPA route tracking
- Analytics config with isAnalyticsEnabled() production guard
- Event tracking helpers (page_view, whatsapp_click, phone_click, etc.)
- Updated layout.tsx to render analytics components
- Updated env validation to include GTM_ID and GA_MEASUREMENT_ID"

# Push to trigger Vercel rebuild
git push origin main
```

After the Vercel build completes, the production site will:
1. Read `NEXT_PUBLIC_GTM_ID` (already set in Vercel) at build time
2. `isAnalyticsEnabled()` will return `true` (production + non-empty GTM_ID)
3. `<GoogleTagManager />` will render the GTM snippet with container `GTM-K46BR4ZT`
4. GTM will load and fire all configured tags

Then return to GTM, run Preview Mode to verify, and Publish the container.

---

## Files Involved

| File | Role | Status |
|------|------|--------|
| `components/analytics/GoogleTagManager.tsx` | Renders GTM `<script>` tags and `<noscript>` fallback; seeds GA4 Measurement ID onto `dataLayer` | Untracked |
| `components/analytics/AnalyticsPageView.tsx` | Tracks SPA route changes as virtual page views via `dataLayer` | Untracked |
| `lib/analytics/config.ts` | Exports `GTM_ID`, `GA_MEASUREMENT_ID`, `isAnalyticsEnabled()` | Untracked |
| `lib/analytics/dataLayer.ts` | `pushToDataLayer` helper | Untracked |
| `lib/analytics/events.ts` | Event tracking functions (`trackPageView`, `trackWhatsAppClick`, etc.) | Untracked |
| `lib/analytics/conversion-events.ts` | Conversion event helpers | Modified, not committed |
| `app/layout.tsx` | Root layout — imports and renders analytics components | Modified, not committed |
| `env/validation.ts` | Env spec includes `NEXT_PUBLIC_GTM_ID` with `requiredInProduction: false` | Modified, not committed |
| `lib/env.ts` | Centralized env config reads `NEXT_PUBLIC_GTM_ID` | Modified, not committed |

---

## GTM Container Status

The GTM container **GTM-K46BR4ZT** is fully configured and ready to publish:

- 1 Variable: `GA4 Measurement ID` (Data Layer Variable)
- 9 Tags: GA4 Configuration + 8 GA4 Event Tags
- 8 Triggers: Custom Event triggers for all tracked events
- 18 Workspace Changes pending publish

**Blocked on:** analytics code reaching production (the fix above).
