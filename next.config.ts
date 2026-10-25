import type { NextConfig } from 'next';

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,

  allowedDevOrigins: [
    '127.0.0.1',
    '100.119.126.66',
    '192.168.1.130',
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
