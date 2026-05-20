/**
 * Load Cloudinary credentials from environment (never hardcode).
 * Used by maintenance scripts under scripts/.
 */
function loadCloudinaryEnv() {
  const cloud_name =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD ||
    'dux3m2saz';
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!api_key || !api_secret) {
    console.error(
      '❌ Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET.\n' +
        '   Set them in .env.local (see env/.env.example) or export in your shell.\n' +
        '   Never commit these values to git.',
    );
    process.exit(1);
  }

  return { cloud_name, api_key, api_secret };
}

module.exports = { loadCloudinaryEnv };
