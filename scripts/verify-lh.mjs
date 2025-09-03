import { execFile } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const routes = ['/', '/gallery'];
await mkdir('artifacts/lh', { recursive: true });

function run(url, name, formFactor) {
  return new Promise((resolve, reject) => {
    execFile(
      'npx',
      [
        'lighthouse',
        url,
        `--form-factor=${formFactor}`,
        `--output=json`,
        `--output-path=artifacts/lh/${name}-${formFactor}.json`,
        '--quiet',
        '--only-categories=performance,accessibility,best-practices,seo',
      ],
      { env: process.env },
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

const BASE = process.env.LH_BASE || 'http://localhost:3001';
for (const r of routes) {
  const name = r === '/' ? 'home' : r.replace(/\W+/g, '_');
  await run(`${BASE}${r}`, name, 'mobile');
  await run(`${BASE}${r}`, name, 'desktop');
  console.log(`✅ Lighthouse OK for ${r}`);
}
console.log('✅ Lighthouse reports saved to artifacts/lh/');
