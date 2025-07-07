#!/usr/bin/env bun
import { fuzzyMatch, runViteBuild, topoSort } from "./utils";

const matched = fuzzyMatch(process.argv.slice(2));
const sorted = topoSort(matched);

if (!sorted.length) {
  console.log("No packages matched, exit.");
  process.exit(1);
}

console.log(`Packages to build: ${sorted.join(", ")}`);

for (const pkg of sorted) {
  console.log(`\n=== Building ${pkg} ===`);
  const result = runViteBuild({ pkg, sync: true });
  if (result && "status" in result && result.status !== 0)
    process.exit(result.status ?? 1);
}
