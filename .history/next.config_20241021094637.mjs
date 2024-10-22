/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://172.18.197.84:6666/:path*',
      },
    ];
  },
};

export default nextConfig;
