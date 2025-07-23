import type { NextConfig } from "next";

const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const hostname = process.env.NEXT_PUBLIC_HOSTNAME;

if (!protocol || !hostname) {
  throw new Error("Missing required environment variables for image remotePatterns");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol as "http" | "https",
        hostname: hostname as string,
        port: '',
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;