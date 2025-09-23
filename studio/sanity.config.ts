// sanity.config.ts
import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';

// Your schema index should export `schemaTypes` (array of types)
import {schemaTypes} from './schemaTypes';

// Custom Desk structure (adds defaultOrdering for “Výstavy”)
import {structure} from './structure';

export default defineConfig({
  name: 'default',
  title: 'Spektrum Galerie',

  // ⬇️ keep the same values you already had here
  projectId: 'yfd7xjeg',
  dataset: 'production',

  // For managed Studio at spektrumgalerie.sanity.studio this is fine:
  basePath: '/',

  schema: {
    types: schemaTypes,
  },

  plugins: [
    deskTool({ structure }),
    visionTool(), // optional; remove if you don't want Vision
  ],

  // Configure file uploads to accept video files and PDFs
  file: {
    accept: 'video/*,.mov,.mp4,.webm,.ogg,.avi,.mkv,.pdf',
  },
});
