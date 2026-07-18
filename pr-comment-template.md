# Preview Verification Report

**Preview:** $PREVIEW_URL

**Headers (first lines):**
```text
<curl -I snippet>
```

**LHCI:** Perf: <..> | A11y: <..> | SEO: <..> | BP: <..>

**Smoke tests:** <X passed / Y failed> (list failing titles)

**CSP:** confirm no 'unsafe-eval', HSTS/Referrer/Permissions-Policy present

**Verdict:** ✅ Ready / ⚠️ Needs fixes (list 1–2 bullets)

---

## Quick fixes for remaining flakes

**Header nav test (more deterministic)**
```ts
// tests/smoke_nav.spec.ts
import { test, expect } from "./setup";
import { goAndWait } from "./utils/nav";

test("header navigation works @smoke", async ({ page }) => {
  await goAndWait(page, "/", "header");
  const nav = page.getByRole("navigation", { name: /main/i }).first();
  await expect(nav).toBeVisible();

  await nav.getByRole("link", { name: /^Gallery$/i }).click();
  await page.waitForURL(/\/gallery$/, { timeout: 15000 });
  await expect(page.locator("h1")).toBeVisible();
});
```

**East-bangalore spec (assert stable ids instead of headings)**
```ts
// tests/areas_east_bangalore.spec.ts
import { test, expect } from "./setup";
import { goAndWait } from "./utils/nav";

test("east-bangalore shows sections", async ({ page }) => {
  await goAndWait(page, "/areas/east-bangalore", "main");
  await expect(page.locator('[data-testid="area-hero"]')).toBeVisible();
  await expect(page.locator('[data-testid="area-services"]')).toBeVisible();
  await expect(page.locator('[data-testid="area-gallery"]')).toBeVisible();
});
```

**Contact contrast (ensure AA in all themes)**
```ts
// components/ContactLink.tsx (or inline)
const btn = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-white bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500";
```

## One-liners for local verification

```bash
# After merging PR to a preview
PREVIEW_URL="https://<your-preview>.vercel.app"
curl -sI "$PREVIEW_URL" | sed -n '1,30p'
npx @lhci/cli autorun --collect.url="$PREVIEW_URL" --collect.url="$PREVIEW_URL/gallery" --collect.url="$PREVIEW_URL/contact" || true
npx playwright test || true
```

