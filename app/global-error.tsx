'use client';
import { useEffect } from 'react';
// import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Sentry.captureException?.(error);
  }, [error]);
  return (
    <html lang="en">
      <body className="p-8 space-y-4">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <button className="px-4 py-2 rounded bg-black text-white" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  );
}
