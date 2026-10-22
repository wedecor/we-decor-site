import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/errors';
import { getClientIp, rateLimitPlaces } from '@/lib/rate-limit';
import { isAllowedOrigin } from '@/lib/security/origin';
import { leadPlacesDetailsUrl } from '@/lib/services/leads/appFunctions';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return apiError('ORIGIN_FORBIDDEN', 'Request origin not allowed', 403);
  }

  const ip = getClientIp(request);
  const rate = await rateLimitPlaces(ip);
  if (!rate.success) {
    return apiError('RATE_LIMITED', 'Too many location searches. Please wait a moment.', 429);
  }

  const url = leadPlacesDetailsUrl();
  const secret = process.env.LEAD_WEBHOOK_SECRET?.trim();
  if (!url || !secret) {
    return apiSuccess({ place: null });
  }

  let body: { placeId?: unknown; sessionToken?: unknown };
  try {
    body = (await request.json()) as { placeId?: unknown; sessionToken?: unknown };
  } catch {
    return apiError('VALIDATION_ERROR', 'Invalid JSON body', 400);
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lead-Secret': secret,
      },
      body: JSON.stringify({
        placeId: body.placeId,
        sessionToken: body.sessionToken,
      }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => ({}))) as { place?: unknown };
    if (!res.ok) {
      return apiSuccess({ place: null });
    }
    return apiSuccess({ place: data.place ?? null });
  } catch {
    return apiSuccess({ place: null });
  }
}
