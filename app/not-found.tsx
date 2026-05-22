import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="lux-page lux-container px-6 py-24 md:py-32 text-center">
      <p className="lux-eyebrow mb-6">404</p>
      <h1 className="lux-heading mb-6">This page could not be found</h1>
      <p className="lux-body max-w-md mx-auto mb-12">
        The celebration you are looking for may have moved. Return home to explore our services and
        gallery.
      </p>
      <Link href="/" className="lux-btn-primary">
        Return home
      </Link>
    </main>
  );
}
