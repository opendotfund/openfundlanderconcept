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
        process: "process/browser",
        stream: "stream-browserify",
        util: "util",
        zlib: "browserify-zlib",
        https: "agent-base",
        vm: "false",
        crypto: "crypto-browserify",
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/],
      },
      rollupOptions: {
        external: ["stream", "http", "https", "crypto", "@rollup/rollup-linux-x64-gnu"],
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-aspect-ratio',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-context-menu',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-hover-card',
              '@radix-ui/react-label',
              '@radix-ui/react-menubar',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-progress',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-scroll-area',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slider',
              '@radix-ui/react-slot',
              '@radix-ui/react-switch',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-toggle',
              '@radix-ui/react-toggle-group',
              '@radix-ui/react-tooltip',
            ],
            'charts-vendor': ['recharts', 'd3-scale', 'd3-shape', 'd3-path'],
            'web3-vendor': ['@thirdweb-dev/react', '@thirdweb-dev/sdk'],
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@radix-ui/react-icons",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-dialog",
        "@thirdweb-dev/react",
        "@thirdweb-dev/sdk",
        "process/browser",
        "util",
        "stream-browserify",
        "crypto-browserify"
      ],
      exclude: ["stream", "http", "https", "crypto", "@rollup/rollup-linux-x64-gnu"],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    server: {
      port: parseInt(env.PORT || '3000'),
      host: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  };
});
