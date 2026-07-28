'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <main className="lux-page lux-container px-6 py-24 md:py-32 text-center">
      <p className="lux-eyebrow mb-6">Something went wrong</p>
      <h1 className="lux-heading mb-6">We could not load this page</h1>
      <p className="lux-body max-w-md mx-auto mb-12">
        Please try again. If the problem continues, contact us on WhatsApp.
      </p>
      <button type="button" onClick={reset} className="lux-btn-primary">
        Try again
      </button>
    </main>
  );
}
