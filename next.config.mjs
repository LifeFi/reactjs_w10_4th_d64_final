/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    // 서버 콘솔에 로그 이쁘게 출력. 캐시 정보 포함.
    fetches: {
      fullUrl: true,
    },
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: '"storage.googleapis.com"',
  //     },
  //   ],
  // },
};

export default nextConfig;
