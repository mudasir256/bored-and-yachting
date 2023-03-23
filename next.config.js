/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bored-and-yachting-dev.nyc3.digitaloceanspaces.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
