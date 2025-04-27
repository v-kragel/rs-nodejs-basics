import { Worker } from "worker_threads";
import { cpus } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const WORKER_FILE = "worker.js";
const workerFile = join(__dirname, WORKER_FILE);

const START_NUMBER = 10;

const CORES_COUNT = cpus().length;

const getPromiseWorker = (number) =>
  new Promise((resolve) => {
    const worker = new Worker(workerFile, { workerData: number });

    worker.on("message", (data) => resolve({ status: "resolved", data }));

    worker.on("error", () => resolve({ status: "error", data: null }));
  });

const performCalculations = async () => {
  console.log("Received request to perform calculations.");

  console.log("Cores count: ", CORES_COUNT);

  const workers = Array.from({ length: CORES_COUNT }, (_, index) =>
    getPromiseWorker(START_NUMBER + index)
  );

  const result = await Promise.all(workers);

  console.log(result);
};

await performCalculations();
