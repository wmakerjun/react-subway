module.exports = {
  distDir: "docs",
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
};
