import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/We Decor/i);
});

test('koramangala location page shows sections', async ({ page }) => {
  await page.goto('/locations/koramangala');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Koramangala/i);
  await expect(page.getByRole('link', { name: /WhatsApp/i }).first()).toBeVisible();
});
