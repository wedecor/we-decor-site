## One-shot local verification
```
export NEXT_PUBLIC_SITE_URL="https://www.wedecorevents.com"
npm run build:guarded
npm run serve:prod & sleep 4
HEADERS_BASE=http://localhost:3001 npm run verify:headers
SEO_BASE=http://localhost:3001 npm run verify:seo
LH_BASE=http://localhost:3001 npm run verify:lh
npx playwright test tests/a11y.spec.ts
```

Git steps (atomic commits)
```
git checkout -b chore/readiness-fixes
npm i -D sharp depcheck eslint-plugin-jsx-a11y @axe-core/playwright
git add .
git commit -m "chore(security): add HSTS; keep CSP/XFO/XCTO/Referrer-Policy"
git commit -m "feat(analytics): GA4 + Core Web Vitals RUM (env-gated)"
git commit -m "chore(a11y): enable jsx-a11y rules; add axe a11y smoke"
git commit -m "chore(images): add sharp-based WebP/AVIF converter for /public/services"
git commit -m "chore(verify): add headers/seo/lighthouse scripts + docs"
```

Run locally
```
export NEXT_PUBLIC_SITE_URL="https://www.wedecorevents.com"
# optional GA:
# export NEXT_PUBLIC_GA_ID="G-XXXXXXX"

npm run images:convert
npm run build:guarded
npm run serve:prod & sleep 4

HEADERS_BASE=http://localhost:3001 npm run verify:headers
SEO_BASE=http://localhost:3001 npm run verify:seo
LH_BASE=http://localhost:3001 npm run verify:lh
npx playwright test tests/a11y.spec.ts
```

