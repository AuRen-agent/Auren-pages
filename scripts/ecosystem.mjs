#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const configPath = join(root, "ecosystem.projects.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));
const [command = "list", filter] = process.argv.slice(2);

function selectedProjects() {
  if (!filter) return config.projects;
  return config.projects.filter((project) =>
    [project.id, project.name, project.owner, project.syncGroup]
      .some((value) => String(value).toLowerCase() === filter.toLowerCase()),
  );
}

function printList() {
  console.log(`${config.name}: ${config.projects.length} linked projects`);
  for (const project of selectedProjects()) {
    console.log(`- ${project.name} [${project.syncGroup}] ${project.url}`);
    console.log(`  role: ${project.role}`);
  }
}

function printClonePlan() {
  for (const project of selectedProjects()) {
    console.log(`git clone --branch ${project.branch} ${project.url} repos/${project.id}`);
  }
}

function printSyncPlan() {
  for (const project of selectedProjects()) {
    console.log(`# ${project.name}`);
    console.log(`git -C repos/${project.id} fetch origin ${project.branch}`);
    console.log(`git -C repos/${project.id} pull --ff-only origin ${project.branch}`);
    console.log(project.commands.status.replace(/^git /, `git -C repos/${project.id} `));
  }
}

function printCheckPlan() {
  for (const project of selectedProjects()) {
    console.log(`# ${project.name}`);
    for (const checkName of config.syncPolicy.requiredChecks) {
      const check = project.commands[checkName];
      if (check) console.log(`(cd repos/${project.id} && ${check})`);
    }
  }
}

switch (command) {
  case "list":
    printList();
    break;
  case "clone-plan":
    printClonePlan();
    break;
  case "sync-plan":
    printSyncPlan();
    break;
  case "check-plan":
    printCheckPlan();
    break;
  default:
    console.error("Usage: pnpm ecosystem <list|clone-plan|sync-plan|check-plan> [project-id|owner|syncGroup]");
    process.exitCode = 1;
}
