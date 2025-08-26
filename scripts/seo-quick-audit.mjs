import { fetch } from 'undici';
import * as cheerio from 'cheerio';

const HOST = process.env.HOST ?? 'https://www.wedecorevents.com';

async function text(url) {
  const r = await fetch(url, { redirect: 'follow' });
  return { ok: r.ok, status: r.status, body: await r.text(), url: r.url };
}

(async () => {
  const robots = await text(`${HOST}/robots.txt`);
  console.log('robots:', robots.status, robots.ok);
  if (robots.ok) {
    console.log(robots.body.slice(0, 400));
    if (/^\s*Disallow:\s*\/\s*$/im.test(robots.body)) {
      throw new Error('❌ robots.txt blocks all crawling (Disallow: /)');
    }
    if (!/^\s*Sitemap:\s*https?:\/\//im.test(robots.body)) {
      console.warn('⚠️  robots.txt missing Sitemap: line');
    }
  }

  const sm = await text(`${HOST}/sitemap.xml`);
  console.log('sitemap.xml:', sm.status, sm.ok, sm.url);
  if (!sm.ok) throw new Error('❌ sitemap.xml not reachable');

  const $ = cheerio.load(sm.body, { xmlMode: true });
  const urls = $('url > loc').map((i, el) => $(el).text()).get();
  if (urls.length === 0) {
    throw new Error('❌ sitemap.xml has no <url><loc> entries');
  }
  console.log('sample urls:', urls.slice(0, 10));
  console.log('✅ audit passed (basic checks)');
})().catch(e => { console.error(e); process.exit(1); });