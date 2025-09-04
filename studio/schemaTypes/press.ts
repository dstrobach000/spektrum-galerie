// schemaTypes/press.ts
import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'press',
  title: 'Press / Downloads Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Press / Downloads',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'pressLink'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', links: 'links'},
    prepare({title, links}) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title: title || 'Press / Downloads',
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
