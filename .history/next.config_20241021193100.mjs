/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://172.18.197.84:5000/:path*', // 确保这是正确的后端地址和端口
      },
    ];
  },
};

export default nextConfig;
