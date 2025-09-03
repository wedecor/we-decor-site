const SEO_BREADCRUMB_BASE = process.env.SEO_BASE_URL ?? 'http://localhost:3000';
const base = SEO_BREADCRUMB_BASE.replace(/\/+$/, '');

async function f(url: string) {
  const r = await fetch(url, { headers: { accept: 'text/html' } });
  return { status: r.status, text: await r.text() };
}

(async () => {
  // 1) /areas index must exist
  const areasIndex = await f(`${base}/areas`);
  if (areasIndex.status !== 200) throw new Error('/areas does not return 200');

  // 2) Sample 5 area pages for BreadcrumbList with 3 items
  const sitemap = await f(`${base}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error('sitemap not reachable');
  const matches = Array.from(sitemap.text.matchAll(/<loc>([^<]*\/areas\/[\w-]+)<\/loc>/g)).map(
    (m) => m[1]
  );
  const sample = matches.slice(0, 5);
  if (!sample.length) throw new Error('no /areas/* URLs in sitemap to test');

  for (const url of sample) {
    const page = await f(url);
    if (page.status !== 200) throw new Error(`${url} not 200`);
    const hasBreadcrumb =
      /"@type":"BreadcrumbList"/.test(page.text) && /"position":3/.test(page.text);
    if (!hasBreadcrumb) throw new Error(`${url} missing BreadcrumbList with 3 items`);
  }
  console.log('✅ breadcrumbs present on sampled area pages & /areas exists');
})();
