/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async rewrites() {
    return [
      // 确保没有重写规则会影响到 /api/process_code
    ]
  },
}

module.exports = nextConfig
