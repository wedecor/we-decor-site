# Canonical Sitemap & Robots Fixes

## What
- Canonical sitemap/robots fixes
- Cache headers for `/sitemap.xml` and `/robots.txt`
- Apex → www redirect enforcement
- CI workflow for production verification

## Checks (must pass locally before merge)
- [ ] `npm run build` ok
- [ ] `BASE_URL=http://localhost:3000 npm run verify:sitemap` ok
- [ ] No `wedecor.in` refs: `grep -R "wedecor\.in" -n .` shows none
- [ ] Cache headers working in next.config.js
- [ ] Robots.txt points to canonical sitemap only

## After merge (CI will do this)
- Waits for prod robots to update
- Verifies live sitemap + legacy redirect
- Uploads verification reports as artifacts

## GSC Post-Launch Steps
1. Remove old sitemap: `https://www.wedecorevents.com/api/sitemap.xml`
2. Submit canonical: `https://www.wedecorevents.com/sitemap.xml`
3. Request indexing for: `/`, `/areas`, 2–3 top localities

## Files Changed
- `app/robots.ts` - Canonical sitemap reference
- `app/sitemap.ts` - Deterministic URL generation
- `next.config.js` - Cache headers + redirects
- `.github/workflows/verify-sitemap.yml` - CI verification
- `scripts/verify-sitemap.ts` - Sitemap validator

## Testing
- [ ] Local build successful
- [ ] Sitemap generates canonical URLs
- [ ] Robots.txt format correct
- [ ] Cache headers applied
- [ ] Legacy redirects working 