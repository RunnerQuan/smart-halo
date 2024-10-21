/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/ws',
        destination: 'ws://172.18.197.84:6666/socket.io',
      },
    ];
  },
};

export default nextConfig;
