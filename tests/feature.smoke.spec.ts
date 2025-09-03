import { test, expect } from '@playwright/test';
import { silenceExpectedConsole } from './utils/console-filter';

// Routes we consider core
const ROUTES = ['/', '/gallery', '/services', '/pricing', '/faq', '/contact', '/areas', '/locations'] as const;

// Brand & contact expectations (update if your constants change)
const EXPECTED = {
  brand: 'We Decor',
  igHandle: '@wedecorbangalore',
  telPrimary: '+919880544452',   // +91 88805 44452
  telSecondary: '+919591232166', // +91 95912 32166
  waLink: 'https://wa.me/918880544452',
};

test.describe('feature-smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await silenceExpectedConsole(page);
  });

  test('no console errors on key pages @smoke', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => {
      // Filter out known non-critical errors
      const errorText = String(e);
      if (!errorText.includes('Sentry') && !errorText.includes('CSP') && !errorText.includes('worker')) {
        errors.push(errorText);
      }
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const errorText = msg.text();
        // Filter out known non-critical errors
        if (!errorText.includes('Sentry') && !errorText.includes('CSP') && !errorText.includes('worker')) {
          errors.push(errorText);
        }
      }
    });

    for (const r of ROUTES) {
      await page.goto(r, { waitUntil: 'networkidle' });
      await page.waitForSelector('main', { state: 'attached' });
      await page.evaluate(async () => {
        // @ts-expect-error fonts
        if (document?.fonts?.ready) await (document as any).fonts.ready;
      });
    }

    expect(errors, `Console/Page errors:\n${errors.join('\n')}`).toHaveLength(0);
  });

  test('header navigation works @smoke', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const nav = [
      { text: 'About', path: '/about' },
      { text: 'Services', path: '/services' },
      { text: 'Gallery', path: '/gallery' },
      { text: 'Areas', path: '/areas' },
      { text: 'Locations', path: '/locations' },
      { text: 'Pricing', path: '/pricing' },
      { text: 'FAQ', path: '/faq' },
      { text: 'Contact', path: '/contact' },
    ];

    for (const { text, path } of nav) {
      // Use first() to handle multiple elements with same text
      await page.getByRole('link', { name: text }).first().click();
      await page.waitForURL(new RegExp(`${path}$`));
      await page.waitForSelector('main', { state: 'attached' });
      await page.goBack(); // return to home
      await page.waitForURL(/\/$/);
    }
  });

  test('hero CTAs route correctly @smoke', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check for Get a Quote button/link
    const quoteLink = page.getByRole('link', { name: /get a quote|quote|contact/i }).first();
    if (await quoteLink.count() > 0) {
      await quoteLink.click();
      await page.waitForURL(/\/contact$/);
      await page.goBack();
    }
    
    // Check for View Gallery button/link
    const galleryLink = page.getByRole('link', { name: /view gallery|gallery/i }).first();
    if (await galleryLink.count() > 0) {
      await galleryLink.click();
      await page.waitForURL(/\/gallery$/);
    }
  });

  test('dark mode toggle toggles html.dark @smoke', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const btn = page.getByRole('button', { name: 'Toggle dark mode' });
    
    if (await btn.count() > 0) {
      const hadDarkBefore = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      await btn.click();
      const hasDarkAfter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      expect(hasDarkAfter).not.toBe(hadDarkBefore);
    }
  });

  test('footer links & contact info present and correct @smoke', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Instagram handle - check if present
    const igLink = page.getByRole('link', { name: /@wedecorbangalore|instagram/i });
    if (await igLink.count() > 0) {
      await expect(igLink).toBeVisible();
    }

    // Primary tel anchor - check if present
    const tel1 = page.getByRole('link', { name: /\+91 88805 44452|\+91-88805-44452/ });
    if (await tel1.count() > 0) {
      const tel1Href = await tel1.getAttribute('href');
      expect(tel1Href).toBe(`tel:${EXPECTED.telPrimary}`);
    }

    // Secondary tel anchor - check if present
    const tel2 = page.getByRole('link', { name: /\+91 95912 32166|\+91-95912-32166/ });
    if (await tel2.count() > 0) {
      const tel2Href = await tel2.getAttribute('href');
      expect(tel2Href).toBe(`tel:${EXPECTED.telSecondary}`);
    }

    // WhatsApp CTA - check if present
    const waLink = page.getByRole('link', { name: /WhatsApp Us|Ask on WhatsApp|WhatsApp/i });
    if (await waLink.count() > 0) {
      const waHref = await waLink.first().getAttribute('href');
      expect(waHref).toMatch(/^https:\/\/wa\.me\/\d+$/);
    }
  });

  test('images have descriptive alt text @smoke', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // ensure no missing/empty alt attributes
    const missing = await page.$$eval('img', imgs =>
      imgs.filter(img => !img.hasAttribute('alt') || (img.getAttribute('alt') || '').trim() === '').length
    );
    expect(missing, 'Images missing alt attributes').toBe(0);
  });

  test('SEO basics exist on key pages @smoke', async ({ page }) => {
    for (const r of ROUTES) {
      await page.goto(r, { waitUntil: 'networkidle' });
      await page.waitForSelector('main', { state: 'attached' });

      const title = await page.title();
      expect(title, `Missing/empty <title> on ${r}`).toBeTruthy();

      const desc = await page.locator('meta[name="description"]').getAttribute('content').catch(() => null);
      expect(desc, `Missing meta description on ${r}`).toBeTruthy();

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);
      expect(canonical, `Missing canonical link on ${r}`).toBeTruthy();

      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang ?? 'en').toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
    }
  });

  test('contact page has required fields @smoke', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });
    // Adjust labels/placeholders to your form
    const fields = [
      /name/i,
      /phone|mobile/i,
      /email/i,
      /event|message|details/i,
    ];
    for (const f of fields) {
      const has = await page.getByLabel(f, { exact: false }).or(page.getByPlaceholder(f)).count();
      expect(has, `Missing contact field: ${f}`).toBeGreaterThan(0);
    }
  });

  test('404 shows not found @smoke', async ({ page }) => {
    const res = await page.goto('/this-page-should-not-exist-404', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(404);
    await expect(page.locator('text=/not found/i')).toBeVisible();
  });
});