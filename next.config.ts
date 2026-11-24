import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Organic-Devbhoomi",
  assetPrefix: "/Organic-Devbhoomi/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
