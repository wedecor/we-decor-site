import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/", "/areas/east-bangalore"]) {
  test(`a11y ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const critical = results.violations.filter(v => 
      ["serious", "critical"].includes(v.impact || "")
    );
    expect(critical, JSON.stringify(critical, null, 2)).toHaveLength(0);
  });
}