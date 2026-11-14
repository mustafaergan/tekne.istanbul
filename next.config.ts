import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: { root: __dirname },
  experimental: { globalNotFound: true },
};

export default nextConfig;
