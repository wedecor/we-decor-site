#!/usr/bin/env node
/**
 * Secrets scanning — fails CI/pre-commit on high/critical findings.
 * Usage: node scripts/secrets-scan.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

const PLACEHOLDER_MARKERS = [
  'your-cloudinary',
  'G-XXXXXXX',
  'REPLACE_ME',
  'CHANGEME',
  'xxx',
  'example.com',
];

const SECRET_PATTERNS = [
  {
    name: 'Google API Key',
    pattern: /AIza[0-9A-Za-z\-_]{35}/g,
    severity: 'critical',
  },
  {
    name: 'Vercel OIDC JWT',
    pattern: /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
    severity: 'critical',
  },
  {
    name: 'GitHub Token',
    pattern: /gh[pousr]_[A-Za-z0-9]{36,}/g,
    severity: 'critical',
  },
  {
    name: 'Cloudinary API Secret',
    pattern: /api_secret\s*[:=]\s*['"]([a-zA-Z0-9_-]{10,})['"]/gi,
    severity: 'critical',
  },
  {
    name: 'Cloudinary API Key (hardcoded)',
    pattern: /api_key\s*[:=]\s*['"]\d{10,}['"]/gi,
    severity: 'high',
  },
  {
    name: 'Private Key Block',
    pattern: /-----BEGIN (?:RSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA )?PRIVATE KEY-----/g,
    severity: 'critical',
  },
  {
    name: 'Sentry DSN',
    pattern: /https:\/\/[a-f0-9]{32}@[a-z0-9.-]+\.ingest\.sentry\.io\/\d+/gi,
    severity: 'high',
  },
  {
    name: 'Stripe Live Key',
    pattern: /sk_live_[A-Za-z0-9]{24,}/g,
    severity: 'critical',
  },
];

const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'coverage',
  '.vercel',
  '.cache',
  'playwright-report',
  'test-results',
]);

const EXCLUDE_FILES = new Set([
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'SECURITY_REMEDIATION_REPORT.md',
]);

const ALLOWLIST_PATHS = [
  /^env\/\.env\.example$/,
  /^\.gitleaks\.toml$/,
];

const SCAN_EXTENSIONS = new Set([
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.json',
  '.env',
  '.yaml',
  '.yml',
  '.md',
  '.txt',
  '.sh',
  '.mjs',
  '.cjs',
]);

const TRACKED_ENV_FORBIDDEN = [
  '.env',
  '.env.local',
  '.env.production',
  '.env.development',
  '.env.test',
];

function log(msg, color) {
  const colors = { red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', blue: '\x1b[34m', reset: '\x1b[0m' };
  console.log(`${colors[color] || ''}${msg}${colors.reset}`);
}

function rel(p) {
  return p.replace(PROJECT_ROOT + '/', '');
}

function isPlaceholder(match) {
  return PLACEHOLDER_MARKERS.some((m) => match.toLowerCase().includes(m.toLowerCase()));
}

function isAllowlisted(filePath) {
  const r = rel(filePath);
  return ALLOWLIST_PATHS.some((re) => re.test(r));
}

function shouldScanFile(filePath) {
  const name = basename(filePath);
  if (EXCLUDE_FILES.has(name)) return false;
  if (isAllowlisted(filePath)) return false;
  const ext = extname(filePath);
  if (name.startsWith('.env')) return true;
  return SCAN_EXTENSIONS.has(ext);
}

function shouldScanDir(dirPath) {
  return !EXCLUDE_DIRS.has(basename(dirPath));
}

function getTrackedFiles() {
  try {
    return execSync('git ls-files', { cwd: PROJECT_ROOT, encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

function checkTrackedEnvFiles(findings) {
  const tracked = getTrackedFiles();
  for (const envFile of TRACKED_ENV_FORBIDDEN) {
    if (tracked.includes(envFile)) {
      findings.push({
        pattern: 'Tracked environment file',
        severity: 'critical',
        match: envFile,
        line: 0,
        file: envFile,
      });
    }
  }
}

function scanFileContent(filePath, content, findings) {
  for (const { name, pattern, severity } of SECRET_PATTERNS) {
    for (const match of content.matchAll(pattern)) {
      const value = match[0];
      if (isPlaceholder(value)) continue;
      findings.push({
        pattern: name,
        severity,
        match: value.length > 80 ? value.slice(0, 80) + '…' : value,
        line: content.substring(0, match.index).split('\n').length,
        file: rel(filePath),
      });
    }
  }
}

function scanDirectory(dirPath, findings) {
  for (const item of readdirSync(dirPath)) {
    const itemPath = join(dirPath, item);
    const st = statSync(itemPath);
    if (st.isDirectory()) {
      if (shouldScanDir(itemPath)) scanDirectory(itemPath, findings);
    } else if (shouldScanFile(itemPath)) {
      try {
        const content = readFileSync(itemPath, 'utf8');
        scanFileContent(itemPath, content, findings);
      } catch {
        /* skip binary */
      }
    }
  }
}

function main() {
  log('Starting secrets scan…', 'blue');
  const findings = [];
  checkTrackedEnvFiles(findings);
  scanDirectory(PROJECT_ROOT, findings);

  const critical = findings.filter((f) => f.severity === 'critical');
  const high = findings.filter((f) => f.severity === 'high');
  const medium = findings.filter((f) => f.severity === 'medium');
  const status = critical.length + high.length === 0 ? 'PASS' : 'FAIL';

  if (!existsSync(ARTIFACTS_DIR)) {
    try {
      execSync(`mkdir -p "${ARTIFACTS_DIR}"`, { cwd: PROJECT_ROOT });
    } catch {
      /* ignore */
    }
  }

  const report = {
    timestamp: new Date().toISOString(),
    status,
    summary: {
      total: findings.length,
      critical: critical.length,
      high: high.length,
      medium: medium.length,
    },
    findings,
  };

  writeFileSync(join(ARTIFACTS_DIR, 'secrets_scan.json'), JSON.stringify(report, null, 2));

  log(`\nTotal: ${findings.length} | Critical: ${critical.length} | High: ${high.length}`, 'blue');

  for (const f of [...critical, ...high]) {
    log(`  • ${f.file}:${f.line} [${f.severity}] ${f.pattern}`, f.severity === 'critical' ? 'red' : 'yellow');
    log(`    ${f.match}`, 'yellow');
  }

  if (status === 'PASS') {
    log('\n✅ Secrets scan passed.', 'green');
    process.exit(0);
  }

  log('\n❌ Secrets scan FAILED. Rotate exposed credentials and remove from git history.', 'red');
  process.exit(1);
}

main();
