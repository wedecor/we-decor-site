export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center" aria-labelledby="not-found-title">
      <h1 id="not-found-title" data-testid="not-found-title" className="text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p data-testid="not-found-body" className="mt-4 text-base text-muted-foreground">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a href="/" className="mt-6 inline-flex items-center rounded-lg border px-4 py-2">
        Go home
      </a>
    </main>
  );
}
