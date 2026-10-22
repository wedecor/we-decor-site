type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
};

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string | null
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (!secret || !siteKey) {
    // Keys were never set on Vercel. Failing closed here rejects every live
    // enquiry with "Security verification failed" and no widget on the page.
    // Skip until both TURNSTILE_SECRET_KEY and NEXT_PUBLIC_TURNSTILE_SITE_KEY
    // are present; honeypot + origin + rate-limit still apply.
    if (process.env.NODE_ENV === 'production') {
      console.warn(JSON.stringify({ event: 'captcha_not_configured' }));
    }
    return { ok: true, reason: 'captcha_not_configured' };
  }
  if (!token?.trim()) {
    return { ok: false, reason: 'missing_token' };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return { ok: false, reason: 'captcha_upstream_error' };
    }

    const data = (await res.json()) as TurnstileVerifyResponse;
    if (!data.success) {
      return { ok: false, reason: data['error-codes']?.join(',') || 'captcha_failed' };
    }

    const expectedHost = process.env.TURNSTILE_EXPECTED_HOSTNAME?.trim();
    if (expectedHost && data.hostname && data.hostname !== expectedHost) {
      return { ok: false, reason: 'captcha_hostname_mismatch' };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: 'captcha_verify_timeout' };
  }
}

export function isTurnstileConfigured(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY?.trim() && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  );
}
