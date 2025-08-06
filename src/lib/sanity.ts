import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'p2kdhnvw', // from sanity.config.ts
  dataset: 'production',      // or your dataset name
  apiVersion: '2025-08-01',   // use today's date or your preferred version
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

export function urlFor(source: any) {
  return builder.image(source)
}
