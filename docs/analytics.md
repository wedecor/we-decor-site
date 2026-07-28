# Analytics — GTM + GA4

We Decor's analytics foundation is **Google Tag Manager (GTM)** loaded from the
Next.js App Router root layout, with **Google Analytics 4 (GA4)** configured
*inside* GTM (not loaded directly). Application code never talks to Google's
servers — it only pushes structured events onto the GTM `dataLayer`.

Analytics is **disabled in local development** and only runs in production
builds with a GTM container ID configured.

---

## 1. Architecture

```
app/layout.tsx
├── <GoogleTagManager />          — loads gtm.js + noscript fallback (production only)
├── <AnalyticsPageView />         — tracks SPA route changes as virtual page views
└── <WebVitalsReporter />         — lazy-loads Web Vitals reporting (production only)

lib/analytics/
├── config.ts        — env vars + isAnalyticsEnabled() gate (single source of truth)
├── dataLayer.ts      — pushToDataLayer(): the only place that touches window.dataLayer
├── events.ts          — public tracking API (trackEvent, trackWhatsAppClick, …)
└── conversion-events.ts — legacy lead-conversion helpers (generate_lead, form_error),
                           now routed through the same dataLayer, kept for
                           backward compatibility with existing GTM/GA4 triggers.

components/analytics/
├── GoogleTagManager.tsx      — server component, renders the gtm.js bootstrap script
├── AnalyticsPageView.tsx     — client component, fires trackPageView() on route change
├── TrackedWhatsAppLink.tsx   — drop-in <a> wrapper: whatsapp_click + quote_request
├── TrackedPhoneLink.tsx      — drop-in <a> wrapper: phone_click
├── TrackedCtaLink.tsx        — drop-in <Link> wrapper: cta_click
└── PricingPageView.tsx       — mounts once on /pricing: pricing_visit
```

**Design principles**

- **Single gate.** `isAnalyticsEnabled()` (in `lib/analytics/config.ts`) is the
  only place that decides whether tracking is active. Every other file
  delegates to it (directly or via `pushToDataLayer`), so there is exactly one
  switch to reason about.
- **No hardcoded IDs.** The GTM container ID and GA4 measurement ID are read
  from `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID` only.
- **Server-safe.** `GoogleTagManager` is a plain server component — the
  enabled/disabled decision is a build-time constant (`NODE_ENV` + env var),
  identical on the server and client render, so there is no hydration
  mismatch risk.
- **Client boundary kept small.** Tracking wrappers (`TrackedWhatsAppLink`,
  `TrackedPhoneLink`, `TrackedCtaLink`) are tiny leaf client components so
  parent components (e.g. `Footer.tsx`, location pages) can stay server
  components.
- **Everything no-ops safely.** `pushToDataLayer()` early-returns when
  `window` is undefined or analytics is disabled. Every function in
  `lib/analytics/events.ts` is safe to call unconditionally from anywhere.

---

## 2. Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | No (analytics off without it) | GTM container ID, e.g. `GTM-XXXXXXX`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 measurement ID, e.g. `G-XXXXXXXXXX`. Not used to load any script — seeded onto the dataLayer so GTM can read it as a variable (see §3). |

