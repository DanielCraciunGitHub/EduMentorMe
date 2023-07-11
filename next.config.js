/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "images.ctfassets.net"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
