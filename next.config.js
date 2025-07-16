/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  trailingSlash: false,
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
