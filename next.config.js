/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["images.pexels.com"]
  },
  async redirects() {
    return [
      {
        source: "/cancel",
        destination: "/",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
