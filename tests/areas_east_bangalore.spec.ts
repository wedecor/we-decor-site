// Quick fix for east-bangalore spec (assert stable ids instead of headings)
import { test, expect } from "./setup";
import { goAndWait } from "./utils/nav";

test("east-bangalore shows sections", async ({ page }) => {
  await goAndWait(page, "/areas/east-bangalore", "main");
  await expect(page.locator('[data-testid="area-hero"]')).toBeVisible();
  await expect(page.locator('[data-testid="area-services"]')).toBeVisible();
  await expect(page.locator('[data-testid="area-gallery"]')).toBeVisible();
});

