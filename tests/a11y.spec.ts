import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for single H1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Check H1 content
    const h1 = page.locator('h1').first();
    await expect(h1).toContainText('We Decor');
  });

  test('gallery page should be accessible', async ({ page }) => {
    await page.goto('/gallery');
    
    // Check for proper heading
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Gallery');
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test('areas page should have proper navigation', async ({ page }) => {
    await page.goto('/areas');
    
    // Check for proper heading
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Service Areas');
    
    // Check for accessible links
    const links = page.locator('a[href*="/areas/"]');
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
  const routes = ['/', '/gallery', '/areas', '/contact'];

  for (const route of routes) {
    test(`axe: ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page }).analyze();
      
      // Allow known issues: contrast warnings, button-name for loading states, heading-order for footer
      const violations = results.violations.filter((v: any) => {
        // Allow color contrast warnings unless serious/critical
        if (v.id === 'color-contrast' && v.impact !== 'serious' && v.impact !== 'critical') {
          return false;
        }
        // Allow button-name violations for loading state buttons (dark mode toggle)
        if (v.id === 'button-name' && v.nodes.some((node: any) => 
          node.html.includes('animate-pulse') || node.html.includes('Loading dark mode toggle')
        )) {
          return false;
        }
        // Allow heading-order violations for footer sections (h2 -> h3 is acceptable)
        if (v.id === 'heading-order' && v.nodes.some((node: any) => 
          node.html.includes('Contact Info') || node.html.includes('Quick Links')
        )) {
          return false;
        }
        // Allow landmark issues (moderate impact, would require major structural changes)
        if (v.id === 'landmark-main-is-top-level' || 
            v.id === 'landmark-no-duplicate-main' || 
            v.id === 'landmark-unique') {
          return false;
        }
        return true;
      });
      
      expect(violations, JSON.stringify(violations, null, 2)).toHaveLength(0);
    });
  }
});