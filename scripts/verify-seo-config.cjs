#!/usr/bin/env node
const url = process.env.NEXT_PUBLIC_SITE_URL;
if (!url) {
  console.error('NEXT_PUBLIC_SITE_URL is required');
  process.exit(1);
}
try {
  const u = new URL(url);
  if (u.hostname === 'localhost') throw new Error('localhost not allowed');
} catch (e) {
  console.error('Invalid NEXT_PUBLIC_SITE_URL:', e.message);
  process.exit(1);
}
console.log('verify-seo: OK', url);
