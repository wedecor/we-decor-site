/**
 * Strip HTML/tags and normalize user-provided strings for lead storage.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

export function sanitizeLeadField(value: string, maxLength: number): string {
  const stripped = stripHtml(value);
  return stripped.slice(0, maxLength);
}

/** Hash IP for logs/metadata without storing raw IP (GDPR-friendly) */
export function hashIp(ip: string, salt: string): string {
  if (!ip || ip === 'unknown') return 'unknown';
  let h = 0;
  const s = `${salt}:${ip}`;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return `ip_${Math.abs(h).toString(36)}`;
}
