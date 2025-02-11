/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: ".fleek",
    output: "export",
    images: {
        unoptimized: true,
    },
    basePath: "",
    assetPrefix: "./",
    trailingSlash: true,
}

module.exports = nextConfig
