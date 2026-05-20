import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/errors';
import { getClientIp, rateLimitContact } from '@/lib/rate-limit';
import { isAllowedOrigin } from '@/lib/security/origin';
import { hashIp } from '@/lib/security/sanitize';
import { verifyTurnstileToken } from '@/lib/security/turnstile';
import { createLead } from '@/lib/services/leads/createLead';
import {
  contactLeadSchema,
  formatZodErrors,
} from '@/lib/services/leads/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 16_384;

function isSpamPayload(body: Record<string, unknown>): boolean {
  if (typeof body.website === 'string' && body.website.length > 0) return true;
  const msg = String(body.message ?? '');
  const linkCount = (msg.match(/https?:\/\//gi) || []).length;
  if (linkCount > 3) return true;
  if (/viagra|casino|crypto airdrop/i.test(msg)) return true;
  return false;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return apiError('ORIGIN_FORBIDDEN', 'Request origin not allowed', 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return apiError('PAYLOAD_TOO_LARGE', 'Request body too large', 413);
  }

  const ip = getClientIp(request);
  const rate = await rateLimitContact(ip);
  if (!rate.success) {
    return apiError(
      'RATE_LIMITED',
      'Too many requests. Please try again later.',
      429,
    );
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return apiError('PAYLOAD_TOO_LARGE', 'Request body too large', 413);
    }
    raw = JSON.parse(text);
  } catch {
    return apiError('VALIDATION_ERROR', 'Invalid JSON body', 400);
  }

  if (!raw || typeof raw !== 'object') {
    return apiError('VALIDATION_ERROR', 'Invalid request body', 400);
  }

  const body = raw as Record<string, unknown>;

  if (isSpamPayload(body)) {
    return apiError('SPAM_DETECTED', 'Submission rejected', 400);
  }

  const parsed = contactLeadSchema.safeParse(body);
  if (!parsed.success) {
    return apiError('VALIDATION_ERROR', 'Validation failed', 400, formatZodErrors(parsed.error));
  }

  const data = parsed.data;
  const token = data.turnstileToken ?? (body.turnstileToken as string | undefined);
  const captcha = await verifyTurnstileToken(token || '', ip);
  if (!captcha.ok) {
    return apiError('CAPTCHA_FAILED', 'Security verification failed. Please try again.', 400);
  }

  try {
    const ipSalt = process.env.LEAD_IP_HASH_SALT || 'we-decor';
    const result = await createLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      eventType: data.eventType,
      eventDate: data.eventDate,
      budget: data.budget,
      message: data.message,
      source: 'contact_form',
      metadata: {
        userAgent: request.headers.get('user-agent'),
        ipHash: hashIp(ip, ipSalt),
        locale: request.headers.get('accept-language')?.split(',')[0] ?? null,
        pageUrl: data.pageUrl || null,
      },
    });

    return apiSuccess({
      success: true,
      leadId: result.lead.id,
      whatsappUrl: result.whatsappUrl,
      message: 'Thank you! Your enquiry was received. Opening WhatsApp to confirm with our team.',
    });
  } catch {
    return apiError('INTERNAL_ERROR', 'Unable to process your enquiry. Please call us directly.', 500);
  }
}

export async function GET() {
  return apiError('VALIDATION_ERROR', 'Method not allowed', 405);
}
