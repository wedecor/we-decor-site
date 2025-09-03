import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const exts = new Set(['.tsx', '.ts', '.jsx', '.js']);

let issues = 0;

function walk(dir: string) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !full.includes('node_modules')) walk(full);
    else if (exts.has(path.extname(full))) auditFile(full);
  }
}

function auditFile(fp: string) {
  const src = fs.readFileSync(fp, 'utf8');

  // Check for href attributes in both Link and anchor tags
  // Updated regex to better handle template literals and avoid false positives
  const regex = /href\s*=\s*{?\s*["'`]([^"'`}]*)["'`]/g;
  let m;

  while ((m = regex.exec(src))) {
    const href = m[1];

    // Skip template literals with JavaScript expressions
    if (href.includes('${') || href.includes('`')) {
      continue;
    }

    const hasTrailing = href.length > 1 && href.endsWith('/');
    const hasUpper = /[A-Z]/.test(href);

    if (hasTrailing || hasUpper) {
      issues++;
      const suggested = href.replace(/\/+$/, '').toLowerCase();
      console.log(`⚠ ${fp}: ${href} -> ${suggested}`);
    }
  }

  // Also check for hardcoded URLs that might have issues
  const urlRegex = /["'`](https?:\/\/[^"'`]+)["'`]/g;
  while ((m = urlRegex.exec(src))) {
    const url = m[1];
    if (url.includes('wedecorevents.com') && (url.includes('//') || /[A-Z]/.test(url))) {
      issues++;
      console.log(`⚠ ${fp}: Hardcoded URL with potential issues: ${url}`);
    }
  }
}

console.log('🔍 Auditing internal links for trailing slashes and uppercase segments...\n');

walk(path.join(ROOT, 'pages'));
walk(path.join(ROOT, 'components'));

if (!issues) {
  console.log('✅ No internal link issues found.');
} else {
  console.log(`\n📊 Found ${issues} potential link issues.`);
  console.log('💡 Fix these to prevent unnecessary redirects and improve SEO.');
}
