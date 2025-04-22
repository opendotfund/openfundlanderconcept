import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_THIRDWEB_CLIENT_ID': JSON.stringify(env.VITE_THIRDWEB_CLIENT_ID),
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        VITE_THIRDWEB_CLIENT_ID: JSON.stringify(env.VITE_THIRDWEB_CLIENT_ID),
        VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
        VITE_SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
        VITE_API_URL: JSON.stringify(env.VITE_API_URL)
      },
      global: 'globalThis',
    },
    plugins: [
      react({
        jsxRuntime: 'automatic',
        jsxImportSource: 'react',
        babel: {
          plugins: [
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
          ]
        }
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "crypto": "crypto-browserify",
        "stream": "stream-browserify",
        "assert": "assert",
        "http": "stream-http",
        "https": "https-browserify",
        "os": "os-browserify/browser",
        "url": "url",
        "buffer": "buffer",
        "process": "process/browser",
        "zlib": "browserify-zlib",
        "path": "path-browserify",
        "util": "util",
        "fs": "browserify-fs",
        "net": "stream-browserify",
        "tls": path.resolve(__dirname, "src/polyfills/minimal-tls.js"),
        "vm": path.resolve(__dirname, "src/polyfills/vm-polyfill.js")
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/],
      },
      rollupOptions: {
        external: [
          "@rollup/rollup-linux-x64-gnu"
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
        },
        target: 'es2020',
        supported: {
          'top-level-await': true
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
        "util",
        "browserify-fs"
      ],
      exclude: ["@rollup/rollup-linux-x64-gnu"]
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
