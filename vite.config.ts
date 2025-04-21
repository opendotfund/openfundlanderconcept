import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { componentTagger } from "lovable-tagger";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env': {
        ...env,
        PUBLIC_URL: mode === 'production' ? '' : '/'
      }
    },
    server: {
      host: true,
      port: parseInt(env.VITE_PORT || '5173'),
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        'use-sync-external-store': path.resolve(__dirname, 'node_modules/use-sync-external-store'),
        'bn.js': path.resolve(__dirname, 'node_modules/bn.js/lib/bn.js'),
      },
      dedupe: ['react', 'react-dom', 'use-sync-external-store', 'bn.js'],
      mainFields: ['module', 'jsnext:main', 'jsnext', 'main'],
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/bn\.js/, /node_modules/],
      },
      rollupOptions: {
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
            'crypto-vendor': ['bn.js', 'bignumber.js', 'ethers'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
        },
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@emotion/react',
        '@emotion/styled',
        'hoist-non-react-statics',
        'use-sync-external-store',
        'bn.js',
        'bignumber.js',
        'ethers',
      ],
      exclude: ['@thirdweb-dev/react', '@thirdweb-dev/sdk'],
      esbuildOptions: {
        target: 'es2020',
        supported: { 
          bigint: true 
        },
      },
    },
  };
});
