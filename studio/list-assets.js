// Simple script to list all assets
// Run this in Sanity Vision or use in your app

const query = `
*[_type == "sanity.imageAsset" || _type == "sanity.fileAsset"] | order(_createdAt desc) {
  _id,
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

// This will show all your uploaded files with:
// - File name
// - Direct URL
// - File size
// - Dimensions (for images)
// - Upload date
console.log('Use this query in Sanity Vision to see all your assets:');
console.log(query);
