"use client";
// Placeholder gallery — drop images later via props or by wiring Cloudinary/Next Image
export default function GalleryStrip() {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold">Décor Photos</h2>
      <p className="mt-2 opacity-80">We'll add local event photos here. Share image URLs or connect your gallery to auto-populate.</p>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="aspect-video rounded-xl bg-white/[0.06]" />
        <div className="aspect-video rounded-xl bg-white/[0.06]" />
        <div className="aspect-video rounded-xl bg-white/[0.06]" />
      </div>
    </section>
  );
} 