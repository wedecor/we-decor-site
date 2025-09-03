// Centralized image optimization utilities
// Provides Cloudinary URL helpers with automatic format and quality optimization

export const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || 'dux3m2saz';

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  gravity?: 'auto' | 'face' | 'center' | 'top' | 'bottom' | 'left' | 'right';
  radius?: number;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

/**
 * Builds a Cloudinary URL with optimization transformations
 */
export function buildCloudinaryUrl(publicId: string, options: ImageTransformOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    radius,
    blur,
    brightness,
    contrast,
    saturation,
  } = options;

  const transformations: string[] = [];

  // Format and quality optimization
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  // Dimensions and cropping
  if (width || height) {
    const size = [];
    if (width) size.push(`w_${width}`);
    if (height) size.push(`h_${height}`);
    size.push(`c_${crop}`);
    if (gravity !== 'auto') size.push(`g_${gravity}`);
    transformations.push(size.join(','));
  }

  // Visual effects
  if (radius) transformations.push(`r_${radius}`);
  if (blur) transformations.push(`e_blur:${blur}`);
  if (brightness) transformations.push(`e_brightness:${brightness}`);
  if (contrast) transformations.push(`e_contrast:${contrast}`);
  if (saturation) transformations.push(`e_saturation:${saturation}`);

  const transformString = transformations.join('/');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${transformString}/${publicId}`;
}

/**
 * Optimized image URL for gallery thumbnails
 */
export function galleryThumbnail(publicId: string, width = 300, height = 200): string {
  return buildCloudinaryUrl(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Optimized image URL for hero/banner images
 */
export function heroImage(publicId: string, width = 1200, height = 600): string {
  return buildCloudinaryUrl(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Optimized image URL for profile/avatar images
 */
export function avatarImage(publicId: string, size = 150): string {
  return buildCloudinaryUrl(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'auto',
    radius: size / 2,
  });
}

/**
 * Optimized image URL for service cards
 */
export function serviceCardImage(publicId: string, width = 400, height = 300): string {
  return buildCloudinaryUrl(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Responsive image URLs for different screen sizes
 */
export function responsiveImage(
  publicId: string,
  sizes: { sm?: number; md?: number; lg?: number; xl?: number } = {}
): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  const { sm = 640, md = 768, lg = 1024, xl = 1280 } = sizes;

  const src = buildCloudinaryUrl(publicId, { width: lg, quality: 'auto', format: 'auto' });

  const srcSet = [
    `${buildCloudinaryUrl(publicId, { width: sm, quality: 'auto', format: 'auto' })} ${sm}w`,
    `${buildCloudinaryUrl(publicId, { width: md, quality: 'auto', format: 'auto' })} ${md}w`,
    `${buildCloudinaryUrl(publicId, { width: lg, quality: 'auto', format: 'auto' })} ${lg}w`,
    `${buildCloudinaryUrl(publicId, { width: xl, quality: 'auto', format: 'auto' })} ${xl}w`,
  ].join(', ');

  const sizesAttr = `(max-width: ${sm}px) ${sm}px, (max-width: ${md}px) ${md}px, (max-width: ${lg}px) ${lg}px, ${xl}px`;

  return { src, srcSet, sizes: sizesAttr };
}

/**
 * Lazy loading optimized image URL
 */
export function lazyImage(publicId: string, width = 50, height = 50): string {
  return buildCloudinaryUrl(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 10,
    format: 'auto',
    blur: 1000,
  });
}

/**
 * Check if a URL is already a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

/**
 * Extract public ID from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  if (!isCloudinaryUrl(url)) return null;

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const uploadIndex = pathParts.findIndex((part) => part === 'upload');

    if (uploadIndex === -1) return null;

    // Get everything after 'upload' and before any transformations
    const afterUpload = pathParts.slice(uploadIndex + 1);
    const publicIdParts = afterUpload.filter(
      (part) =>
        !part.includes('_') ||
        !['f_', 'q_', 'w_', 'h_', 'c_', 'g_', 'r_', 'e_'].some((prefix) => part.startsWith(prefix))
    );

    return publicIdParts.join('/');
  } catch {
    return null;
  }
}

/**
 * Convert any image URL to optimized Cloudinary URL
 */
export function optimizeImageUrl(originalUrl: string, options: ImageTransformOptions = {}): string {
  // If already a Cloudinary URL, apply transformations
  if (isCloudinaryUrl(originalUrl)) {
    const publicId = extractPublicId(originalUrl);
    if (publicId) {
      return buildCloudinaryUrl(publicId, options);
    }
  }

  // For non-Cloudinary URLs, return as-is for now
  // In production, you might want to upload to Cloudinary first
  return originalUrl;
}
