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
    quality = 80,
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
  // Gallery thumbnails - optimized for main page slideshow (reasonable size)
  thumbnail: (url: string) => getOptimizedImageUrl(url, { width: 600, fit: 'max' }),
  
  // Gallery cards - small size for exhibition cards
  card: (url: string) => getOptimizedImageUrl(url, { width: 800, fit: 'max' }),
  
  // Exhibition gallery images
  gallery: (url: string) => getOptimizedImageUrl(url, { width: 1200, fit: 'max' }),
  
  // Fullscreen images
  fullscreen: (url: string) => getOptimizedImageUrl(url, { width: 1920, fit: 'max' }),
  
  // Portrait images - maintains portrait aspect ratio
  portrait: (url: string) => getOptimizedImageUrl(url, { width: 800, fit: 'max' }),
  
  // Landscape images - maintains landscape aspect ratio
  landscape: (url: string) => getOptimizedImageUrl(url, { width: 1200, fit: 'max' }),
  
  // Posters/graphics - smaller but reasonable size
  poster: (url: string) => getOptimizedImageUrl(url, { width: 800, fit: 'max' }),
} as const;
