import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ai-timeline",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
