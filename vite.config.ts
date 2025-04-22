import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_THIRDWEB_CLIENT_ID': JSON.stringify(env.VITE_THIRDWEB_CLIENT_ID),
      'process.env': {},
      global: 'globalThis',
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "crypto": "crypto-browserify",
        "stream": "stream-browserify",
        "assert": "assert",
        "http": "stream-http",
        "https": "https-browserify",
        "os": "os-browserify",
        "url": "url",
        "buffer": "buffer",
        "process": path.resolve(__dirname, "node_modules/process/browser"),
        "zlib": "browserify-zlib",
        "path": "path-browserify",
        "util": "util",
        "fs": path.resolve(__dirname, "node_modules/browserify-fs"),
        "net": path.resolve(__dirname, "node_modules/stream-browserify"),
        "tls": path.resolve(__dirname, "node_modules/tls-browserify"),
        "vm": path.resolve(__dirname, "node_modules/vm-browserify")
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/],
      },
      rollupOptions: {
        external: [
          "@rollup/rollup-linux-x64-gnu",
          "crypto",
          "stream",
          "assert",
          "http",
          "https",
          "os",
          "url",
          "buffer",
          "process",
          "zlib",
          "path",
          "util",
          "fs",
          "net",
          "tls",
          "vm"
        ],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            thirdweb: ['@thirdweb-dev/react', '@thirdweb-dev/sdk']
          },
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      },
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@radix-ui/react-icons",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-dialog",
        "@thirdweb-dev/react",
        "@thirdweb-dev/sdk",
        "crypto-browserify",
        "stream-browserify",
        "assert",
        "stream-http",
        "https-browserify",
        "os-browserify",
        "url",
        "buffer",
        "browserify-zlib",
        "path-browserify",
        "util"
      ],
      exclude: ["@rollup/rollup-linux-x64-gnu", "process/browser"]
    },
    server: {
      port: parseInt(env.PORT || '3000'),
      strictPort: true,
      host: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }
  };
});
