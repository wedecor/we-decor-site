import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 bg-gradient-to-br from-green-50 to-pink-50">
      <Image src="/logo.png" alt="We Decor Logo" width={64} height={64} className="mb-4 rounded-full shadow-lg" />
      <h1 className="text-5xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
      <a href="/" className="px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition">Go Home</a>
    </div>
  );
} 