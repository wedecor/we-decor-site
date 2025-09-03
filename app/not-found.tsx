export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404 — Not found</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Oops! The page you are looking for was not found.
      </p>
      <a href="/" className="mt-6 inline-flex items-center rounded-lg border px-4 py-2">
        Go home
      </a>
    </main>
  );
}