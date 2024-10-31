/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 정적 HTML로 내보내기 설정
  trailingSlash: true, // 선택 사항: 모든 경로에 슬래시 추가
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
  },
};

export default nextConfig;
