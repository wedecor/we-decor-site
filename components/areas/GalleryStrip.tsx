"use client";
// Placeholder gallery — drop images later via props or by wiring Cloudinary/Next Image
export default function GalleryStrip() {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Décor Photos</h2>
      <p className="mt-2 opacity-80 text-gray-700 dark:text-gray-300">We'll add local event photos here. Share image URLs or connect your gallery to auto-populate.</p>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" />
        <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" />
        <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" />
      </div>
    </section>
  );
} 