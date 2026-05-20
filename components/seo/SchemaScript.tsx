import { JsonLd } from '@/lib/seo';

type SchemaScriptProps = {
  data: unknown | null | undefined;
};

/** Renders one or more JSON-LD objects safely */
export default function SchemaScript({ data }: SchemaScriptProps) {
  if (data == null) return null;
  if (Array.isArray(data)) {
    return (
      <>
        {data.filter(Boolean).map((block, i) => (
          <JsonLd key={i} data={block} />
        ))}
      </>
    );
  }
  return <JsonLd data={data} />;
}
