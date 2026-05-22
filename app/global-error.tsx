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
        style={{ background: '#0b0713', color: '#f6f1e8' }}
      >
        <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#d4b15a' }}>
          Something went wrong
        </p>
        <h2 className="font-display text-3xl font-light mb-8">Please try again</h2>
        <button
          type="button"
          className="rounded-full px-8 py-3 text-sm font-medium text-[#f6f1e8] transition-transform hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #0e8f78, #18b99a)',
            boxShadow: '0 10px 28px -6px rgba(14, 143, 120, 0.45)',
          }}
          onClick={reset}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
