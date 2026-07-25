import SchemaScript from '@/components/seo/SchemaScript';
import { buildHomePageGraph } from '@/lib/schema';

export default function HomeJsonLd() {
  return <SchemaScript data={buildHomePageGraph()} />;
}
