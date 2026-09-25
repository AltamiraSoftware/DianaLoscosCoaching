import type { NextConfig } from 'next';
const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/gracias.html', destination: '/gracias/', permanent: true }];
  },
};
export default config;
