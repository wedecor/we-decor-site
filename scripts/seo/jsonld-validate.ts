const JSONLD_BASE_URL = process.env.BASE_URL ?? 'https://www.wedecorevents.com';
const PAGES = ['/', '/gallery', '/areas/koramangala', '/areas/indiranagar'];

type Result = { url: string; status: number; hasLd: boolean; types: string[] };

async function getJsonLd(u: string) {
  try {
    const r = await fetch(u);
    return { status: r.status, text: await r.text() };
  } catch (error) {
    return { status: 0, text: '' };
  }
}

function extractTypes(html: string) {
  const types: string[] = [];
  const rx = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;

  while ((m = rx.exec(html))) {
    try {
      const obj = JSON.parse(m[1]);
      const pushType = (o: any) => {
        const t = o?.['@type'];
        if (typeof t === 'string') types.push(t);
      };
      Array.isArray(obj) ? obj.forEach(pushType) : pushType(obj);
    } catch (e) {
      // Skip invalid JSON
    }
  }

  return types;
}

(async () => {
  console.log('🔍 Validating JSON-LD structured data...');
  console.log(`Base URL: ${JSONLD_BASE_URL}`);

  const out: Result[] = [];

  for (const p of PAGES) {
    const url = `${JSONLD_BASE_URL}${p}`;
    console.log(`\n📄 Checking: ${url}`);

    const { status, text } = await getJsonLd(url);
    const types = extractTypes(text);

    const result = {
      url: `${JSONLD_BASE_URL}${p}`,
      status,
      hasLd: types.length > 0,
      types,
    };

    out.push(result);

    console.log(`   Status: ${status}`);
    console.log(`   Has JSON-LD: ${result.hasLd ? 'Yes' : 'No'}`);
    if (types.length > 0) {
      console.log(`   Schema types: ${types.join(', ')}`);
    }
  }

  const missing = out.filter((x) => !x.hasLd || x.status !== 200);

  console.log('\n📊 JSON-LD Summary:');
  console.log(JSON.stringify(out, null, 2));

  if (missing.length) {
    console.error('\n❌ Missing/invalid JSON-LD on:');
    missing.forEach((m) => console.error(`   ${m.url} (status: ${m.status}, hasLd: ${m.hasLd})`));
    process.exit(1);
  }

  console.log('\n✅ JSON-LD present on all checked pages!');
})();
