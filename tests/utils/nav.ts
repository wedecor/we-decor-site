export async function goAndWait(page: import("@playwright/test").Page, to: string, visible: string) {
  await Promise.all([page.goto(to), page.waitForLoadState("networkidle")]);
  await page.waitForSelector(visible, { state: "visible", timeout: 10000 });
}