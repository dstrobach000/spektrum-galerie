// schemaTypes/objects/pressLink.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pressLink',
  title: 'Download / Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Název',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'file',
      title: 'Soubor',
      type: 'file',
      description: 'Nahraj soubor ANEBO zadej externí URL níže.',
      options: {
        storeOriginalFilename: true,
        accept: '.pdf,.doc,.docx,.txt,.zip,.rar'
      },
    }),
    defineField({
      name: 'url',
      title: 'Externí URL',
      type: 'url',
    }),
    defineField({
      name: 'note',
      title: 'Poznámka',
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
        return 'Přidej soubor nebo externí URL.'
      }
      return true
    }),
})
