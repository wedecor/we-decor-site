import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Chrome discovery and flags mirror scripts/lighthouse.mjs. Bare
// `npx lighthouse` looks for a system Chrome, which CI runners do not have,
// and fails with "Unable to connect to Chrome".

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const routes = ['/', '/gallery'];

function lighthouseBin() {
  const local = join(PROJECT_ROOT, 'node_modules', '.bin', 'lighthouse');
  return existsSync(local) ? { cmd: local, pre: [] } : { cmd: 'npx', pre: ['lighthouse'] };
}

function chromePath() {
  try {
    const p = chromium.executablePath();
    if (p && existsSync(p)) return p;
  } catch {
    // Playwright browsers not installed in this environment.
  }
  return process.env.CHROME_PATH || '';
}

const chrome = chromePath();
if (!chrome) {
  console.error('No Chrome/Chromium found (Playwright browser or CHROME_PATH).');
  process.exit(1);
}

const lh = lighthouseBin();
await mkdir('artifacts/lh', { recursive: true });

function run(url, name, formFactor) {
  const args = [
    ...lh.pre,
    url,
    `--output=json`,
    `--output-path=artifacts/lh/${name}-${formFactor}.json`,
    `--chrome-path=${chrome}`,
    '--chrome-flags=--headless --no-sandbox --disable-gpu',
    '--quiet',
    '--no-enable-error-reporting',
    '--only-categories=performance,accessibility,best-practices,seo',
  ];
  // `--form-factor=desktop` without matching screenEmulation throws in
  // Lighthouse 12; the desktop preset sets both. Mobile is the default.
  if (formFactor === 'desktop') args.push('--preset=desktop');

  return new Promise((resolve, reject) => {
    execFile(
      lh.cmd,
      args,
      { env: process.env, maxBuffer: 20 * 1024 * 1024 },
      (err, _out, stderr) => {
        if (err) {
          const detail = String(stderr || err.message)
            .trim()
            .split('\n')
            .slice(-5)
            .join('\n');
          return reject(new Error(`Lighthouse failed for ${url} (${formFactor}):\n${detail}`));
        }
        resolve();
      }
    );
  });
}

const BASE = process.env.LH_BASE || 'http://localhost:3001';
try {
  for (const r of routes) {
    const name = r === '/' ? 'home' : r.replace(/\W+/g, '_');
    await run(`${BASE}${r}`, name, 'mobile');
    await run(`${BASE}${r}`, name, 'desktop');
    console.log(`✅ Lighthouse OK for ${r}`);
  }
} catch (err) {
  console.error(`❌ ${err.message}`);
  process.exit(1);
}
console.log('✅ Lighthouse reports saved to artifacts/lh/');
