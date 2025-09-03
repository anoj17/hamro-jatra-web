/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
