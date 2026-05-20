export default function HomeTestimonialsSkeleton() {
  return (
    <section
      className="max-w-6xl mx-auto py-12 px-6"
      aria-busy="true"
      aria-label="Loading customer reviews"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading reviews…</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-48 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </section>
  );
}
