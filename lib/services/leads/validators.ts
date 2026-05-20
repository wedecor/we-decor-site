import { z } from 'zod';

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

export const contactLeadSchema = z.object({
  name: trimString(120).regex(/^[a-zA-Z\u00C0-\u024F\s'.-]+$/, 'Name contains invalid characters'),
  phone: z
    .string()
    .trim()
    .min(10)
    .max(20)
    .transform((v) => v.replace(/[\s-]/g, ''))
    .refine((v) => /^(\+91)?[6-9]\d{9}$/.test(v), {
      message: 'Enter a valid Indian mobile number (10 digits, starting 6–9)',
    }),
  email: z.string().trim().email('Invalid email address').max(254),
  eventType: trimString(80),
  eventDate: z
    .string()
    .trim()
    .max(32)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
  budget: z
    .string()
    .trim()
    .max(64)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
  message: trimString(4000),
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
    .refine((v) => v === undefined || /^https?:\/\//.test(v), { message: 'Invalid page URL' }),
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;

export function formatZodErrors(error: z.ZodError): Array<{ path: string; message: string }> {
  return error.issues.map((i) => ({
    path: i.path.join('.') || 'body',
    message: i.message,
  }));
}
