import { Page } from "@playwright/test";

/**
 * Filters expected console errors during tests:
 * - 404 for intentionally missing test routes
 * - 400/REQUEST_DENIED from external APIs (e.g., Places)
 */
export async function silenceExpectedConsole(page: Page) {
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text().toLowerCase();

    const is404TestRoute =
      text.includes("404") && (text.includes("this-page-should-not-exist") || text.includes("not-found"));

    const isExternalApiNoise =
      text.includes("request_denied") ||
      (text.includes("400") && (text.includes("googleapis") || text.includes("gtag") || text.includes("maps")));

    const isMimeTypeError =
      text.includes("mime type") && text.includes("text/html") && 
      (text.includes("not executable") || text.includes("not a supported stylesheet"));

    if (is404TestRoute || isExternalApiNoise || isMimeTypeError) return; // ignore expected
    // Uncomment next line if you want to fail on unexpected errors:
    // throw new Error(`Unexpected console error: ${msg.text()}`);
  });
}