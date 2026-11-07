import { readFileSync } from 'node:fs';

const KEY = '8f4e2b9c7d6a1e3f5b0c9a8d7e6f4a2b';
const HOST = 'www.wedecorevents.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Fetch the sitemap or construct the URLs
const base = `https://${HOST}`;

// Read the indexable paths
import('../app/sitemap.ts').then(async (m) => {
  const sitemapFn = m.default;
  const items = sitemapFn();
  const urlList = items.map((i) => i.url);

  console.log(`Submitting ${urlList.length} URLs to IndexNow (Bing / Copilot / ChatGPT Search)...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow response status: ${res.status} ${res.statusText}`);
    if (res.status === 200 || res.status === 202) {
      console.log('✅ Successfully submitted all URLs to search engines via IndexNow!');
    } else {
      const text = await res.text();
      console.log('Response body:', text);
    }
  } catch (err) {
    console.error('Submission failed:', err.message);
  }
}).catch(console.error);
