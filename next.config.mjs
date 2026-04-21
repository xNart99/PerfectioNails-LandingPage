/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      /* Unsplash placeholder images used in the design prototype */
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
