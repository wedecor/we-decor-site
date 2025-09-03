import assert from 'node:assert/strict';
import fetch from 'node-fetch';
import { SITE_URL } from '../lib/site';

const base = process.env.NEXT_PUBLIC_SITE_URL!;
const PROD_URL = SITE_URL;
const want = ['/', '/services', '/gallery', '/areas', '/locations'];

(async () => {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const u of want) {
    // Check for both localhost and production URLs
    const localUrl = `${base}${u}`;
    const prodUrl = `${PROD_URL}${u}`;
    assert(xml.includes(localUrl) || xml.includes(prodUrl), `Missing ${u} in sitemap`);
  }
  console.log('sitemap validation OK');
})();
