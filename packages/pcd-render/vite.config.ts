import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "PCDRender",
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: mode === "development",
    emptyOutDir: false,
  },
}));
