import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isLovable = process.env.LOVABLE === 'true';
  
  return {
    base: '/',
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
        https: "https-browserify",
        crypto: "crypto-browserify",
        buffer: "buffer",
        assert: "assert",
        http: "stream-http",
        os: "os-browserify",
        url: "url",
        querystring: "querystring-es3",
        punycode: "punycode",
        string_decoder: "string_decoder",
        path: "path-browserify",
        events: "events",
        timers: "timers-browserify",
        tty: "tty-browserify",
        "crypto-browserify": "crypto-browserify",
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        external: ["stream", "http", "https"],
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
      assetsDir: 'assets',
      copyPublicDir: true,
      outDir: 'dist',
      emptyOutDir: true,
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
        "crypto-browserify",
        "buffer",
        "assert",
        "stream-http",
        "os-browserify",
        "url",
        "querystring-es3",
        "punycode",
        "string_decoder",
        "path-browserify",
        "events",
        "timers-browserify",
        "tty-browserify"
      ],
      exclude: ["stream", "http", "https"],
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
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.thirdweb.com https://*.thirdweb.dev blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://* blob:; font-src 'self' data:; connect-src 'self' https://*.thirdweb.com https://*.thirdweb.dev https://*.openfund.io https://*.lovable.app https://*.solana.com https://*.solana.rpcpool.com wss://*.thirdweb.com wss://*.thirdweb.dev https://* ws://localhost:* wss://localhost:*; worker-src 'self' blob:; frame-src 'self' https://*.thirdweb.com https://*.thirdweb.dev;"
      }
    },
  };
});
