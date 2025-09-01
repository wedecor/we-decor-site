import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "We Decor - Bringing Dreams to Life | Bangalore's Trusted Event Decorators",
  description: "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999. Call +91 8880544452.",
  keywords: "wedding decoration, birthday decoration, haldi decoration, event decorators, Bangalore decorators, stage decoration, tent setup, balloon decoration",
  authors: [{ name: "We Decor" }],
  creator: "We Decor",
  publisher: "We Decor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "We Decor - Bringing Dreams to Life | Bangalore's Trusted Event Decorators",
    description: "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999. Call +91 8880544452.",
    url: "/",
    siteName: "We Decor",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "We Decor - Event Decoration Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "We Decor - Bringing Dreams to Life | Bangalore's Trusted Event Decorators",
    description: "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999. Call +91 8880544452.",
    images: ["/og-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6">We Decor</h1>
        <h2 className="text-3xl mb-4">Bringing Dreams to Life</h2>
        <p className="text-xl mb-8">App Router Homepage - Working!</p>
        <a 
          href="/pages" 
          className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
        >
          View Pages Router
        </a>
      </div>
    </div>
  );
} 