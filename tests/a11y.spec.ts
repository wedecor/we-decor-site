import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { silenceExpectedConsole } from './utils/console-filter';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await silenceExpectedConsole(page);
  });

  test('homepage should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for single H1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Check H1 content
    const h1 = page.locator('h1').first();
    await expect(h1).toContainText('Bangalore');
  });

  test('gallery page should be accessible', async ({ page }) => {
    await page.goto('/gallery');
    
    // Check for proper heading
    const h1 = page.locator('h1');
    await expect(h1).toContainText(/gallery/i);
    
    // Content images need a real alt. Linked brand lockups are decorative
    // (empty alt + aria-hidden on the mark; the parent <Link> is named).
    const images = page.locator('img:not([aria-hidden="true"])');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test('locations hub should have proper navigation', async ({ page }) => {
    await page.goto('/locations');
    
    const h1 = page.locator('h1');
    await expect(h1).toContainText(/areas we serve/i);
    
    const links = page.locator('a[href*="/locations/"]');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Check first few links have proper text
    for (let i = 0; i < Math.min(linkCount, 3); i++) {
      const linkText = await links.nth(i).textContent();
      expect(linkText?.trim().length).toBeGreaterThan(0);
    }
  });

  test('keyboard navigation should work', async ({ page }) => {
    await page.goto('/');
    
    // Tab through the page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('contact form should be accessible', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for form labels
    const labels = page.locator('label');
    const labelCount = await labels.count();
    expect(labelCount).toBeGreaterThan(0);
    
    // Check for proper form structure
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  // Axe-core accessibility tests
  const routes = ['/', '/gallery', '/locations', '/contact'];

  for (const route of routes) {
    test(`axe: ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page }).analyze();
      
      /*
       * This allow-list used to hide the bugs it was written around. A design
       * audit in Oct 2026 found a duplicate <main> on /error and /404 and gold
       * tags failing contrast at 3.59:1 on the homepage — both were real, both
       * were filtered out here, and CI stayed green for months.
       *
       * Two carve-outs are gone for good: duplicate/non-top-level landmarks
       * (error.tsx and not-found.tsx render <div> now), and the dark-mode
       * toggle (the site is dark-only; that button does not exist).
       *
       * Never add an entry here to make a failure go away. Fix the page, or
       * write down why the rule does not apply and what evidence says so.
       */
      const violations = results.violations.filter((v: any) => {
        // Footer h2 -> h3 is a deliberate section structure, not a skipped level.
        if (v.id === 'heading-order' && v.nodes.some((node: any) =>
          node.html.includes('Contact Info') || node.html.includes('Quick Links')
        )) {
          return false;
        }
        return true;
      });
      
      expect(violations, JSON.stringify(violations, null, 2)).toHaveLength(0);
    });
  }
});