/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: 'http://172.18.197.84:6666/socket.io/:path*',
      },
    ];
  },
};

export default nextConfig;
