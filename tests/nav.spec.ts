import { test, expect } from '@playwright/test';

test('home loads and header nav works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // Scope to the header: the footer and explore blocks also link to /gallery.
  await page.locator('header').getByRole('link', { name: 'Gallery', exact: true }).first().click();
  await expect(page).toHaveURL(/\/gallery/);
});
