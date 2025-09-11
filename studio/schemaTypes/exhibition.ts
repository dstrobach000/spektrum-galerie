// ./schemas/exhibition.ts

export default {
  name: 'exhibition',
  type: 'document',
  title: 'Výstavy',
  fields: [
    { name: 'title', title: 'Název', type: 'string' },
    { name: 'artist', title: 'Vystavující', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'startDate', title: 'Od', type: 'datetime' },
    { name: 'endDate', title: 'Do', type: 'datetime' },

    // Replace pressText array of blocks with three editors: intro, main, bio
    {
      name: 'intro',
      title: 'Úvod',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'mainText',
      title: 'Hlavní text',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }]
    },

    {
      name: 'landscapeImages',
      title: 'Lansdcape fotky',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'landscapeVideos',
      title: 'Landscape videa',
      type: 'array',
      of: [{
        type: 'file',
        options: { accept: 'video/*' },
        fields: [
          { name: 'caption', type: 'string', title: 'Caption' }
        ]
      }]
    },
    {
      name: 'portraitImages',
      title: 'Portrait fotky',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'portraitVideos',
      title: 'Portrait videa',
      type: 'array',
      of: [{
        type: 'file',
        options: { accept: 'video/*' },
        fields: [
          { name: 'caption', type: 'string', title: 'Caption' }
        ]
      }]
    },
    {
      name: 'namecard',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'name', type: 'string', title: 'Name' }
          ]
        }
      ]
    },
    {
      name: 'poster',
      title: 'Grafika',
      type: 'image'
    }
  ]
}
