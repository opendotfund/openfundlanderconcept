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
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        external: ["stream", "http", "https", "crypto"],
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "ui-vendor": ["@radix-ui/react-icons", "@radix-ui/react-dropdown-menu", "@radix-ui/react-dialog"],
            "web3-vendor": ["@thirdweb-dev/react", "@thirdweb-dev/sdk"],
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
        "stream-browserify"
      ],
      exclude: ["stream", "http", "https", "crypto"],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    server: {
      port: parseInt(env.PORT || '3000'),
      host: true,
    },
  };
});
