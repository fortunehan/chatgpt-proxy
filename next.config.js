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
        source: "/dev-query/:slug*",
        destination: "/api/dev-query?path=:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
