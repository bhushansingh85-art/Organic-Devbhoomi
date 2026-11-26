import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Organic-Devbhoomi",
  assetPrefix: "/Organic-Devbhoomi/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;