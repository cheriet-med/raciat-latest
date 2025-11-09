import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   webpack: (config) => {
    // Avoid disabling cache unless absolutely necessary
     config.cache = false;
    return config;
  },
    eslint: {
    ignoreDuringBuilds: true, // ✅ disables eslint checks during build
  },
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dhnn7xish/**',
      },
    ],
  },
};

export default nextConfig;
