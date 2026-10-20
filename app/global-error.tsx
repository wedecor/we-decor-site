'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
        style={{ background: '#0f0a12', color: '#f5f0e6' }}
      >
        <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#c8a96b' }}>
          Something went wrong
        </p>
        <h2 className="font-display text-3xl font-light mb-8">Please try again</h2>
        {/* global-error renders its own <html>, so it cannot use lux-btn-primary
            from globals.css — these styles are inlined on purpose and must be
            kept in step with it by hand. */}
        <button
          type="button"
          className="rounded-[4px] px-8 py-3.5 text-sm font-medium tracking-wide text-[#0f0a12] transition-all duration-300 ease-out active:scale-[0.98]"
          style={{ background: '#c8a96b', border: '1px solid #c8a96b' }}
          onClick={reset}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
