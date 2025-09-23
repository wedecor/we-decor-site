// app/areas/layout.tsx
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AreasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="top" className="pt-16 min-h-screen bg-[#faf7f2] dark:bg-[#0f3d3e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">{children}</div>
      </main>
      <Footer />
    </>
  );
}
