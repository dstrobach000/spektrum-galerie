// ./schemas/exhibition.ts

export default {
  name: 'exhibition',
  type: 'document',
  title: 'Exhibition',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'artist', title: 'Artist', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'startDate', title: 'Start Date', type: 'datetime' },
    { name: 'endDate', title: 'End Date', type: 'datetime' },

    // Replace pressText array of blocks with three editors: intro, main, bio
    {
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'mainText',
      title: 'Main Text',
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
      title: 'Landscape Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'landscapeVideos',
      title: 'Landscape Videos',
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
      title: 'Portrait Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'portraitVideos',
      title: 'Portrait Videos',
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
      title: 'Namecard',
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
      title: 'Poster',
      type: 'image'
    }
  ]
}
