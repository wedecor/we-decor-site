// tests/areas.spec.ts
import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test.describe("Areas pages SEO smoke", () => {
  const site = process.env.PREVIEW_URL || "http://localhost:3000";
  const areasDir = path.join(process.cwd(), "app", "areas");
  const slugs = fs.readdirSync(areasDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(areasDir, d.name, "page.tsx")))
    .map(d => d.name);

  for (const slug of slugs) {
    test(`/${slug} has title & description`, async ({ page }) => {
      await page.goto(`${site}/areas/${slug}`, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      expect(title).toContain("Event Decoration in");
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc).toBeTruthy();
    });
  }
}); 