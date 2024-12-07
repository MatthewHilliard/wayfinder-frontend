import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Development environment
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      // Production environment
      {
        protocol: "https",
        hostname: "wayfinder-backend-prod-b2b08ed79f38.herokuapp.com",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
