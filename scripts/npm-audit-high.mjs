/**
 * Fail CI on high/critical npm advisories, except GHSA-vfj7-8cjw-p6xm (braces).
 *
 * braces <= 3.0.3 (latest on npm) has no patched release. `npm audit fix --force`
 * would install Tailwind 4, which this site does not use. Every remaining high
 * finding in the tree is a parent of that one advisory. Any other high/critical
 * GHSA still fails the build.
 */
import { execSync } from 'node:child_process';

const ALLOWED = new Set(['GHSA-VFJ7-8CJW-P6XM']);
const GHSA = /GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}/i;

function runAudit() {
  try {
    return execSync('npm audit --json', {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (err) {
    if (typeof err.stdout === 'string' && err.stdout.trim()) return err.stdout;
    throw err;
  }
}

function ghsaFrom(via) {
  if (!via || typeof via !== 'object') return null;
  const sev = String(via.severity || '').toLowerCase();
  if (sev !== 'high' && sev !== 'critical') return null;
  const fromUrl = String(via.url || '').match(GHSA);
  if (fromUrl) return fromUrl[0].toUpperCase();
  const fromSource = String(via.source || '').match(GHSA);
  return fromSource ? fromSource[0].toUpperCase() : null;
}

function rootAdvisories(vulns, name, seen = new Set()) {
  if (seen.has(name)) return [];
  seen.add(name);
  const node = vulns[name];
  if (!node) return [];
  const ids = [];
  for (const via of node.via || []) {
    if (typeof via === 'string') ids.push(...rootAdvisories(vulns, via, seen));
    else {
      const id = ghsaFrom(via);
      if (id) ids.push(id);
    }
  }
  return ids;
}

const report = JSON.parse(runAudit());
const vulns = report.vulnerabilities || {};
const blocked = [];

for (const [name, node] of Object.entries(vulns)) {
  if (node.severity !== 'high' && node.severity !== 'critical') continue;
  const ids = [...new Set(rootAdvisories(vulns, name))];
  const extra = ids.filter((id) => !ALLOWED.has(id));
  if (ids.length === 0 || extra.length) {
    blocked.push({ name, severity: node.severity, ids: extra.length ? extra : ids });
  }
}

if (blocked.length) {
  console.error('High/critical advisories not on the braces allowlist:');
  for (const row of blocked) {
    console.error(`  ${row.severity} ${row.name} ${row.ids.join(' ') || '(unattributed)'}`);
  }
  process.exit(1);
}

console.log(
  'npm audit: no high/critical advisories beyond GHSA-vfj7-8cjw-p6xm (braces, no upstream patch).'
);