Set these in the Vercel dashboard for Production/Preview environments (see
`env/README.md` for the project's env-var conventions). **Never** set
`NEXT_PUBLIC_GTM_ID` in `.env.local` for everyday development — see §6 for why
it wouldn't matter even if you did.

The legacy `NEXT_PUBLIC_GA_ID` variable (direct `gtag.js` loading) has been
retired in favor of this GTM-based architecture.

---

## 3. How GTM works here

1. `components/analytics/GoogleTagManager.tsx` renders two inline
   `next/script` tags with `strategy="afterInteractive"` plus a `<noscript>`
   iframe fallback, placed at the top of `<body>` in `app/layout.tsx` —
   matching Google's official installation snippet.
2. **Before** `gtm.js` loads, we push
   `{ ga4MeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID }` onto the
   dataLayer. This lets the GA4 Configuration tag inside GTM reference
   `{{DLV - GA4 Measurement ID}}` (a Data Layer Variable) instead of a
   hardcoded Measurement ID — so the same GTM container can point at
   different GA4 properties per environment purely through env vars.
3. The whole component renders `null` when `isAnalyticsEnabled()` is `false`
   (any non-production build, or no `NEXT_PUBLIC_GTM_ID` set).

### One-time manual setup in the GTM web console

This code loads the container — it does **not** configure tags/triggers
(that lives in Google's UI, not in this repo). After deploying with
`NEXT_PUBLIC_GTM_ID` set, an admin needs to, once, inside GTM:

1. **Variable** — create a Data Layer Variable named `GA4 Measurement ID`
   with Data Layer Variable Name `ga4MeasurementId`.
2. **Tag** — create a "Google Analytics: GA4 Configuration" tag, set
   Measurement ID to `{{GA4 Measurement ID}}`, trigger: **Initialization —
   All Pages**.
3. **Trigger** — create a Custom Event trigger matching event name
   `page_view`, and a corresponding GA4 Event tag (event name `page_view`)
   so client-side (SPA) navigations tracked by `AnalyticsPageView` also reach
   GA4. (The very first page load per session is already covered by the
   Configuration tag's own automatic page view — see §7 on duplicate
   prevention.)
4. **Triggers + GA4 Event tags** for each custom event listed in §4 that you
   want forwarded to GA4 (Custom Event trigger matching the event name, GA4
   Event tag with the same event name, "Send Ecommerce data" off).
5. **Publish** the container version.

---

## 4. How GA4 works here

GA4 is never loaded or configured directly by application code — it is
configured entirely inside the GTM container (step 2–4 above). Application
code's only job is pushing well-named events onto `window.dataLayer` via
`lib/analytics/events.ts`; GTM's triggers decide which of those become GA4
events.

---

## 5. Tracked events

All events are pushed via `lib/analytics/events.ts` (or, for two legacy
events, `lib/analytics/conversion-events.ts`). `cta_source` values identify
*where* on the site the action happened.

| Event | Fired by | Where | Notes |
|---|---|---|---|
| `whatsapp_click` | `trackWhatsAppClick(source)` | Every WhatsApp CTA site-wide (home, footer, pricing, service pages, location pages, FAQ, contact) | `cta_source` identifies the CTA, e.g. `home_hero`, `footer`, `service:haldi-decoration`, `location:koramangala` |
| `quote_request` | `trackQuoteRequest(source)` | Fired alongside every `whatsapp_click` (every WhatsApp CTA here is a quote request) and on contact-form success | Primary business-conversion event — mark this as a GA4 Conversion |
| `phone_click` | `trackPhoneClick(source)` | Every `tel:` CTA site-wide | |
| `form_submit` | `trackFormSubmit(formName, status)` | Contact form — `attempt` \| `success` \| `error` | `form_name` is currently always `contact_form` |
| `generate_lead` / `form_error` | `lib/analytics/conversion-events.ts` | Contact form (legacy, pre-dates this GTM migration) | Kept so existing GA4/GTM configurations tied to these event names keep working; new setups should prefer `form_submit` + `quote_request` |
| `pricing_visit` | `trackPricingVisit()` | `/pricing` mount (`components/analytics/PricingPageView.tsx`) | Fires once per page load |
| `portfolio_image_click` | `trackPortfolioImageClick(category, index)` | `Gallery.tsx` (opening a collection), `ImageModal.tsx` (viewing a fullsize image), `LocationGallery.tsx` (location-page gallery) | `action` param distinguishes `open_collection` vs `view_fullsize` |
| `cta_click` | `trackEvent('cta_click', { cta_source, cta_label })` | Navbar "Enquire" (desktop + mobile), Footer "Contact form" | Generic internal-navigation CTA clicks |
| `page_view` | `trackPageView(path)` | `AnalyticsPageView.tsx` on every SPA route change **after** the first | See §7 — the very first page view is intentionally not sent from here |
| `web_vitals` | `lib/web-vitals-report.ts` | Core Web Vitals (CLS, FID, INP, LCP, TTFB) | Loaded lazily, production only |

---

## 6. Naming convention

- Event names: `snake_case`, verb-free nouns matching GA4 conventions
  (`whatsapp_click`, not `trackWhatsappClicked`).
- Every click-based event carries a `cta_source` (or `gallery_category` /
  `form_name` where more specific) identifying *where* the action happened,
  using `component_name` or `page:identifier` formatting, e.g.
  `service:birthday-home-decoration`, `location:koramangala`.
- Parameters are `snake_case` to match GA4's own parameter naming.

---

## 7. Avoiding duplicate `page_view` events

GTM's GA4 Configuration tag automatically sends a `page_view` when the
container first loads (the real, full page load). `AnalyticsPageView`
deliberately **skips tracking on its first render** and only calls
`trackPageView()` on subsequent client-side route changes — so the landing
page is never double-counted, and only genuine SPA navigations get a
"virtual" page view.

---

## 8. Adding a new tracked event

1. Add a new function to `lib/analytics/events.ts` (or reuse `trackEvent()`
   directly for a one-off) following the naming convention in §6.
2. Call it from the relevant component. Prefer the existing
   `TrackedWhatsAppLink` / `TrackedPhoneLink` / `TrackedCtaLink` wrappers for
   new CTAs instead of writing new `onClick` handlers by hand.
3. In the GTM web console: add a Custom Event trigger matching the new event
   name, and a GA4 Event tag wired to that trigger.
4. Document the event in the table in §5.
5. No app code changes are needed to see the event in GA4 — only GTM/GA4
   configuration.

---

## 9. Deployment steps

1. In Vercel → Project → Settings → Environment Variables, set
   `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` for the
   Production environment (and Preview, if you want tracking there too — not
   recommended for a public GA4 property).
2. Complete the one-time GTM console setup in §3.
3. Deploy. Analytics activates automatically — no code changes required to
   turn it on/off, it is purely a function of environment configuration.
4. Verify in production: open the deployed site, open DevTools → Network,
   confirm a request to `googletagmanager.com/gtm.js?id=GTM-XXXXXXX`, then
   check GA4 → Admin → DebugView or Realtime for incoming events.
5. To disable analytics entirely (e.g. temporarily), remove/blank
   `NEXT_PUBLIC_GTM_ID` in Vercel and redeploy — `GoogleTagManager` will stop
   rendering anything.

---

## 10. Local development

Analytics is **always off** in `npm run dev` — `isAnalyticsEnabled()`
requires `NODE_ENV === 'production'`, and `next dev` always sets
`NODE_ENV=development` regardless of `.env.local`. Setting
`NEXT_PUBLIC_GTM_ID` locally has no effect until you run a production build
(`next build && next start`), which is the recommended way to test the full
pipeline before deploying (see the manual verification steps used in this
project's own QA pass: navigate the site with `window.dataLayer` open in the
console and confirm events append as you interact with WhatsApp/phone CTAs,
the pricing page, and the gallery).
