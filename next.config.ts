import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**', // Allows all paths under this hostname
      },
      // Add other allowed hostnames here if needed
    ],
  }
};

export default nextConfig;
