import { spawn, spawnSync } from "child_process";
import { readdirSync, readFileSync, statSync } from "fs";
import { join, resolve } from "path";

export const packagesDir = resolve("packages");
export const allPackages = readdirSync(packagesDir).filter(
  (name) =>
    !name.startsWith(".") && statSync(join(packagesDir, name)).isDirectory(),
);

export function getDeps(pkg: string): string[] {
  const pkgJsonPath = join(packagesDir, pkg, "package.json");
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
  const deps = Object.assign(
    {},
    pkgJson.dependencies,
    pkgJson.peerDependencies,
    pkgJson.devDependencies,
  );
  return Object.keys(deps || {})
    .map((dep) => dep.replace(/^@omni-annotator\//, ""))
    .filter((dep) => allPackages.includes(dep));
}

export function topoSort(pkgs: string[]): string[] {
  const visited = new Set<string>();
  const result: string[] = [];
  function visit(pkg: string) {
    if (visited.has(pkg)) return;
    visited.add(pkg);
    for (const dep of getDeps(pkg)) {
      visit(dep);
    }
    result.push(pkg);
  }
  for (const pkg of pkgs) visit(pkg);
  return Array.from(new Set(result));
}

export function fuzzyMatch(input: string[]): string[] {
  if (!input.length) return allPackages;
  return allPackages.filter((pkg) => input.some((t) => pkg.includes(t)));
}

export function runViteBuild({
  pkg,
  watch = false,
  mode = "production",
  sync = true,
}: {
  pkg: string;
  watch?: boolean;
  mode?: string;
  sync?: boolean;
}) {
  const env = { ...process.env, PKG: pkg };
  const args = ["build"];
  if (watch) args.push("--watch");
  if (mode) args.push("--mode", mode);
  if (sync) {
    return spawnSync("vite", args, { env, stdio: "inherit" });
  } else {
    return spawn("vite", args, { env, stdio: "inherit" });
  }
}
