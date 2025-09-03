import { test, expect } from '@playwright/test';

test('home loads and header nav works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: /gallery/i }).click();
  await expect(page).toHaveURL(/\/gallery/);
});