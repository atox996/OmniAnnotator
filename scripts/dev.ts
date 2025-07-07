#!/usr/bin/env bun
import { spawn } from "child_process";
import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const packagesDir = resolve("packages");
const packages = readdirSync(packagesDir).filter(
  (name) =>
    !name.startsWith(".") && statSync(join(packagesDir, name)).isDirectory(),
);

const args = process.argv.slice(2);
let targets: string[] = [];
let formats = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--formats" && args[i + 1]) {
    formats = args[i + 1];
    i++;
  } else {
    targets.push(args[i]);
  }
}

if (targets.length === 0) {
  targets = packages;
}

for (const pkg of targets) {
  if (!packages.includes(pkg)) {
    console.error(`Unknown package: ${pkg}`);
    process.exit(1);
  }
  const env = { ...process.env, PKG: pkg };
  const formatArg = formats ? ["--formats", formats] : [];
  console.log(`\n=== Dev ${pkg} ${formats ? `(${formats})` : ""} ===`);
  spawn("vite", ["build", "--watch", "--mode", "development", ...formatArg], {
    env,
    stdio: "inherit",
  });
}
