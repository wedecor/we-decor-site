import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AREAS, SITE, BUSINESS_NAME, CITY, PHONE, getAreaBySlug } from '../../_data/locations';

interface LocationPageProps {
  params: { slug: string; };
}

export async function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const area = getAreaBySlug(params.slug);
  if (!area) return { title: 'Location Not Found' };

  return {
    title: `Event Decoration Services in ${area.name}, ${CITY} | ${BUSINESS_NAME}`,
    description: `Professional event decoration services in ${area.name}, ${CITY}. Birthday decor, wedding setup, haldi decoration, room decoration.`,
    alternates: { canonical: `${SITE}/locations/${area.slug}` },
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const area = getAreaBySlug(params.slug);
  if (!area) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Event Decoration in {area.name}, {CITY}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Professional decoration services in {area.name}. From birthday parties to weddings, we bring creativity to every celebration.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Our Services in {area.name}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Birthday Decor', 'Wedding Setup', 'Haldi Decoration', 'Room Decoration', 'Engagement Decor', 'Corporate Events'].map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service}</h3>
              <a href={`https://wa.me/918880544452?text=Hi! I need ${service} in ${area.name}`} target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Get Quote
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 