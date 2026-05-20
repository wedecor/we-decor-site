# Security Remediation Report — Secret Exposure

**Date:** 2026-05-20  
**Severity:** CRITICAL (stop-the-line)  
**Status:** Remediation applied in repository; **manual rotation and git history purge still required**

---

## Executive summary

A production audit found **live credentials committed to git** and **hardcoded secrets in maintenance scripts**. This remediation:

- Removed tracked `.env.production` / `.env.local` from the index (files must stay local-only)
- Deleted `.env.production` from the working tree
- Removed hardcoded Cloudinary credentials from 7 scripts
- Added `env/` validation architecture, hardened secret scanning, Gitleaks CI, and pre-commit gates

**The site can still build**, but you **must rotate all exposed credentials** because they remain in **git history**.

---

## Exposed secrets found

| # | Secret type | Location | Severity | In git history? |
|---|-------------|----------|----------|-----------------|
| 1 | `GOOGLE_PLACES_API_KEY` (`AIza…`) | `.env.production` (tracked) | CRITICAL | Yes |
| 2 | `VERCEL_OIDC_TOKEN` (JWT) | `.env.production` (tracked) | CRITICAL | Yes |
| 3 | `NEXT_PUBLIC_GOOGLE_PLACE_ID` | `.env.production` (tracked) | LOW (public ID) | Yes |
| 4 | Cloudinary `api_key` + `api_secret` | 7 files under `scripts/*.js` | CRITICAL | Yes |
| 5 | Scan artifact echoing secrets | `artifacts/secrets_scan.json` (tracked) | HIGH | Yes |
| 6 | Legacy `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` pattern | `utils/googleReviews.ts` (code path) | HIGH (if ever set) | N/A |

### Affected files (remediated)

- `.env.production` — **deleted** from workspace; **untracked** from git
- `.env.local` — **untracked** (may remain locally with non-secret values only)
- `scripts/upload-to-cloudinary.js`
- `scripts/clean-gallery-mapping.js`
- `scripts/convert-images.js`
- `scripts/fix-gallery-urls.js`
- `scripts/generate-working-gallery.js`
- `scripts/generate-cloudinary-gallery-map.js`
- `scripts/generate-clean-gallery-map.js`
- `artifacts/secrets_scan.json` — **deleted**; directory now gitignored

---

## Remediation completed (in repo)

### 1. `.gitignore` hardened

Ignores all `.env*` variants, Vercel local config, and generated artifacts (`artifacts/`, `playwright-report/`, `test-results/`).

### 2. Safe env architecture (`env/`)

| File | Purpose |
|------|---------|
| `env/.env.example` | Placeholder template only |
| `env/README.md` | Variable documentation |
| `env/validation.ts` | Startup + CLI validation |

### 3. `NEXT_PUBLIC` misuse fixed

- `GOOGLE_PLACES_API_KEY` is **server-only** (`utils/googleReviews.ts`)
- Validation **errors** if `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` is set
- Validation blocks new `NEXT_PUBLIC_*` names containing `API_KEY`, `SECRET`, `TOKEN`, etc. (except `NEXT_PUBLIC_SENTRY_DSN`)

### 4. Cloudinary scripts

Scripts load credentials via `scripts/lib/cloudinary-env.cjs` from:

- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_CLOUD_NAME` or `NEXT_PUBLIC_CLOUDINARY_CLOUD`

### 5. Secret scanning

- `npm run verify:secrets` — regex scan + tracked-env check; **fails on critical/high**
- `.gitleaks.toml` + `.github/workflows/secret-scan.yml`
- Husky **pre-commit** runs `verify:secrets`

### 6. Vercel practices

- Production secrets → **Vercel Dashboard** only (Production / Preview scopes separated)
- No `.env.production` in repository
- `app/env-guard.ts` validates env in production builds

---

## Required manual actions (YOU must do these)

### Token rotation checklist

- [ ] **Google Places API key** — Google Cloud Console → Credentials → **rotate/restrict** (HTTP referrer + IP; disable unused APIs)
- [ ] **Vercel OIDC token** — treat as compromised; revoke via Vercel account / re-auth CLI; rotate any derived access
- [ ] **Cloudinary API key + secret** — Cloudinary Console → Settings → Security → **regenerate** pair
- [ ] **Review Vercel project env vars** — ensure no secrets in Preview that should be Production-only
- [ ] **Audit Cloudinary/Google billing** for abuse after exposure window

### Purge secrets from git history

Credentials in `.env.production` exist in commits such as `df4b86c`, `a5926a0`, `193a734`, `fa4aa99`.

**Option A — git filter-repo (recommended):**

```bash
# Install: pip install git-filter-repo
git filter-repo --path .env.production --path .env.local --invert-paths
# Force-push only after team coordination:
# git push origin --force --all
```

**Option B — BFG Repo-Cleaner:**

```bash
bfg --delete-files .env.production
bfg --replace-text passwords.txt  # file listing literal secrets to replace
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

After purge: **rotate all keys again** (history may have been cloned).

### Untrack env files (if not already committed in your branch)

```bash
git rm --cached .env.production .env.local 2>/dev/null || true
git rm --cached artifacts/secrets_scan.json 2>/dev/null || true
```

### Local developer setup

```bash
cp env/.env.example .env.local
# Edit .env.local locally — never commit
```

Set the same variables in **Vercel → Project → Settings → Environment Variables**.

---

## Remaining risks

| Risk | Mitigation |
|------|------------|
| Secrets still in remote git history | History purge + rotation |
| Forks/clones may retain old commits | Notify team; invalidate keys |
| No `/api/contact` or Google reviews API | Separate workstream; do not re-add keys as `NEXT_PUBLIC_` |
| `artifacts/` previously committed | Now gitignored; purge old blobs if needed |

---

## Verification commands

```bash
npm run verify:env
npm run verify:secrets
npm run typecheck
npm run build
```

Expected: `verify:secrets` exits 0 after remediation (no hardcoded secrets in tracked source).

---

## Sign-off criteria

- [ ] All checklist rotations completed
- [ ] Git history purged on remote
- [ ] Vercel env vars updated with new secrets
- [ ] `npm run verify:secrets` passes locally and in CI
- [ ] Gitleaks workflow green on `main`
- [ ] No `.env.production` in `git ls-files`

---

*Generated as part of secret exposure remediation. Do not add real credentials to this file.*
