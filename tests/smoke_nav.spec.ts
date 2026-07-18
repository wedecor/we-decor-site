// Quick fix for header navigation test (more deterministic)
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

