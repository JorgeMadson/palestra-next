import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'obygky0rm6bchukf.public.blob.vercel-storage.com'
      }
    ]
  }
};

export default nextConfig;
