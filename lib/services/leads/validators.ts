import { z } from 'zod';

// eslint-disable-next-line no-control-regex -- strip control chars from user input
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const SCRIPT_TAG = /<script\b/i;

const trimString = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((v) => !CONTROL_CHARS.test(v), 'Invalid characters')
    .refine((v) => !SCRIPT_TAG.test(v), 'Invalid content');

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null));

export const contactLeadSchema = z.object({
  name: trimString(120).regex(/^[a-zA-Z\u00C0-\u024F\s'.-]+$/, 'Name contains invalid characters'),
  /** Website form no longer asks; accepted if a client still sends it. */
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .nullable()
    .transform((v) => (v ? v.replace(/[\s-]/g, '') : ''))
    .refine((v) => v === '' || /^(\+91)?[6-9]\d{9}$/.test(v), {
      message: 'Enter a valid Indian mobile number (10 digits, starting 6–9)',
    }),
  email: z
    .string()
    .trim()
    .max(254)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null))
    .refine((v) => v === null || z.string().email().safeParse(v).success, {
      message: 'Invalid email address',
    }),
  eventType: trimString(80),
  eventDate: z
    .string({ error: 'Choose your event date' })
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose your event date')
    .refine(isRealDate, 'Choose a valid date')
    .refine((v) => v >= todayInIndia(), 'Choose a date from today onwards'),
  budget: optionalText(64),
  /** @deprecated use location — kept so older clients still validate. */
  area: optionalText(200).refine(
    (v) => v === null || (!CONTROL_CHARS.test(v) && !SCRIPT_TAG.test(v)),
    {
      message: 'Invalid characters',
    }
  ),
  location: trimString(200).refine((v) => !CONTROL_CHARS.test(v) && !SCRIPT_TAG.test(v), {
    message: 'Invalid characters',
  }),
  place: z
    .object({
      placeId: z.string().trim().min(8).max(512),
      address: optionalText(300),
      lat: z.number().finite().nullable().optional(),
      lng: z.number().finite().nullable().optional(),
      area: optionalText(120),
      city: optionalText(80),
    })
    .optional()
    .nullable(),
  message: z
    .string()
    .trim()
    .max(4000)
    .optional()
    .nullable()
    .transform((v) => v ?? '')
    .refine((v) => !CONTROL_CHARS.test(v), 'Invalid characters')
    .refine((v) => !SCRIPT_TAG.test(v), 'Invalid content'),
  /** Honeypot — must be empty */
  website: z
    .string()
    .optional()
    .transform((v) => v ?? '')
    .refine((v) => v.length === 0, { message: 'Spam detected' }),
  turnstileToken: z.string().optional(),
  pageUrl: z
    .string()
    .max(500)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined))
    .refine((v) => v === undefined || isOwnPageUrl(v), { message: 'Invalid page URL' }),
});

/** Today's date in India as YYYY-MM-DD (the business works in IST). */
export function todayInIndia(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
}

function isRealDate(value: string): boolean {
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function isOwnPageUrl(value: string): boolean {
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wedecorevents.com');
    if (parsed.origin === site.origin) return true;
    if (process.env.NODE_ENV !== 'production') {
      return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    }
    return false;
  } catch {
    return false;
  }
}

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;

export function formatZodErrors(error: z.ZodError): Array<{ path: string; message: string }> {
  return error.issues.map((i) => ({
    path: i.path.join('.') || 'body',
    message: i.message,
  }));
}
