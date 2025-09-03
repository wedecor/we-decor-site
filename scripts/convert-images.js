const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dux3m2saz',
  api_key: '669972431736695',
  api_secret: 'Hm3UY3-q0MhLfgPeOrLhps_Gl3c',
});

async function fetchAllImages() {
  let nextCursor = undefined;
  const resources = [];
  do {
    const result = await cloudinary.search
      .expression('folder:we-decor/*')
      .max_results(500)
      .next_cursor(nextCursor)
      .execute();
    resources.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);
  return resources;
}

async function convertImageToJpg(publicId) {
  try {
    // Create a new version with JPG format
    const result = await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      format: 'jpg',
      quality: 'auto',
      fetch_format: 'jpg',
    });

    console.log(`✅ Converted: ${publicId} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Failed to convert ${publicId}:`, error.message);
    return null;
  }
}

async function convertHeicImages() {
  const images = await fetchAllImages();
  const heicImages = images.filter(
    (img) => img.format?.toLowerCase() === 'heic' && img.asset_folder?.startsWith('we-decor/')
  );

  console.log(`Found ${heicImages.length} HEIC images to convert:`);

  const convertedUrls = [];

  for (const img of heicImages) {
    console.log(`Converting: ${img.filename} (${img.asset_folder})`);
    const convertedUrl = await convertImageToJpg(img.public_id);
    if (convertedUrl) {
      convertedUrls.push({
        original: img.secure_url,
        converted: convertedUrl,
        filename: img.filename,
        folder: img.asset_folder.replace('we-decor/', ''),
      });
    }
    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('\n✅ Conversion complete!');
  console.log(`Successfully converted ${convertedUrls.length} images`);

  return convertedUrls;
}

// Alternative approach: Create transformed URLs
async function createTransformedUrls() {
  const images = await fetchAllImages();
  const heicImages = images.filter(
    (img) => img.format?.toLowerCase() === 'heic' && img.asset_folder?.startsWith('we-decor/')
  );

  console.log(`Found ${heicImages.length} HEIC images. Creating transformed URLs...`);

  const transformedUrls = heicImages.map((img) => {
    // Create a transformed URL that converts HEIC to JPG on-the-fly
    const transformedUrl = cloudinary.url(img.public_id, {
      format: 'jpg',
      quality: 'auto',
      fetch_format: 'jpg',
    });

    return {
      original: img.secure_url,
      transformed: transformedUrl,
      filename: img.filename,
      folder: img.asset_folder.replace('we-decor/', ''),
    };
  });

  console.log('\n✅ Transformed URLs created!');
  transformedUrls.forEach((item) => {
    console.log(`${item.filename}: ${item.transformed}`);
  });

  return transformedUrls;
}

// Run the conversion
(async () => {
  console.log('Starting HEIC to JPG conversion...\n');

  try {
    // Option 1: Convert images (creates new versions)
    // await convertHeicImages();

    // Option 2: Create transformed URLs (on-the-fly conversion)
    await createTransformedUrls();
  } catch (error) {
    console.error('Error during conversion:', error);
  }
})();
