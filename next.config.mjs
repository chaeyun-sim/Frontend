/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.co.kr',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'corp-homepage-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;