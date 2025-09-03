#!/usr/bin/env node
const assert = (c, m) => {
  if (!c) {
    console.error(m);
    process.exit(1);
  }
};
const fetch = (...a) => import('node-fetch').then(({ default: f }) => f(...a));
const BASE = process.env.VERIFY_BASE || 'http://localhost:3000';
const routes = [
  '/areas/east-bangalore',
  '/areas/west-bangalore',
  '/areas/north-bangalore',
  '/areas/south-bangalore',
  '/areas/central-bangalore',
];
const hasSections = (html) =>
  /<h2[^>]*>\s*Case Study\s*<\/h2>/i.test(html) &&
  /<h2[^>]*>\s*Call to Action\s*<\/h2>/i.test(html);
(async () => {
  for (const r of routes) {
    const res = await fetch(`${BASE}${r}`);
    const html = await res.text();
    assert(res.status === 200, `Route failed: ${r} (${res.status})`);
    assert(hasSections(html), `Missing Case Study/CTA: ${r}`);
  }
  console.log('verify-localities: OK');
})();
