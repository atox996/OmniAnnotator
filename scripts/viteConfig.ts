import { readFileSync } from "fs";
import { camelCase, upperFirst } from "lodash-es";
import { resolve } from "path";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export function createSharedViteConfig(rootDir: string, libName?: string) {
  const pkg = JSON.parse(
    readFileSync(resolve(rootDir, "package.json"), "utf-8"),
  );
  libName = upperFirst(camelCase(libName || pkg.name));

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
        external: Object.keys(pkg.peerDependencies || {}),
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
