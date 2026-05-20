import { GENERATED_LOCATIONS } from '../../app/(site)/_data/locations.generated';

const BASE = process.env.SEO_BASE_URL ?? 'http://localhost:3000';
const LIMIT = Number(process.env.SEO_AREAS_LIMIT ?? 0);

async function head(url: string, redirect: RequestRedirect = 'follow') {
  const r = await fetch(url, { method: 'HEAD', redirect });
  return { url, status: r.status, location: r.headers.get('location') };
}

(async () => {
  const slugs = GENERATED_LOCATIONS.map((a) => a.slug);
  const sample = LIMIT > 0 ? slugs.slice(0, LIMIT) : slugs;
  const origin = BASE.replace(/\/+$/, '');

  const locationResults = await Promise.all(
    sample.map((s) => head(`${origin}/locations/${s}`))
  );
  const locationBad = locationResults.filter((r) => r.status !== 200);
  if (locationBad.length) {
    console.error('❌ Location URL HEAD failures:', locationBad.slice(0, 10));
    process.exit(1);
  }

  const redirectResults = await Promise.all(
    sample.map((s) => head(`${origin}/areas/${s}`, 'manual'))
  );
  const redirectBad = redirectResults.filter(
    (r) => r.status !== 308 && r.status !== 301
  );
  if (redirectBad.length) {
    console.error('❌ /areas/* should 301/308 redirect:', redirectBad.slice(0, 10));
    process.exit(1);
  }

  console.log(
    `✅ ${locationResults.length} /locations/* URLs returned 200; /areas/* returns permanent redirect`
  );
})();
