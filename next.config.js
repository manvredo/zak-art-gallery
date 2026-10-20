/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  outputFileTracingRoot: __dirname,
  // Fonts and logo are read from disk when the webhook builds the invoice PDF
  outputFileTracingIncludes: {
    '/api/webhook': ['./app/lib/invoice/fonts/*', './app/lib/invoice/logo.png'],
  },
}

module.exports = nextConfig