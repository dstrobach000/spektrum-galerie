// schemaTypes/objects/pressLink.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pressLink',
  title: 'Download / Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'file',
      title: 'File (Sanity asset)',
      type: 'file',
      description: 'Upload a file OR provide an external URL below.',
      options: {storeOriginalFilename: true},
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
      description: 'Use this if the asset lives outside Sanity.',
    }),
    defineField({
      name: 'note',
      title: 'Note (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: {label: 'label', file: 'file', url: 'url'},
    prepare({label, file, url}) {
      const where = file ? 'File' : url ? 'URL' : '—'
      return {
        title: label || 'Untitled',
        subtitle: `Source: ${where}`,
      }
    },
  },
  // Require at least one of file or url
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return 'Required'
      if (!value.file && !value.url) {
        return 'Provide either a File or an External URL'
      }
      return true
    }),
})
