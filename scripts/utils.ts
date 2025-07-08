import { sortPackages } from "@pnpm/sort-packages";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { createPkgGraph, type Package } from "@pnpm/workspace.pkgs-graph";
import { readWorkspaceManifest } from "@pnpm/workspace.read-manifest";
import { spawn } from "child_process";

export async function runOnWorkspacePackages(
  repoRoot: string,
  fn: (pkg: Package) => Promise<unknown>,
) {
  const workspaceManifest = await readWorkspaceManifest(repoRoot);
  if (!workspaceManifest) throw new Error("No workspace manifest found");
  const patterns = workspaceManifest.packages.filter(
    (p: string) => !p.startsWith("internal/"),
  );
  const projects = await findWorkspacePackages(repoRoot, { patterns });
  const graph = createPkgGraph(
    projects.filter((project) => project.rootDir !== repoRoot),
  );
  const chunks = sortPackages(graph.graph);
  for (const chunk of chunks) {
    for (const key of chunk) {
      await fn(graph.graph[key].package);
    }
  }
}

export async function runOrViteBuild(
  scriptName: string,
  pkg: Package,
  viteHandler: () => Promise<unknown>,
) {
  if (pkg.manifest.scripts?.[scriptName]) {
    await new Promise((resolve, reject) => {
      const child = spawn("pnpm", ["run", scriptName], {
        cwd: pkg.rootDir,
        stdio: "inherit",
        shell: process.platform === "win32",
      });
      child.on("close", (code) => {
        if (code === 0) resolve(undefined);
        else
          reject(
            new Error(`Custom ${scriptName} failed for ${pkg.manifest.name}`),
          );
      });
    });
  } else {
    await viteHandler();
  }
}
