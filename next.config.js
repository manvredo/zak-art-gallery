/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Favicon nur von Cloudinary
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: 'https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760947127/hi1xus7wdvma3mlv74ii.png',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;