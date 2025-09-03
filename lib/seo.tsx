export function JsonLd({ data }: { data: unknown }) {
  const safe = JSON.stringify(data).replace(/</g, '\\u003c').replace(/-->/g, '\\u002d\\u002d>');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe }} />;
}
