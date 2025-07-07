import fs from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const packagesDir = resolve(__dirname, "packages");
const packages = fs
  .readdirSync(packagesDir)
  .filter(
    (name) =>
      !name.startsWith(".") &&
      fs.statSync(resolve(packagesDir, name)).isDirectory(),
  );

const pkg = process.env.PKG;
if (!pkg || !packages.includes(pkg)) {
  throw new Error(
    `请通过环境变量 PKG 指定要构建的包名，如：PKG=core vite build。可选包：${packages.join(", ")}`,
  );
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, `packages/${pkg}/src/index.ts`),
      name: pkg,
      fileName: (format) => `index.${format}.js`,
    },
    outDir: `packages/${pkg}/dist`,
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
  },
  plugins: [
    dts({
      entryRoot: `packages/${pkg}/src`,
      outDir: `packages/${pkg}/dist`,
    }),
  ],
});
