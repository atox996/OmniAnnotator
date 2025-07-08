import { build } from "vite";

import { runOnWorkspacePackages, runOrViteBuild } from "./utils";
import { createSharedViteConfig } from "./viteConfig";

async function main() {
  const procs: Promise<unknown>[] = [];
  await runOnWorkspacePackages(process.cwd(), (pkg) => {
    procs.push(
      runOrViteBuild("dev", pkg, () => {
        const config = createSharedViteConfig(pkg.rootDir, pkg.manifest.name);
        // 这里直接返回 Promise，vite build 的 dev/watch 逻辑
        return build({
          ...config,
          mode: "development",
          build: {
            ...config.build,
            watch: {},
          },
        });
      }),
    );
    return Promise.resolve();
  });
  await Promise.all(procs);
}

main();
