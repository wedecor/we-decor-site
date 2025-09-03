'use client';
import type { ReactNode } from 'react';

export default function AreaPageShell({ children }: { children: ReactNode }) {
  return <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">{children}</section>;
}
