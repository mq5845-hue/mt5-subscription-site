import { spawnSync } from "node:child_process";

const message = process.argv.slice(2).join(" ").trim();
const commitMessage = message || `chore: ship ${new Date().toISOString().slice(0, 10)}`;

function run(commandLine) {
  const result = spawnSync(commandLine, {
    stdio: "inherit",
    shell: true,
    encoding: "utf8",
  });

  if (result.error) {
    throw result.error;
  }

  return result;
}

function runQuiet(commandLine) {
  return spawnSync(commandLine, {
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
    encoding: "utf8",
  });
}

console.log("Running checks...");
const checkResult = run("npm run check");
if (checkResult.status !== 0) {
  process.exit(checkResult.status ?? 1);
}

console.log("Staging changes...");
run("git add -A");

const diffResult = runQuiet("git diff --cached --quiet");
if (diffResult.status === 0) {
  console.log("No staged changes found. Nothing to commit.");
  process.exit(0);
}

console.log(`Creating commit: ${commitMessage}`);
const escapedCommitMessage = commitMessage.replaceAll("\"", "\\\"");
const commitResult = run(`git commit -m "${escapedCommitMessage}"`);
if (commitResult.status !== 0) {
  process.exit(commitResult.status ?? 1);
}

const remoteResult = runQuiet("git remote get-url origin");
if (remoteResult.status !== 0) {
  console.log("Git remote 'origin' is not configured yet.");
  console.log("Add your GitHub repo URL, then run this command again to push automatically.");
  console.log("Example: git remote add origin <your-github-repo-url>");
  process.exit(0);
}

const branchResult = runQuiet("git rev-parse --abbrev-ref HEAD");
const branch = branchResult.status === 0 ? branchResult.stdout.trim() : "HEAD";

console.log(`Pushing branch: ${branch}`);
const pushResult = run(`git push -u origin ${branch}`);
if (pushResult.status !== 0) {
  process.exit(pushResult.status ?? 1);
}

console.log("Done.");
