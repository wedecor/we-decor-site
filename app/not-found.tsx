import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="lux-page lux-container py-24 md:py-32 text-center">
      <p className="lux-eyebrow mb-6">404</p>
      <h1 className="lux-heading mb-6">This page could not be found</h1>
      <p className="lux-body max-w-md mx-auto mb-12">
        The celebration you are looking for may have moved. Return home to explore our services and
        gallery.
      </p>
      <Link href="/" className="lux-btn-primary">
        Return home
      </Link>
    </div>
  );
}
