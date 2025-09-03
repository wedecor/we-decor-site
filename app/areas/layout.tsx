// app/areas/layout.tsx
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AreasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="top" className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
      <Footer />
    </>
  );
}
