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
        <button
          type="button"
          className="rounded-full px-8 py-3 text-sm font-medium text-[#f5f0e6] transition-transform hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #009e88, #00ad96)',
            boxShadow: '0 10px 28px -6px rgba(0, 184, 156, 0.35)',
          }}
          onClick={reset}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
