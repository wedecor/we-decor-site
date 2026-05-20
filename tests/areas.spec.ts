// tests/areas.spec.ts — legacy /areas/* routes must redirect to canonical /locations/*
import { test, expect } from '@playwright/test';
import { AREAS } from '../app/(site)/_data/locations';

const site = process.env.PREVIEW_URL || 'http://localhost:3000';

test.describe('Areas → Locations redirect & location SEO', () => {
  for (const { slug } of AREAS.slice(0, 5)) {
    test(`/areas/${slug} redirects to /locations/${slug}`, async ({ page }) => {
      const res = await page.goto(`${site}/areas/${slug}`, { waitUntil: 'domcontentloaded' });
      expect(page.url()).toContain(`/locations/${slug}`);
      expect(res?.status()).toBeLessThan(400);
    });
  }

  test('/locations/koramangala has title & description', async ({ page }) => {
    await page.goto(`${site}/locations/koramangala`, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title).toMatch(/Koramangala|Event Decoration/i);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toMatch(/\/locations\/koramangala$/);
  });
});
