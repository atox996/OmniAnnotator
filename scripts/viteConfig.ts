import { readFileSync } from "fs";
import { camelCase, upperFirst } from "lodash-es";
import { resolve } from "path";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export function createSharedViteConfig(rootDir: string, libName?: string) {
  if (!libName) {
    libName = JSON.parse(
      readFileSync(resolve(rootDir, "package.json"), "utf-8"),
    ).name;
  }
  libName = upperFirst(camelCase(libName));

  return defineConfig({
    root: rootDir,
    build: {
      lib: {
        entry: resolve(rootDir, "src/index.ts"),
        name: libName,
        formats: ["es", "umd"],
      },
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `[name].[format].js`,
          chunkFileNames: `[name].[format].js`,
        },
      },
    },
    plugins: [
      dtsPlugin({
        entryRoot: resolve(rootDir, "src"),
        outDir: resolve(rootDir, "dist"),
        include: [resolve(rootDir, "src")],
      }),
    ],
  });
}
