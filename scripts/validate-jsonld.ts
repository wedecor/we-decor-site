import fs from 'node:fs';
import https from 'node:https';

const VALIDATE_BASE_URL = process.env.BASE_URL || 'https://www.wedecorevents.com';
const pages = ['/', '/areas', '/areas/koramangala'];

function get(url: string): Promise<string> {
  return new Promise<string>((resolve) => {
    https
      .get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve(body));
      })
      .on('error', () => resolve(''));
  });
}

async function validateJsonLd() {
  console.log('🔍 Validating JSON-LD structured data...');

  const results: string[] = [];

  for (const page of pages) {
    try {
      const fullUrl = `${VALIDATE_BASE_URL}${page}`;
      console.log(`\n📄 Checking: ${fullUrl}`);

      const html = await get(fullUrl);
      const hasJsonLd = /application\/ld\+json/.test(html);

      const result = `${page}: ${hasJsonLd ? 'OK' : 'MISSING'}`;
      results.push(result);

      console.log(`   Status: ${hasJsonLd ? 'OK' : 'MISSING'}`);
    } catch (error) {
      const errorMsg = `${page}: ERROR`;
      results.push(errorMsg);
      console.log(`   ❌ Error`);
    }
  }

  // Create reports directory
  fs.mkdirSync('reports/seo', { recursive: true });

  // Save report
  const report = {
    generated: new Date().toISOString(),
    baseUrl: VALIDATE_BASE_URL,
    results: results,
  };

  fs.writeFileSync(
    'reports/seo/jsonld-validate.md',
    `# JSON-LD Validation Report\n\n` +
      `Generated: ${report.generated}\n` +
      `Base URL: ${VALIDATE_BASE_URL}\n\n` +
      `## Results\n` +
      results.map((r) => `- ${r}`).join('\n')
  );

  console.log(`\n📁 Report saved to: reports/seo/jsonld-validate.md`);
}

validateJsonLd().catch(console.error);
