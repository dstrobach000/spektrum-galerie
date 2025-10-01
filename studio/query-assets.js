// Query to get all assets from Sanity
// Run this in Sanity Vision or use in your app

const query = `
*[_type == "sanity.imageAsset" || _type == "sanity.fileAsset"] | order(_createdAt desc) {
  _id,
  _type,
  originalFilename,
  url,
  size,
  mimeType,
  metadata {
    dimensions {
      width,
      height
    }
  },
  _createdAt,
  _updatedAt
}
`;

console.log('Use this query in Sanity Vision to see all your assets:');
console.log(query);
