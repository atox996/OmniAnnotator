import { sortPackages } from "@pnpm/sort-packages";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { createPkgGraph } from "@pnpm/workspace.pkgs-graph";
import { readWorkspaceManifest } from "@pnpm/workspace.read-manifest";
import { spawn } from "child_process";
import { build } from "vite";

import { getBaseViteConfig } from "./utils";

const repoRoot = process.cwd();

async function main() {
  const workspaceManifest = await readWorkspaceManifest(repoRoot);
  if (!workspaceManifest) throw new Error("No workspace manifest found");
  const projects = await findWorkspacePackages(repoRoot, {
    patterns: workspaceManifest.packages,
  });

  const graph = createPkgGraph(
    projects.filter((project) => project.rootDir !== repoRoot),
  );

  const chunks = sortPackages(graph.graph);

  // 依次构建
  for (const chunk of chunks) {
    for (const pkg of chunk) {
      const { manifest, rootDir } = graph.graph[pkg].package;
      console.log(`Building package ${manifest.name}`);
      if (manifest.scripts?.build) {
        await new Promise((resolvePromise, rejectPromise) => {
          const child = spawn("pnpm", ["run", "build"], {
            cwd: rootDir,
            stdio: "inherit",
            shell: process.platform === "win32",
          });
          child.on("close", (code) => {
            if (code === 0) resolvePromise(undefined);
            else
              rejectPromise(
                new Error(`Custom build failed for ${manifest.name}`),
              );
          });
        });
      } else {
        const config = getBaseViteConfig(rootDir, manifest.name);
        await build(config);
      }
    }
  }
}

main();
