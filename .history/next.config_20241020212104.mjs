// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


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
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
