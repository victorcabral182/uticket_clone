import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.uticket.com.br',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
