import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const STRAPI_URL = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: STRAPI_URL.protocol.replace(":", "") as "http" | "https",
        hostname: STRAPI_URL.hostname,
        port: STRAPI_URL.port,
        pathname: "/uploads/**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
