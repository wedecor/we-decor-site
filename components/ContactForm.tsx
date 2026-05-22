'use client';

import React, { useCallback, useRef, useState, FormEvent } from 'react';
import { CONTACT } from '@/lib/contact';
import {
  trackLeadSubmitAttempt,
  trackLeadSubmitFailure,
  trackLeadSubmitSuccess,
} from '@/lib/analytics/conversion-events';
import TurnstileField from '@/components/TurnstileField';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

const EVENT_TYPES = [
  'Birthday',
  'Wedding',
  'Haldi',
  'Engagement',
  'Corporate Event',
  'Baby Shower',
  'Anniversary',
  'Other',
] as const;

type FieldErrors = Partial<
  Record<'name' | 'phone' | 'email' | 'eventType' | 'message' | 'turnstile' | '_form', string>
>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const submitLock = useRef(false);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken('');
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitLock.current || submitState === 'submitting') return;

    setErrors({});
    setStatusMessage('');
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get('name') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      eventType: String(fd.get('eventType') ?? ''),
      eventDate: String(fd.get('eventDate') ?? '') || null,
      budget: String(fd.get('budget') ?? '') || null,
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''),
      turnstileToken: turnstileToken || undefined,
      pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrors({ turnstile: 'Please complete the security check' });
      return;
    }

    submitLock.current = true;
    setSubmitState('submitting');
    trackLeadSubmitAttempt();
    let succeeded = false;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        const details = data?.error?.details as
          | Array<{ path: string; message: string }>
          | undefined;
        const fieldErrors: FieldErrors = {};
        if (details?.length) {
          for (const d of details) {
            const key = d.path as keyof FieldErrors;
            if (
              key in fieldErrors ||
              ['name', 'phone', 'email', 'eventType', 'message'].includes(d.path)
            ) {
              fieldErrors[key] = d.message;
            }
          }
        }
        const code = data?.error?.code as string | undefined;
        if (code === 'CAPTCHA_FAILED')
          fieldErrors.turnstile = 'Security check failed. Please try again.';
        if (code === 'RATE_LIMITED')
          fieldErrors._form = 'Too many attempts. Please wait or call us.';
        if (!fieldErrors._form) {
          fieldErrors._form =
            data?.error?.message || 'Could not send your enquiry. Please try again.';
        }
        setErrors(fieldErrors);
        setSubmitState('error');
        setStatusMessage('');
        trackLeadSubmitFailure(code || 'api_error');
        resetTurnstile();
        return;
      }

      succeeded = true;
      setSubmitState('success');
      setStatusMessage(data.message || 'Thank you! We received your enquiry.');
      trackLeadSubmitSuccess({ leadId: data.leadId, eventType: payload.eventType });

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      form.reset();
      resetTurnstile();
    } catch {
      setSubmitState('error');
      setErrors({
        _form: 'Network error. Please check your connection or contact us on WhatsApp.',
      });
      trackLeadSubmitFailure('network_error');
      resetTurnstile();
    } finally {
      submitLock.current = false;
      if (!succeeded) {
        setSubmitState((s) => (s === 'submitting' ? 'error' : s));
      }
    }
  }

  const isSubmitting = submitState === 'submitting';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-10 relative"
      noValidate
      aria-busy={isSubmitting}
    >
      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="lux-label">
          Your name <span className="text-lux-gold/70">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          placeholder="Full name"
          className="lux-input"
        />
        {errors.name ? (
          <p id="name-error" className="text-lux-gold-deep text-xs mt-2" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className="lux-label">
          Phone <span className="text-lux-gold/70">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          placeholder="+91 …"
          className="lux-input"
        />
        {errors.phone ? (
          <p id="phone-error" className="text-lux-gold-deep text-xs mt-2" role="alert">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="lux-label">
          Email <span className="text-lux-gold/70">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="you@example.com"
          className="lux-input"
        />
        {errors.email ? (
          <p id="email-error" className="text-lux-gold-deep text-xs mt-2" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventType" className="lux-label">
            Celebration <span className="text-lux-gold/70">*</span>
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            defaultValue=""
            aria-invalid={!!errors.eventType}
            className="lux-input cursor-pointer"
          >
            <option value="" disabled>
              Select event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType ? (
            <p className="text-lux-gold-deep text-xs mt-2" role="alert">
              {errors.eventType}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="eventDate" className="lux-label">
            Preferred date
          </label>
          <input id="eventDate" name="eventDate" type="date" className="lux-input" />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="lux-label">
          Investment range
        </label>
        <input
          id="budget"
          name="budget"
          placeholder="e.g. ₹15,000 – ₹30,000"
          className="lux-input"
        />
      </div>

      <div>
        <label htmlFor="message" className="lux-label">
          Your vision <span className="text-lux-gold/70">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Venue, guest count, palette, and the atmosphere you imagine"
          className="lux-input resize-none min-h-[120px]"
        />
        {errors.message ? (
          <p id="message-error" className="text-lux-gold-deep text-xs mt-2" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div>
          <TurnstileField
            siteKey={TURNSTILE_SITE_KEY}
            onToken={setTurnstileToken}
            onExpire={resetTurnstile}
            onError={resetTurnstile}
          />
          {errors.turnstile ? (
            <p className="text-lux-gold-deep text-xs mt-2" role="alert">
              {errors.turnstile}
            </p>
          ) : null}
        </div>
      ) : null}

      {errors._form ? (
        <p className="text-lux-gold-deep text-sm" role="alert">
          {errors._form}
        </p>
      ) : null}

      {submitState === 'success' ? (
        <p className="text-lux-gold text-sm font-medium" role="status">
          {statusMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full lux-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending…' : 'Submit enquiry'}
      </button>

      <div className="pt-4 border-t border-white/[0.05]">
        <p className="text-xs text-lux-text-muted mb-2 tracking-wide">Direct line</p>
        <a
          href={CONTACT.waUrl()}
          className="inline-flex items-center text-lux-gold font-light hover:text-lux-gold-soft transition-colors duration-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp {CONTACT.primary.display}
        </a>
      </div>
    </form>
  );
}
