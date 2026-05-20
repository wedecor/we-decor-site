const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { loadCloudinaryEnv } = require('./lib/cloudinary-env.cjs');

cloudinary.config(loadCloudinaryEnv());

const baseDir = path.join(__dirname, '../public/gallery');

// Dynamically get all event folders in public/gallery
const eventFolders = fs.readdirSync(baseDir).filter((f) => {
  const fullPath = path.join(baseDir, f);
  return fs.lstatSync(fullPath).isDirectory();
});

function uploadFolder(folder) {
  const folderPath = path.join(baseDir, folder);
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (fs.lstatSync(filePath).isFile()) {
      cloudinary.uploader.upload(
        filePath,
        {
          folder: `we-decor/${folder}`,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            console.error('Upload error:', error);
          } else {
            console.log('Uploaded:', result.secure_url);
          }
        }
      );
    }
  });
}

eventFolders.forEach(uploadFolder);
