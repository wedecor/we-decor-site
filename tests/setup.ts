import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    page.on("console", (msg) => {
      const t = msg.text();
      if (/content-security-policy|csp|report-only/i.test(t)) return; // ignore CSP report-only
      if (/^Failed to load resource: the server responded with a status of 400/i.test(t)) return; // known benign 400
    });
    await use(page);
  },
});

export { expect };
