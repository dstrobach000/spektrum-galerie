const exhibition = {
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    { name: 'isCurrent', title: 'Current Exhibition', type: 'boolean' },
  ],
}
export default exhibition
