import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for CDN / GitHub Pages deployment.
  output: "export",

  // Set to repo name for GitHub Pages project sites (e.g. "/2027").
  // Leave empty for custom domains.
  basePath: process.env.NEXT_BASE_PATH ?? "",

  // Required for static export — no image optimization server.
  images: { unoptimized: true },
};

export default nextConfig;
