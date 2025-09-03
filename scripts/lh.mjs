import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const base = process.env.LH_BASE || 'http://localhost:3000';
const urls = ['/', '/areas/east-bangalore'];
const thresholds = { perf: 90, a11y: 95, bp: 95, seo: 95 };

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
let fail = false;

for (const u of urls) {
  const res = await lighthouse(`${base}${u}`, {
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  const cat = res.lhr.categories;
  const s = {
    perf: cat.performance.score * 100,
    a11y: cat.accessibility.score * 100,
    bp: cat['best-practices'].score * 100,
    seo: cat.seo.score * 100,
  };

  console.log(u, Object.fromEntries(Object.entries(s).map(([k, v]) => [k, Math.round(v)])));

  if (
    s.perf < thresholds.perf ||
    s.a11y < thresholds.a11y ||
    s.bp < thresholds.bp ||
    s.seo < thresholds.seo
  ) {
    fail = true;
  }
}

await chrome.kill();
process.exit(fail ? 1 : 0);
