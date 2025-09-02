// app/areas/layout.tsx
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AreasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="top" className="pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}