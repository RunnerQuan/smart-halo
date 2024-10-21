/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://172.18.197.84:6666/:path*',
        },
      ]
    },
  }