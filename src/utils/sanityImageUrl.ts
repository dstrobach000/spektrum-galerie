// src/utils/sanityImageUrl.ts
// Utility function to generate optimized Sanity image URLs

export interface SanityImageUrlOptions {
  width?: number;
  height?: number;
  fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
}

/**
 * Generate an optimized Sanity image URL with specified dimensions and options
 * @param imageUrl - The original Sanity image URL
 * @param options - Optimization options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  options: SanityImageUrlOptions = {}
): string {
  if (!imageUrl || !imageUrl.includes('cdn.sanity.io')) {
    return imageUrl; // Return original if not a Sanity CDN URL
  }

  const {
    width,
    height,
    fit = 'max',
    crop = 'center',
    quality = 95,
    format = 'webp'
  } = options;

  const params = new URLSearchParams();

  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('fit', fit);
  
  // Only add crop parameter if fit is 'crop'
  if (fit === 'crop') {
    params.set('crop', crop);
  }
  
  params.set('q', quality.toString());
  params.set('fm', format);

  return `${imageUrl}?${params.toString()}`;
}

/**
 * Predefined optimized image sizes for common use cases
 */
/**
 * Predefined optimized image sizes for common use cases
 */
export const imageSizes = {
  // Gallery thumbnails - optimized for slideshow performance
  thumbnail: (url: string) => getOptimizedImageUrl(url, { width: 800, fit: 'max', quality: 85 }),
  
  // Gallery cards - reasonable size for exhibition cards
  card: (url: string) => getOptimizedImageUrl(url, { width: 1000, fit: 'max', quality: 85 }),
  
  // Exhibition gallery images
  gallery: (url: string) => getOptimizedImageUrl(url, { width: 1400, fit: 'max', quality: 90 }),
  
  // Fullscreen images
  fullscreen: (url: string) => getOptimizedImageUrl(url, { width: 1920, fit: 'max', quality: 90 }),
  
  // Portrait images - maintains portrait aspect ratio
  portrait: (url: string) => getOptimizedImageUrl(url, { width: 1000, fit: 'max', quality: 85 }),
  
  // Landscape images - maintains landscape aspect ratio
  landscape: (url: string) => getOptimizedImageUrl(url, { width: 1400, fit: 'max', quality: 90 }),
  
  // Posters/graphics - reasonable size
  poster: (url: string) => getOptimizedImageUrl(url, { width: 800, fit: 'max', quality: 85 }),
} as const;
