#!/usr/bin/env bun
import { fuzzyMatch, runViteBuild, topoSort } from "./utils";

const matched = fuzzyMatch(process.argv.slice(2));
const sorted = topoSort(matched);

if (!sorted.length) {
  console.log("No packages matched, exit.");
  process.exit(1);
}

console.log(`Packages to watch: ${sorted.join(", ")}`);

for (const pkg of sorted) {
  runViteBuild({ pkg, watch: true, mode: "development", sync: false });
}
