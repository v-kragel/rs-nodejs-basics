import { createReadStream, createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGunzip } from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE = "files";
const FILE_TO_DECOMPRESS = "archive.gz";
const DESTINATION_FILE = "fileToCompress.txt";

const decompress = async () => {
  console.log("Received request to decompress file.");

  const filePath = join(__dirname, SOURCE, FILE_TO_DECOMPRESS);

  console.log("Generated file path: ", filePath);

  const destinationPath = join(__dirname, SOURCE, DESTINATION_FILE);

  console.log("Generated destination file path: ", destinationPath);

  const readStream = createReadStream(filePath);
  const gunzip = createGunzip();
  const writeStream = createWriteStream(destinationPath);

  console.log("Decompression started...");

  readStream
    .pipe(gunzip)
    .pipe(writeStream)
    .on("finish", () => {
      console.log("File successfully decompressed.");
    })
    .on("error", (err) => {
      console.error("Decompression failed: ", err);
    });
};

await decompress();
