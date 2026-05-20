const JSONLD_BASE = process.env.SEO_BASE_URL ?? 'http://localhost:3000';

async function fetchUrl(u: string) {
  const r = await fetch(u, { redirect: 'follow' });
  const html = await r.text();
  return { status: r.status, html, finalUrl: r.url };
}

function flattenSchema(blocks: any[]): any[] {
  const flat: any[] = [];
  for (const b of blocks) {
    if (Array.isArray(b['@graph'])) flat.push(...b['@graph']);
    else flat.push(b);
  }
  return flat;
}

function extractJsonLd(html: string) {
  const scripts = Array.from(
    html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  );
  const blocks: any[] = [];
  for (const m of scripts) {
    const raw = m[1].trim();
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) blocks.push(...parsed);
      else blocks.push(parsed);
    } catch {}
  }
  return flattenSchema(blocks);
}

(async () => {
  const base = JSONLD_BASE.replace(/\/+$/, '');

  const home = await fetchUrl(`${base}/`);
  if (home.status !== 200) throw new Error('Home not 200');
  const homeLd = extractJsonLd(home.html);
  const hasLocalBusiness = homeLd.some(
    (b) =>
      b['@type'] === 'LocalBusiness' ||
      (Array.isArray(b['@type']) && b['@type'].includes('LocalBusiness'))
  );
  if (!hasLocalBusiness) throw new Error('LocalBusiness JSON-LD missing on home');

  const gal = await fetchUrl(`${base}/gallery`);
  if (gal.status !== 200) throw new Error('Gallery not 200');
  const galLd = extractJsonLd(gal.html);
  const hasBreadcrumbs = galLd.some((b) => b['@type'] === 'BreadcrumbList');
  if (!hasBreadcrumbs) throw new Error('BreadcrumbList JSON-LD missing on /gallery');

  const candidates = ['koramangala', 'indiranagar', 'whitefield'];
  const slug = candidates[0];
  const loc = await fetchUrl(`${base}/locations/${slug}`);
  if (loc.status !== 200) throw new Error(`/locations/${slug} not 200`);
  const locLd = extractJsonLd(loc.html);
  const hasFaq = locLd.some((b) => b['@type'] === 'FAQPage');
  if (!hasFaq) throw new Error(`FAQPage JSON-LD missing on /locations/${slug}`);
  const hasLocalityService = locLd.some((b) => b['@type'] === 'Service');
  if (!hasLocalityService) {
    throw new Error(`Service JSON-LD missing on /locations/${slug} (provider-linked locality)`);
  }

  const areasRedirect = await fetch(`${base}/areas/${slug}`, { redirect: 'manual' });
  if (areasRedirect.status !== 308 && areasRedirect.status !== 301) {
    throw new Error(`/areas/${slug} should 301/308 redirect, got ${areasRedirect.status}`);
  }
  const locHeader = areasRedirect.headers.get('location') ?? '';
  if (!locHeader.includes(`/locations/${slug}`)) {
    throw new Error(`/areas/${slug} redirect Location must point to /locations/${slug}`);
  }

  console.log(
    '✅ JSON-LD present: LocalBusiness (home), BreadcrumbList (gallery), FAQPage (location); /areas/* redirects to /locations/*'
  );
})();
