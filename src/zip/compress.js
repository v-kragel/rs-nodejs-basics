import { createReadStream, createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE = "files";
const FILE_TO_COMPRESS = "fileToCompress.txt";
const DESTINATION_FILE = "archive.gz";

const compress = async () => {
  console.log("Received request to compress file.");

  const filePath = join(__dirname, SOURCE, FILE_TO_COMPRESS);

  console.log("Generated file path: ", filePath);

  const destinationPath = join(__dirname, SOURCE, DESTINATION_FILE);

  console.log("Generated destination file path: ", destinationPath);

  const readStream = createReadStream(filePath);
  const gzip = createGzip();
  const writeStream = createWriteStream(destinationPath);

  console.log("Compression started...");

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on("finish", () => {
      console.log("File successfully compressed.");
    })
    .on("error", (err) => {
      console.error("Compression failed: ", err);
    });
};

await compress();
