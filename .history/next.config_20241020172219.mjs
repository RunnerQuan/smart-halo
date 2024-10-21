/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/ws',
        destination: 'http://172.18.197.84:6666/socket.io',
      },
    ];
  },
};

export default nextConfig;
