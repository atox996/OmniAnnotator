import { build } from "vite";

import { runOnWorkspacePackages, runOrViteBuild } from "./utils";
import { createSharedViteConfig } from "./viteConfig";

runOnWorkspacePackages(process.cwd(), (pkg) =>
  runOrViteBuild("build", pkg, () =>
    build(createSharedViteConfig(pkg.rootDir, pkg.manifest.name)),
  ),
);
