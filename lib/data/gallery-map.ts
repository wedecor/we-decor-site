import { getGalleryImages, GalleryImage } from '../../utils/gallery';

// Helper function to get images for a specific location
export const getLocationImages = (locationSlug: string): GalleryImage[] => {
  const allImages = getGalleryImages();
  return allImages.filter((image) =>
    image.locationTags?.some((tag) => tag.toLowerCase().includes(locationSlug.toLowerCase()))
  );
};

// Helper function to get images for a specific service
export const getServiceImages = (serviceSlug: string): GalleryImage[] => {
  const allImages = getGalleryImages();
  return allImages.filter(
    (image) =>
      image.category?.toLowerCase().includes(serviceSlug.toLowerCase()) ||
      image.tags?.some((tag) => tag.toLowerCase().includes(serviceSlug.toLowerCase()))
  );
};

// Helper function to get images for location + service combination
export const getLocationServiceImages = (
  locationSlug: string,
  serviceSlug: string
): GalleryImage[] => {
  const locationImages = getLocationImages(locationSlug);
  const serviceImages = getServiceImages(serviceSlug);

  // Combine location and service images, prioritizing location-specific ones
  const combinedImages = [...locationImages, ...serviceImages];

  // Remove duplicates based on src
  const uniqueImages = combinedImages.filter(
    (image, index, self) => index === self.findIndex((img) => img.src === image.src)
  );

  return uniqueImages;
};

// Helper function to get all images for a location (all services)
export const getAllLocationImages = (locationSlug: string): GalleryImage[] => {
  return getLocationImages(locationSlug);
};

// Helper function to get random images for a service
export const getRandomServiceImages = (serviceSlug: string, count: number = 3): GalleryImage[] => {
  const images = getServiceImages(serviceSlug);
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get priority images for a service (first few images)
export const getPriorityServiceImages = (
  serviceSlug: string,
  count: number = 3
): GalleryImage[] => {
  const images = getServiceImages(serviceSlug);
  return images.slice(0, count);
};

// Helper function to get images by tag
export const getImagesByTag = (tag: string): GalleryImage[] => {
  const allImages = getGalleryImages();
  return allImages.filter(
    (img) =>
      img.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase())) ||
      img.locationTags?.some((t) => t.toLowerCase().includes(tag.toLowerCase())) ||
      img.category?.toLowerCase().includes(tag.toLowerCase())
  );
};

// Helper function to get images by multiple tags
export const getImagesByTags = (tags: string[]): GalleryImage[] => {
  const allImages = getGalleryImages();
  return allImages.filter((img) =>
    tags.some(
      (tag) =>
        img.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase())) ||
        img.locationTags?.some((t) => t.toLowerCase().includes(tag.toLowerCase())) ||
        img.category?.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

// Helper function to get images for a specific category
export const getImagesByCategory = (category: string): GalleryImage[] => {
  const allImages = getGalleryImages();
  return allImages.filter((img) => img.category?.toLowerCase().includes(category.toLowerCase()));
};

// Helper function to get all available categories
export const getAllCategories = (): string[] => {
  const allImages = getGalleryImages();
  const categories = new Set<string>();

  allImages.forEach((img) => {
    if (img.category) {
      categories.add(img.category);
    }
  });

  return Array.from(categories).sort();
};

// Helper function to get all available tags
export const getAllTags = (): string[] => {
  const allImages = getGalleryImages();
  const tags = new Set<string>();

  allImages.forEach((img) => {
    if (img.tags) {
      img.tags.forEach((tag) => tags.add(tag));
    }
    if (img.locationTags) {
      img.locationTags.forEach((tag) => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
};

// Helper function to get all available location tags
export const getAllLocationTags = (): string[] => {
  const allImages = getGalleryImages();
  const locationTags = new Set<string>();

  allImages.forEach((img) => {
    if (img.locationTags) {
      img.locationTags.forEach((tag) => locationTags.add(tag));
    }
  });

  return Array.from(locationTags).sort();
};

// Helper function to get image count by category
export const getImageCountByCategory = (category: string): number => {
  return getImagesByCategory(category).length;
};

// Helper function to get image count by location
export const getImageCountByLocation = (locationSlug: string): number => {
  return getLocationImages(locationSlug).length;
};

// Helper function to get image count by service
export const getImageCountByService = (serviceSlug: string): number => {
  return getServiceImages(serviceSlug).length;
};
