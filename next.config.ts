import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/institutov2",
  assetPrefix: "/institutov2/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
