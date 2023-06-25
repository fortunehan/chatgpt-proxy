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
        source: "/proxy-sse/:slug*",
        destination: "/api/proxy-sse?path=:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
