import SchemaScript from '@/components/seo/SchemaScript';
import { buildHomePageGraph } from '@/lib/local-seo';

export default function HomeJsonLd() {
  return <SchemaScript data={buildHomePageGraph()} />;
}
