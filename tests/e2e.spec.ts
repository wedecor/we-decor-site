import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/We Decor/i);
});

test('east-bangalore shows sections', async ({ page }) => {
  await page.goto('/areas/east-bangalore');
  await expect(page.getByRole('heading', { name: /Case Study/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Call to Action/i })).toBeVisible();
});
