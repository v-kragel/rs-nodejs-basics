import { dirname } from "path";
import { fileURLToPath } from "url";
import { loadModuleC } from "./utils/loadModuleC.js";
import { loadRandomJson } from "./utils/loadRandomJson.js";
import { logSystemInfo } from "./utils/logSystemInfo.js";
import { logPaths } from "./utils/logPaths.js";
import { createHttpServer } from "./utils/createHttpServer.js";
import { logServer } from "./utils/logServer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await loadModuleC();

const unknownObject = await loadRandomJson();

logSystemInfo();

logPaths(__filename, __dirname);

const myServer = createHttpServer();

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  logServer(PORT);
});

export { unknownObject, myServer };
