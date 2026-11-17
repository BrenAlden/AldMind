import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    // Allow remote project images from any HTTPS host. Portfolio project
    // covers may be hosted on Supabase Storage, GitHub, a CDN, etc.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
