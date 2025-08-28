// app/areas/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

export default function AreasLayout({ children }: { children: ReactNode }) {
  return (
    <section className="prose prose-invert max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Event Decoration Across Bangalore — Areas We Serve</h1>
        <Link href="/areas" className="text-sm underline opacity-80 hover:opacity-100">
          All Areas
        </Link>
      </header>
      {children}
    </section>
  );
} 