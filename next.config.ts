import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ဘယ် website က ပုံမဆို လက်ခံမယ်လို့ သတ်မှတ်တာပါ
      },
    ],
  },
};

export default nextConfig;
