import type { NextConfig } from "next";
import path from "path";


const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')],
    prependData: `@import "main.sass"`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**", // Permitir cualquier ruta bajo este dominio
      },
    ],
  },
};

export default nextConfig;
