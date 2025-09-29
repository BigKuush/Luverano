import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  assetPrefix: '',
  trailingSlash: false,
  output: 'standalone',
  experimental: {
    // missingSuspenseWithCSRBailout: false,
    optimizePackageImports: [
      "lucide-react",
      "@/lib/icon",
      "@/components/ui",
      "@/components/sections",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};


const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);