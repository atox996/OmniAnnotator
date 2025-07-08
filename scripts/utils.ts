import { readFileSync } from "fs";
import { camelCase, upperFirst } from "lodash-es";
import { resolve } from "path";
import type { UserConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export function getBaseViteConfig(
  rootDir: string,
  libName?: string,
): UserConfig {
  if (!libName) {
    const pkgJson = JSON.parse(
      readFileSync(resolve(rootDir, "package.json"), "utf-8"),
    );
    libName = upperFirst(camelCase(pkgJson.name));
  }
  return {
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
  };
}
