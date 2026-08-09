import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  allowedDevOrigins: ['127.0.0.1'],
  turbopack: {
    root: projectRoot,
  },
  async rewrites() {
    return [
      { source: '/en/membership', destination: '/membership?__locale=en' },
      { source: '/zh-Hant/membership', destination: '/membership?__locale=zh-Hant' },
      { source: '/zh-Hans/membership', destination: '/membership?__locale=zh-Hans' },
      { source: '/en/:path*', destination: '/:path*?__locale=en' },
      { source: '/zh-Hant/:path*', destination: '/:path*?__locale=zh-Hant' },
      { source: '/zh-Hans/:path*', destination: '/:path*?__locale=zh-Hans' },
    ];
  },
};

export default nextConfig;