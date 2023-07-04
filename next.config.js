/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/proxy/:slug*",
        destination: "https://api.openai-sb.com/:slug*",
      },
      {
        source: "/get/:slug*",
        destination: "/api/get?path=:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
