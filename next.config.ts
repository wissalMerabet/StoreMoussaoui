import type { NextConfig } from "next";

const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
const port = process.env.NEXT_PUBLIC_PORT;

if (!protocol || !hostname || !port) {
  throw new Error("Missing required environment variables for image remotePatterns");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(':', '') as 'http' | 'https',
        hostname: hostname as string,
        port: port as string,
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;