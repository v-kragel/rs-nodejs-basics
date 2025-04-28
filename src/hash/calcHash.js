import { createReadStream } from "fs";
import { createHash } from "crypto";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE = "files";
const FILE_NAME = "fileToCalculateHashFor.txt";

const calculateHash = async () => {
  console.log("Received request to calculate hash");

  const filePath = join(__dirname, SOURCE, FILE_NAME);

  console.log("Generated file path value: ", filePath);

  const hash = createHash("sha256");

  const fileStream = createReadStream(filePath);

  console.log("Started reading file...");

  fileStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  fileStream.on("end", () => {
    const result = hash.digest("hex");

    console.log("Result: ", result);

    console.log("The file was read successfully");
  });

  fileStream.on("error", (err) => {
    console.error("Error reading file:", err);
  });
};

await calculateHash();
