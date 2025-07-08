import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: __dirname,
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^@omni-annotator\/([^/]+)\/(.*)$/,
        replacement: path.resolve(__dirname, "../../packages/$1/src/$2"),
      },
      {
        find: /^@omni-annotator\/([^/]+)$/,
        replacement: path.resolve(__dirname, "../../packages/$1/src"),
      },
    ],
  },
});
