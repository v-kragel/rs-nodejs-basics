import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE = "files";
const FILE_NAME = "fileToWrite.txt";

const write = async () => {
  console.log("Received request to write data into file.");

  const filePath = join(__dirname, SOURCE, FILE_NAME);

  console.log("Generated file path: ", filePath);

  const writeStream = createWriteStream(filePath, "utf-8");

  console.log("Please, type your text below.");

  process.stdin.on("data", (data) => {
    writeStream.write(data);

    console.log("Your text was saved successfully.");

    process.exit();
  });
};

await write();
