/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boredandyachting.nyc3.digitaloceanspaces.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
