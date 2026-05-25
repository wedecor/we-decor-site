const BASE = process.env.SEO_BASE_URL ?? 'http://localhost:3000';
(async () => {
  const r = await fetch(`${BASE.replace(/\/+$/, '')}/`);
  const html = await r.text();
  const hasPrimary = /8880\s*5?\s*44452|8880544452/.test(html);
  const hasSecondary = /9591\s*2?\s*32166|9591232166/.test(html);
  const hasWa = /wa\.me\/?918880544452/.test(html);
  if (!hasPrimary) throw new Error('Primary display number missing');
  if (!hasSecondary) throw new Error('Secondary display number missing');
  if (!hasWa) throw new Error('WhatsApp CTA number incorrect/missing');
  console.log('✅ Phone policy OK: display both numbers; WA uses 8880544452');
})();
