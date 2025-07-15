import Navbar from "./Navbar";
import Footer from "./Footer";
import SeoHead from "./SeoHead";

// Layout component wraps all pages, providing SEO, navigation, footer, and sticky CTAs
export default function Layout({ children, seo }) {
  return (
    <>
      {/* SEO meta tags and structured data for each page */}
      <SeoHead {...seo} />
      {/* Main navigation bar, sticky at the top */}
      <Navbar />
      {/* Main content area, with padding for sticky nav and footer */}
      <main className="pt-16 pb-20 min-h-screen bg-gray-50">{children}</main>
      {/* Footer with business info and Instagram link */}
      <Footer />
      {/* 🔄 Newly Added: Sticky WhatsApp CTA for instant messaging conversion */}
      <a
        href="https://wa.me/919999999999"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
        target="_blank"
        rel="noopener"
        id="whatsapp-cta" // For GTM/Google Ads event tracking
      >
        {/* WhatsApp SVG icon for visual cue */}
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10A10 10 0 0 1 12 22Zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.09-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.09 9.09 0 0 1-1.67-2.07c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51a.52.52 0 0 0 .07-.54c-.07-.14-.62-1.5-.85-2.06s-.45-.45-.62-.46h-.53a1.06 1.06 0 0 0-.77.36A3.22 3.22 0 0 0 6.1 9.6c-.2.34-.3.74-.3 1.16a6.13 6.13 0 0 0 1.31 3.13 10.94 10.94 0 0 0 4.13 3.6c.58.25 1.15.41 1.54.53a3.7 3.7 0 0 0 1.7.11c.52-.08 1.65-.67 1.88-1.32s.23-1.21.16-1.32-.25-.19-.53-.33Z" />
        </svg>
        WhatsApp Us
      </a>
      {/* 🔄 Newly Added: Sticky Call Now CTA for instant phone conversion */}
      <a
        href="tel:+919999999999"
        className="fixed bottom-20 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2"
        id="callnow-cta" // For GTM/Google Ads event tracking
      >
        <span role="img" aria-label="Call">
          📞
        </span>{" "}
        Call Now
      </a>
      {/* 🔄 Newly Added: Privacy reassurance note for user trust and compliance */}
      <p className="text-center text-xs text-gray-500 mt-4">
        We do not collect or store your data. Contact us via WhatsApp or phone
        only.
      </p>
    </>
  );
}
