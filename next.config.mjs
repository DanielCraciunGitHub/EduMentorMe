import "./src/env.mjs"

import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "images.ctfassets.net"],
  },
  experimental: {
    serverActions: true,
  },
}

export default withContentlayer(nextConfig)
