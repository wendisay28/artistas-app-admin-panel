import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@heroicons/react'],
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig
