import fs from 'node:fs';
import path from 'node:path';

const ROOT = '.next';
const APP_MANIFEST = path.join(ROOT, 'server', 'app-build-manifest.json');
const LEGACY_MANIFEST = path.join(ROOT, 'build-manifest.json'); // fallback

const BUDGET_KB = Number(process.env.BUNDLE_BUDGET_KB || 500); // per-route first load
const WARN_KB = Number(process.env.BUNDLE_WARN_KB || 400);

function sizeOf(file) {
  const p = path.join('.next', file.replace(/^\/+/, ''));
  try {
    return fs.statSync(p).size;
  } catch {
    return 0;
  }
}

function kb(n) {
  return Math.round((n / 1024) * 10) / 10;
}

const has = (p) => fs.existsSync(p);
if (!has(APP_MANIFEST) && !has(LEGACY_MANIFEST)) {
  console.error('No Next build manifest found. Run `next build` first.');
  process.exit(1);
}

const manifest = JSON.parse(
  fs.readFileSync(has(APP_MANIFEST) ? APP_MANIFEST : LEGACY_MANIFEST, 'utf8')
);
const routes = manifest.pages || manifest.app || {};

let failed = false;
for (const [route, files] of Object.entries(routes)) {
  // Ignore shared layouts / root app bootstrap to avoid double-penalizing shared JS
  const skip =
    route === '/' ||
    route === '/_app' ||
    route === '/_document' ||
    route === '/_error' ||
    /\/\_app(\/|$)/.test(route) ||
    String(route).startsWith('/api') ||
    String(route).startsWith('/_next') ||
    String(route).includes('(app-client)') ||
    String(route).includes('(app-internals)') ||
    String(route).includes('middleware');
  if (skip) continue;
  if (!Array.isArray(files)) continue;
  const js = files.filter((f) => f.endsWith('.js'));
  const bytes = js.reduce((sum, f) => sum + sizeOf(f), 0);
  const routeKB = kb(bytes);
  const status = routeKB > BUDGET_KB ? 'FAIL' : routeKB > WARN_KB ? 'WARN' : 'OK';
  console.log(`${status}  ${route.padEnd(32)}  ${routeKB} kB (budget ${BUDGET_KB} kB)`);
  if (routeKB > BUDGET_KB) failed = true;
}

if (failed) {
  console.error(`Bundle budget exceeded (>${BUDGET_KB}kB).`);
  process.exit(1);
}
console.log('Bundle guard: OK');
