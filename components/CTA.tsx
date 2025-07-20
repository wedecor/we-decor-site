export default function CTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8">
      <a
        href="tel:+917019169442"
        className="rounded-full px-6 py-3 bg-gradient-to-r from-green-400 to-pink-400 text-white font-bold shadow-lg hover:from-green-500 hover:to-pink-500 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        📞 Call Now: +91 7019169442
      </a>
      <a
        href="https://wa.me/917019169442"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full px-6 py-3 bg-green-100 text-green-700 font-bold shadow hover:bg-green-200 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        💬 WhatsApp Us
      </a>
    </div>
  );
} 