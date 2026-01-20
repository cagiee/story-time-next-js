import type { NextConfig } from "next";
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
            {
                protocol: "https",
                hostname: "timestory.tmdsite.my.id",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
