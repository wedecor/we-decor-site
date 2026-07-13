# Environment variables

This directory is the **single source of truth** for which variables the app expects and how they must be configured.

## Rules

1. **Never commit real secrets** — only `env/.env.example` (placeholders) belongs in git.
2. **Local development:** copy `env/.env.example` → project root `.env.local` and fill values locally.
3. **Production / Preview:** set variables in the [Vercel project dashboard](https://vercel.com/docs/projects/environment-variables). Do not use `.env.production` in the repo.
4. **Server-only secrets** must **not** use the `NEXT_PUBLIC_` prefix (they would be embedded in client bundles).

## Variable reference

| Variable | Scope | Required | Description |
|----------|--------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public | Yes (prod) | Canonical site URL (`https://www.wedecorevents.com`) |
| `NEXT_PUBLIC_GTM_ID` | Public | No | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`). See `docs/analytics.md`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | No | GA4 measurement ID, seeded onto the dataLayer for GTM. See `docs/analytics.md`. |
| `NEXT_PUBLIC_SENTRY_DSN` | Public | No | Sentry browser DSN |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD` | Public | No | Cloudinary cloud name (public) |
| `NEXT_PUBLIC_GOOGLE_PLACE_ID` | Public | No | Google Maps Place ID for reviews widget |
| `SENTRY_DSN` | Server | No | Sentry server DSN |
| `GOOGLE_PLACES_API_KEY` | Server | No | Google Places API key (restrict by IP/referrer) |
| `CLOUDINARY_API_KEY` | Server | No | Cloudinary API key (upload scripts only) |
| `CLOUDINARY_API_SECRET` | Server | No | Cloudinary API secret (upload scripts only) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Prod recommended | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Server | Prod recommended | Turnstile server verification |
| `RESEND_API_KEY` | Server | No | Admin email via Resend |
| `LEAD_NOTIFY_EMAIL` | Server | No | Admin inbox for new leads |
| `LEAD_WEBHOOK_URL` | Server | No | CRM webhook POST target |
| `UPSTASH_REDIS_REST_URL` | Server | No | Distributed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Server | No | Upstash token |

## Contact / lead capture

See `CONTACT_SYSTEM_ARCHITECTURE.md`. Local testing without Turnstile:

```bash
CONTACT_SKIP_CAPTCHA=1 npm run dev
```

## Validation

Runtime validation lives in `env/validation.ts` and is invoked from `app/env-guard.ts` at startup.

```bash
# Validate current shell / .env.local without starting Next
npx tsx env/validation.ts
```

## Secret scanning

```bash
npm run verify:secrets
```

Pre-commit and CI run the same check. Builds fail on high/critical findings.

## After a leak

If any key was committed to git:

1. **Rotate** the credential immediately (Google Cloud, Cloudinary, Vercel).
2. **Remove** from tracking: `git rm --cached .env.production .env.local`
3. **Purge git history** with `git filter-repo` or BFG (see `SECURITY_REMEDIATION_REPORT.md`).
