/** @type {import('next').NextConfig} */
const nextConfig = {
    // // output: 'export', // Outputs a Single-Page Application (SPA).
    // distDir: './dist', // Changes the build output directory to `./dist/`.

    env: {
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    },

    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
          crypto: false,
          stream: false,
          url: false,
          zlib: false,
          http: false,
          https: false,
          assert: false,
          os: false,
          path: false,
          child_process: false, // Add this line
          worker_threads: false, // You might need this too
          cluster: false, // And this one
        };
      }
      return config;
    },
  }
   
  export default nextConfig