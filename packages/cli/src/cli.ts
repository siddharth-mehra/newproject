#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import path from "path";

const program = new Command();

program
  .name("monorepo-cli")
  .description("Bootstrap a full monorepo")
  .version("1.0.0");

program
  .command("init <project-name>")
  .description("Initialize a new monorepo project")
  .action(async (projectName: string) => {
    const targetPath = path.resolve(process.cwd(), projectName);

    console.log(`Creating monorepo at: ${targetPath}`);

    // Folder structure
    const structure = [
      "apps/http-backend/src",
      "apps/ws-backend/src",
      "apps/web/src",
      "packages/ui",
      "packages/eslint-config",
      "packages/typescript-config"
    ];

    for (const dir of structure) {
      await fs.ensureDir(path.join(targetPath, dir));
    }

    // Create turbo.json
    await fs.writeJson(path.join(targetPath, "turbo.json"), {
      "$schema": "https://turborepo.org/schema.json",
      "pipeline": {}
    }, { spaces: 2 });

    // Create workspace file
    await fs.writeFile(
      path.join(targetPath, "pnpm-workspace.yaml"),
      `packages:\n  - "apps/*"\n  - "packages/*"\n`
    );

    // Create package.json
    await fs.writeJson(path.join(targetPath, "package.json"), {
      name: projectName,
      private: true,
      version: "1.0.0",
      packageManager: "pnpm@9.0.0",
      scripts: {
        dev: "turbo run dev",
        build: "turbo run build"
      },
      workspaces: ["apps/*", "packages/*"],
      devDependencies: {
        turbo: "^2.5.5",
        typescript: "^5.0.0"
      }
    }, { spaces: 2 });

    console.log("✅ Monorepo created successfully!");
  });

program.parse(process.argv);
