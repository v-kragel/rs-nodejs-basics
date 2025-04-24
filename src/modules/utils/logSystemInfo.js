import path from "path";
import { release, version } from "os";

export function logSystemInfo() {
  console.log(`Release ${release()}`);
  console.log(`Version ${version()}`);
  console.log(`Path segment separator is "${path.sep}"`);
}
