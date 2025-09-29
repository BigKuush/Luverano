import type { NextConfig } from "next";
// bundle analyzer доступен локально как devDependency.
// На управляемом билд-сервере devDeps могут не ставиться,
// поэтому подключаем опционально (без него конфиг просто вернётся как есть).
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let wrapWithAnalyzer: (cfg: any) => any = (cfg: any) => cfg;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bundleAnalyzer = require('@next/bundle-analyzer');
  wrapWithAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (_err) {
  // analyzer не установлен – продолжаем без него
}

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
      // Убираем project-local алиасы из optimizePackageImports, чтобы не ломать билд
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};


export default wrapWithAnalyzer(nextConfig);