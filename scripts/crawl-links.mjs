#!/usr/bin/env node
/**
 * Broken Link Crawler
 * Crawls internal links only to find 404/500 errors
 * Usage: BASE=http://localhost:3001 node scripts/crawl-links.mjs
 */

import { writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

const BASE = process.env.BASE || 'http://localhost:3001';
const MAX_PAGES = Number(process.env.MAX_PAGES || 200);

const seen = new Set();
const queue = new Set([`${BASE}/`]);
const broken = [];

function isInternal(url) {
  try {
    const u = new URL(url, BASE);
    return u.origin === new URL(BASE).origin;
  } catch { 
    return false; 
  }
}

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}${message}${colors.reset}`);
}

async function crawlLinks() {
  log('🔍 Starting broken link crawler...', 'info');
  log(`Base URL: ${BASE}`, 'info');
  log(`Max pages: ${MAX_PAGES}`, 'info');

  while (queue.size && seen.size < MAX_PAGES) {
    const url = queue.values().next().value;
    queue.delete(url);
    
    if (seen.has(url)) continue;
    seen.add(url);

    log(`Checking: ${url}`, 'info');

    let res;
    try {
      res = await fetch(url, { 
        redirect: 'manual',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
        }
      });
    } catch (e) {
      broken.push({ url, status: 'FETCH_ERROR', error: String(e) });
      log(`❌ Fetch error: ${url} - ${e.message}`, 'error');
      continue;
    }

    if (res.status >= 400) {
      broken.push({ url, status: res.status });
      log(`❌ Broken link: ${url} - Status: ${res.status}`, 'error');
      continue;
    }

    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('text/html')) {
      log(`⏭️  Skipping non-HTML: ${url} (${ct})`, 'warning');
      continue;
    }

    try {
      const html = await res.text();
      const dom = new JSDOM(html);
      const as = [...dom.window.document.querySelectorAll('a[href]')];

      for (const a of as) {
        const href = a.getAttribute('href');
        if (!href) continue;
        
        try {
          const next = new URL(href, url).toString();
          if (isInternal(next) && !seen.has(next)) {
            queue.add(next);
          }
        } catch { 
          // Ignore malformed URLs
        }
      }
    } catch (e) {
      log(`⚠️  Error parsing HTML for ${url}: ${e.message}`, 'warning');
    }
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    base: BASE,
    checked: seen.size,
    broken: broken.length,
    brokenLinks: broken,
    checkedUrls: Array.from(seen)
  };

  // Save report
  await writeFile(join(ARTIFACTS_DIR, 'broken_links.json'), JSON.stringify(report, null, 2));
  
  // Console output
  log('\n📊 Broken Link Crawler Results', 'info');
  log('='.repeat(50), 'info');
  log(`Total pages checked: ${seen.size}`, 'info');
  log(`Broken links found: ${broken.length}`, broken.length > 0 ? 'error' : 'success');

  if (broken.length > 0) {
    log('\n❌ Broken Links:', 'error');
    broken.slice(0, 10).forEach(link => {
      log(`  • ${link.url} - Status: ${link.status}`, 'error');
    });
    if (broken.length > 10) {
      log(`  ... and ${broken.length - 10} more`, 'error');
    }
    log(`\n📄 Full report saved to: ${join(ARTIFACTS_DIR, 'broken_links.json')}`, 'info');
    process.exit(1);
  } else {
    log('\n✅ All internal links are working!', 'success');
    log(`📄 Report saved to: ${join(ARTIFACTS_DIR, 'broken_links.json')}`, 'info');
  }
}

// Run the crawler
crawlLinks().catch(error => {
  log(`💥 Crawler failed: ${error.message}`, 'error');
  process.exit(1);
});