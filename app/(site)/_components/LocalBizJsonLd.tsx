import SchemaScript from '@/components/seo/SchemaScript';
import { buildLocalityServiceSchema } from '@/lib/local-seo';

type Props = {
  areaName: string;
  slug: string;
  landmark?: string;
};

/**
 * Locality pages reference the canonical LocalBusiness via provider @id.
 * Emits a geo-scoped Service entity (not a duplicate LocalBusiness).
 */
export default function LocalBizJsonLd({ areaName, slug, landmark }: Props) {
  return <SchemaScript data={buildLocalityServiceSchema(areaName, slug, { landmark })} />;
}
