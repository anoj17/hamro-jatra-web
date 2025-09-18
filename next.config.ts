/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    url: "http://localhost:3000",
  },
  distDir: "/.next",
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "sikinxa.b-cdn.net",
      },
    ],
  },
  /* config options here */
  eslint: {
    // ⚠️ Warning: This allows production builds to succeed even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

// Temporarily disable type checking
nextConfig.typescript = {
  ignoreBuildErrors: true,
};

module.exports = nextConfig;
