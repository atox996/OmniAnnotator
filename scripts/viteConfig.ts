import { readFileSync } from "fs";
import { normalize, relative, resolve, sep } from "path";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export function createSharedViteConfig(rootDir: string) {
  const pkg = JSON.parse(
    readFileSync(resolve(rootDir, "package.json"), "utf-8"),
  );

  const entryRoot = resolve(rootDir, "src");
  return defineConfig({
    root: rootDir,
    build: {
      lib: {
        entry: resolve(entryRoot, "index.ts"),
        formats: ["es"],
      },
      emptyOutDir: true,
      rollupOptions: {
        external: Object.keys(pkg.peerDependencies || {}),
        output: {
          entryFileNames: `[name].[format].js`,
          chunkFileNames: `[name].[format].js`,
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              const match = id
                .toString()
                .match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^/]*)\//);
              return `_external/${match?.groups?.moduleName || "integration"}`;
            } else if (normalize(id).startsWith(entryRoot)) {
              const relativePath = relative(entryRoot, id).replace(
                /\.[tj]sx?$/,
                "",
              );
              return relativePath.split(sep).join("/");
            }
          },
        },
        onwarn: (warning, warn) => {
          if (warning.code === "EMPTY_BUNDLE") return;
          warn(warning);
        },
      },
    },
    plugins: [
      dtsPlugin({
        entryRoot: entryRoot,
        outDir: resolve(rootDir, "dist"),
        include: [entryRoot],
      }),
    ],
  });
}
