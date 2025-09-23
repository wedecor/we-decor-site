import { test, expect } from './setup';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/We Decor/i);
});

test('east-bangalore shows sections', async ({ page }) => {
  await page.goto('/areas/east-bangalore');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('heading', { name: /FAQ/i })).toBeVisible();
});
