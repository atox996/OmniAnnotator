import { resolve } from "path";
import { defineConfig } from "vite";

import { createSharedViteConfig } from "../../scripts/viteConfig";

const baseConfig = createSharedViteConfig(process.cwd());

export default defineConfig({
  ...baseConfig,
  build: {
    ...baseConfig.build,
    lib: {
      entry: {
        "2d/index": resolve(baseConfig.root!, "src/2d/index.ts"),
        "3d/index": resolve(baseConfig.root!, "src/3d/index.ts"),
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
