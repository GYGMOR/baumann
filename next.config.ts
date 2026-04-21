import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/baumann",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
