import { execSync } from "child_process";

const siteUrl = "https://we-decor-site.vercel.app";

console.log("Running Lighthouse audit...");

execSync(`npx lighthouse ${siteUrl} --quiet --chrome-flags="--headless" --output=json --output-path=./lighthouse-report.json`, {
  stdio: "inherit",
});

console.log("✅ Lighthouse report saved as lighthouse-report.json"); 