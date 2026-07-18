export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center" aria-labelledby="not-found-title">
      <h1 id="not-found-title" data-testid="not-found-title" className="text-3xl font-semibold tracking-tight text-[#1e3a5f] dark:text-[#faf7f2]">
        Page not found
      </h1>
      <p data-testid="not-found-body" className="mt-4 text-base text-[#1e3a5f]/80 dark:text-[#faf7f2]/80">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center rounded-xl px-6 py-3 font-semibold bg-[#b76e7a] text-[#1e3a5f] hover:bg-[#c98a94] transition-all shadow-[0_8px_30px_rgba(183,110,122,0.35)] hover:shadow-[0_12px_40px_rgba(183,110,122,0.45)]"
      >
        Go home
      </a>
    </main>
  );
}
