import Navbar from "./Navbar";
import Footer from "./Footer";
import SeoHead from "./SeoHead";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  seo?: Record<string, any>;
}

export default function Layout({ children, seo }: LayoutProps) {
  return (
    <>
      <SeoHead {...seo} />
      <Navbar />
      <main className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">{children}</main>
      <Footer />
      {/* Sticky WhatsApp CTA */}
      <a
        href="https://wa.me/918880544452"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 hover:from-green-500 hover:to-pink-500 hover:scale-105 transition transform duration-200 animate-pulse hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
        target="_blank"
        rel="noopener"
        id="whatsapp-cta"
        data-gtm="click-whatsapp"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10A10 10 0 0 1 12 22Zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.09-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.09 9.09 0 0 1-1.67-2.07c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51a.52.52 0 0 0 .07-.54c-.07-.14-.62-1.5-.85-2.06s-.45-.45-.62-.46h-.53a1.06 1.06 0 0 0-.77.36A3.22 3.22 0 0 0 6.1 9.6c-.2.34-.3.74-.3 1.16a6.13 6.13 0 0 0 1.31 3.13 10.94 10.94 0 0 0 4.13 3.6c.58.25 1.15.41 1.54.53a3.7 3.7 0 0 0 1.7.11c.52-.08 1.65-.67 1.88-1.32s.23-1.21.16-1.32-.25-.19-.53-.33Z" />
        </svg>
        <span className="font-bold text-base hidden sm:inline">WhatsApp Us</span>
      </a>
      {/* Sticky Call Now CTA */}
      <a
        href="tel:+918880544452"
        className="fixed bottom-24 right-6 bg-gradient-to-r from-pink-400 to-green-400 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 hover:from-pink-500 hover:to-green-500 hover:scale-105 transition transform duration-200 animate-pulse hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
        id="callnow-cta"
        data-gtm="click-callnow"
        aria-label="Call us now"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.35.27 2.67.76 3.88a1 1 0 0 1-.21 1.11l-2.2 2.2Z"/></svg>
        <span className="font-bold text-base hidden sm:inline">Call Now</span>
      </a>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 font-sans">
        We do not collect or store your data. Contact us via WhatsApp or phone only.
      </p>
    </>
  );
}
