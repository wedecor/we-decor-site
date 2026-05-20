'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
};

export default function TurnstileField({ siteKey, onToken, onExpire, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !siteKey) return;
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        /* ignore */
      }
    }
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onToken,
      'expired-callback': onExpire,
      'error-callback': onError ?? onExpire,
      theme: 'auto',
    });
  }, [siteKey, onToken, onExpire, onError]);

  useEffect(() => {
    if (!siteKey) {
      setLoadError(true);
      return;
    }

    const existing = document.querySelector('script[data-turnstile]');
    if (window.turnstile) {
      renderWidget();
      return;
    }

    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstile = 'true';
      script.onload = () => renderWidget();
      script.onerror = () => setLoadError(true);
      document.head.appendChild(script);
    } else {
      existing.addEventListener('load', renderWidget);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      }
    };
  }, [siteKey, renderWidget]);

  if (!siteKey || loadError) {
    return (
      <p className="text-sm text-amber-700 dark:text-amber-300" role="status">
        Security check unavailable. Please use WhatsApp directly below.
      </p>
    );
  }

  return <div ref={containerRef} className="min-h-[65px]" aria-label="Security verification" />;
}
