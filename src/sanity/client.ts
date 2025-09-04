import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'yfd7xjeg',
  dataset: 'production',
  apiVersion: '2025-08-01',
  useCdn: true,
})
