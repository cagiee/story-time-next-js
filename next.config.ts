import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
    sassOptions: {
        // includePaths: [path.join(__dirname, "styles")],
        prependData: `
      @use "@/styles/_variable.scss" as *;
      @use "@/styles/_mixin.scss" as *;
    `,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pinimg.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
