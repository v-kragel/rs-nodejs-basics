import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SOURCE = "files";
const SCRIPT_FILE = "script.js";
const scriptFile = join(__dirname, SOURCE, SCRIPT_FILE);

const spawnChildProcess = async (args) => {
  const child = spawn("node", [scriptFile, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

spawnChildProcess(["arg1", "arg2"]);
