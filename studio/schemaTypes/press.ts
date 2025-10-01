// schemaTypes/press.ts
import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'press',
  title: 'Ke stažení',
  type: 'document',
  icon: DocumentTextIcon,
  __experimental_actions: ['update', 'publish'], // Disable create and delete
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'pressLink'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Soubory',
      }
    },
  },
})
