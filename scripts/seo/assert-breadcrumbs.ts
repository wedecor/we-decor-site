const SEO_BREADCRUMB_BASE = process.env.SEO_BASE_URL ?? 'http://localhost:3000';
const base = SEO_BREADCRUMB_BASE.replace(/\/+$/, '');

async function f(url: string) {
  const r = await fetch(url, { headers: { accept: 'text/html' }, redirect: 'follow' });
  return { status: r.status, text: await r.text(), finalUrl: r.url };
}

(async () => {
  const locationsIndex = await f(`${base}/locations`);
  if (locationsIndex.status !== 200) throw new Error('/locations does not return 200');

  const sitemap = await f(`${base}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error('sitemap not reachable');
  const matches = Array.from(
    sitemap.text.matchAll(/<loc>([^<]*\/locations\/[\w-]+)<\/loc>/g)
  ).map((m) => m[1]);
  const sample = matches.slice(0, 5);
  if (!sample.length) throw new Error('no /locations/* URLs in sitemap to test');

  for (const url of sample) {
    const page = await f(url);
    if (page.status !== 200) throw new Error(`${url} not 200`);
    const hasBreadcrumb =
      /"@type":"BreadcrumbList"/.test(page.text) && /"position":2/.test(page.text);
    if (!hasBreadcrumb) throw new Error(`${url} missing BreadcrumbList with locality item`);
  }
  console.log('✅ breadcrumbs present on sampled location pages & /locations exists');
})();
