import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Accessibility tests for key pages
const routes = ["/", "/gallery"];
test.describe("a11y", () => {
  for (const r of routes) {
    test(`axe ${r}`, async ({ page }) => {
      await page.goto(`http://localhost:3001${r}`);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }
});