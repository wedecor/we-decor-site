export interface Service {
  slug: string;
  name: string;
  path: string;
  blurb: string;
}

export const services: Service[] = [
  {
    slug: 'birthday-decoration',
    name: 'Birthday Decoration',
    path: '/services/birthday-decoration',
    blurb:
      'Transform any space into a magical birthday celebration with our creative balloon arches, themed backdrops, and personalized decorations. Perfect for all ages and themes.',
  },
  {
    slug: 'wedding-setup',
    name: 'Wedding Setup',
    path: '/services/wedding-setup',
    blurb:
      'Create the wedding of your dreams with our elegant stage decorations, mandap setups, floral arrangements, and complete venue transformation services.',
  },
  {
    slug: 'haldi-decoration',
    name: 'Haldi Decoration',
    path: '/services/haldi-decoration',
    blurb:
      'Traditional haldi ceremony decorations with beautiful yellow themes, floral arrangements, and cultural elements that honor this sacred pre-wedding ritual.',
  },
  {
    slug: 'tent-balloon-setup',
    name: 'Tent & Balloon Setup',
    path: '/services/tent-balloon-setup',
    blurb:
      'Professional tent installations and creative balloon decorations for outdoor events, parties, and celebrations with weather-resistant materials.',
  },
  {
    slug: 'birthday-home-decoration',
    name: 'Birthday Home Decoration',
    path: '/services/birthday-home-decoration',
    blurb:
      'Transform your home into a birthday wonderland with indoor decorations, balloon arrangements, and personalized themes for intimate celebrations.',
  },
  {
    slug: 'haldi-backdrop-decor',
    name: 'Haldi Backdrop Decoration',
    path: '/services/haldi-backdrop-decor',
    blurb:
      'Beautiful backdrop decorations for haldi ceremonies with traditional yellow themes, floral elements, and cultural significance.',
  },
  {
    slug: 'wedding-stage-decor',
    name: 'Wedding Stage Decoration',
    path: '/services/wedding-stage-decor',
    blurb:
      'Elegant stage decorations for wedding ceremonies with mandap setups, floral arrangements, and complete venue transformation services.',
  },
  {
    slug: 'decoration',
    name: 'Decoration',
    path: '/services/decoration',
    blurb:
      'Comprehensive decoration services for all types of events, from intimate gatherings to grand celebrations, tailored to your style and budget.',
  },
  {
    slug: 'catering',
    name: 'Catering Services',
    path: '/services/catering',
    blurb:
      'Professional catering services for all types of events with delicious menus, professional staff, and complete event management.',
  },
  {
    slug: 'hair-stylists',
    name: 'Hair Stylists',
    path: '/services/hair-stylists',
    blurb:
      'Professional hair styling services for weddings, parties, and special occasions with experienced stylists and modern techniques.',
  },
  {
    slug: 'makeup-artists',
    name: 'Makeup Artists',
    path: '/services/makeup-artists',
    blurb:
      'Professional makeup services for brides, parties, and special events with high-quality products and experienced artists.',
  },
  {
    slug: 'mehndi-artists',
    name: 'Mehndi Artists',
    path: '/services/mehndi-artists',
    blurb:
      'Traditional and modern mehndi designs for weddings and special occasions with skilled artists and beautiful patterns.',
  },
  {
    slug: 'photographers',
    name: 'Photographers',
    path: '/services/photographers',
    blurb:
      'Professional photography services for weddings, events, and special occasions with high-quality equipment and creative compositions.',
  },
  {
    slug: 'videographers',
    name: 'Videographers',
    path: '/services/videographers',
    blurb:
      'Professional videography services for weddings and events with cinematic quality and creative storytelling.',
  },
];

// Helper function to get service by slug
export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
};

// Helper function to get all service slugs
export const getAllServiceSlugs = (): string[] => {
  return services.map((service) => service.slug);
};

// Helper function to get service by name
export const getServiceByName = (name: string): Service | undefined => {
  return services.find((service) => service.name.toLowerCase().includes(name.toLowerCase()));
};

// Helper function to get services by category (for filtering)
export const getServicesByCategory = (category: string): Service[] => {
  const categoryLower = category.toLowerCase();
  return services.filter(
    (service) =>
      service.name.toLowerCase().includes(categoryLower) ||
      service.blurb.toLowerCase().includes(categoryLower)
  );
};

// Helper function to get random services (for recommendations)
export const getRandomServices = (count: number = 3): Service[] => {
  const shuffled = [...services].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get service path by slug
export const getServicePathBySlug = (slug: string): string => {
  const service = getServiceBySlug(slug);
  return service ? service.path : `/services/${slug}`;
};
