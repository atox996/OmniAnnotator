import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

import { getBaseViteConfig } from "../../scripts/utils";

const __dirname = dirname(fileURLToPath(import.meta.url));

const baseConfig = getBaseViteConfig(__dirname);

export default defineConfig({
  ...baseConfig,
  build: {
    ...baseConfig.build,
    lib: {
      entry: {
        "2d/index": resolve(__dirname, "src/2d/index.ts"),
        "3d/index": resolve(__dirname, "src/3d/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["konva", "three"],
      output: {
        entryFileNames: `[name].[format].js`,
        chunkFileNames: `[name].[format].js`,
      },
    },
  },
});
