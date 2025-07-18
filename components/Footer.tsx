import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-50 to-pink-50 dark:from-gray-900 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 text-gray-600 dark:text-gray-300 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo and business name */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="We Decor Logo" width={40} height={40} className="rounded-full shadow" />
            <div>
              <div className="font-bold text-green-700 dark:text-green-200 text-xl">We Decor</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Bringing Dreams to Life in Bangalore</div>
            </div>
          </div>
          {/* Instagram handle */}
          <a
            href="https://instagram.com/wedecorbangalore"
            className="flex items-center gap-2 text-pink-500 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-200 transition-colors duration-200 font-semibold"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg>
            <span>@wedecorbangalore</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-green-700 dark:text-green-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200">About Us</Link></li>
              <li><Link href="/services/birthday-decoration" className="hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200">Gallery</Link></li>
              <li><Link href="/pricing" className="hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-green-700 dark:text-green-200 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.35.27 2.67.76 3.88a1 1 0 0 1-.21 1.11l-2.2 2.2Z" /></svg>
                <a href="tel:+918880544452" className="hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200">+91 8880544452</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>Bangalore, India</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span>Mon–Sun, 9am–9pm</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-green-200">We Decor</span>, Bangalore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
