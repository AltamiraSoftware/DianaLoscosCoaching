import type { NextConfig } from 'next';

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,

  allowedDevOrigins: [
    '127.0.0.1',
    '100.119.126.66',
  ],

  async redirects() {
    return [
      {
        source: '/gracias.html',
        destination: '/gracias/',
        permanent: true,
      },
    ];
  },
};

export default config;