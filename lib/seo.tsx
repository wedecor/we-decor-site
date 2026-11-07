/**
 * Serialise JSON-LD for inline `<script>` embedding.
 *
 * `JSON.stringify` alone is not safe inside a script element: a value
 * containing `</script>` closes the tag and anything after it executes as
 * markup. Escaping `<` as `\u003c` keeps the payload valid JSON (parsers
 * decode the escape) while making the sequence inert in HTML. `-->` is
 * escaped for the same reason inside legacy HTML-comment parsing.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/-->/g, '\\u002d\\u002d>');
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
