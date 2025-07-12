import type { NextConfig } from "next";


const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
const port = process.env.NEXT_PUBLIC_PORT;


const remotePatterns =
  protocol && hostname && port
    ? [
        {
          protocol: protocol.replace(":", "") as "http" | "https",
          hostname,
          port,
          pathname: "/public/**",
        },
      ]
    : [];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns,
  },
};

export default nextConfig;
