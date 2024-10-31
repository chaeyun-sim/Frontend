/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
    unoptimized: true, // 이미지 최적화 비활성화
  output: 'export', // 정적 HTML로 내보내기 설정
  trailingSlash: true, // 선택 사항: 모든 경로에 슬래시 추가
};

export default nextConfig;
