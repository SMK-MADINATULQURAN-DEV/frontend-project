/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost', // Jika di lokal
        port: '8700',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Jika menggunakan Cloudinary
      },
    ],
  },
}

module.exports = nextConfig