module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" }
        ]
      }
    ];
  },
  env: {
    API_ROUTE: process.env.API_ROUTE,
    NEXT_PUBLIC_PDF_WORKER_SRC: "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs"
  }
};
