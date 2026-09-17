/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/accessibility-statement.html",
        destination: "/accessibility-statement",
      },
    ];
  },
};

module.exports = nextConfig;
