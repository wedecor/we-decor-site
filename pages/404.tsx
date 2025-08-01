import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | We Decor</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to We Decor's homepage for event decoration services." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-16 bg-gradient-to-br from-green-50 to-pink-50">
        <Image 
          src="/logo.png" 
          alt="We Decor Logo" 
          width={64} 
          height={64} 
          className="mb-4 rounded-full shadow-lg" 
          priority
        />
        <h1 className="text-5xl font-bold text-green-700 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-4 text-center max-w-md">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
          Don't worry, you can still explore our beautiful event decorations and services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/" 
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-colors duration-200 text-center"
          >
            Go Home
          </Link>
          <Link 
            href="/gallery" 
            className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-200 text-center"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </>
  );
} 