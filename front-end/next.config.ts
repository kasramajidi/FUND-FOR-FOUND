import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true, // ✅ این خط مهمه
  },
};

export default nextConfig;
