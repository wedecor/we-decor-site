import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/errors';
import { getClientIp, rateLimitPlaces } from '@/lib/rate-limit';
import { isAllowedOrigin } from '@/lib/security/origin';
import { leadPlacesAutocompleteUrl } from '@/lib/services/leads/appFunctions';
import { googlePlacesAutocomplete } from '@/lib/services/leads/googlePlaces';

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

  let body: { input?: unknown; sessionToken?: unknown };
  try {
    body = (await request.json()) as { input?: unknown; sessionToken?: unknown };
  } catch {
    return apiError('VALIDATION_ERROR', 'Invalid JSON body', 400);
  }

  const url = leadPlacesAutocompleteUrl();
  const secret = process.env.LEAD_WEBHOOK_SECRET?.trim();
  if (url && secret) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Lead-Secret': secret,
        },
        body: JSON.stringify({
          input: body.input,
          sessionToken: body.sessionToken,
        }),
        signal: AbortSignal.timeout(8000),
      });
      const data = (await res.json().catch(() => ({}))) as {
        suggestions?: unknown;
      };
      if (res.ok) {
        return apiSuccess({
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        });
      }
    } catch {
      // Fall through to the Places key on this app.
    }
  }

  return apiSuccess({
    suggestions: await googlePlacesAutocomplete(body.input, body.sessionToken),
  });
}
