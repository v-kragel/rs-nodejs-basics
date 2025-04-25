import { createReadStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE = "files";
const FILE_NAME = "fileToRead.txt";

const read = async () => {
  console.log("Received request to read the file using readable stream.");

  const filePath = join(__dirname, SOURCE, FILE_NAME);

  console.log("Generated file path: ", filePath);

  const readStream = createReadStream(filePath, "utf-8");

  readStream.on("data", (data) => {
    console.log(data);
  });

  readStream.on("error", (err) => {
    console.error("Error reading file: ", err);
  });
};

await read();
