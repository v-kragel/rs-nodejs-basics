import { readFile } from "fs/promises";
import { getAbsolutePath } from "./utils/getAbsolutePath.js";
import { ensureExists } from "./utils/ensureExists.js";
import { getErrorMessage } from "./utils/getErrorMessage.js";

const SOURCE = "files";
const FILE_NAME = "fileToRead.txt";

const read = async () => {
  console.log("Received request to read file.");

  const src = getAbsolutePath(SOURCE);

  console.log("Generated source value: ", src);

  const filePath = getAbsolutePath(SOURCE, FILE_NAME);

  console.log("Generated file path value: ", filePath);

  console.log("Verifying source...");

  try {
    await ensureExists(src);
  } catch {
    throw new Error(getErrorMessage("Source folder doesn't exist."));
  }

  console.log("Source folder exists.");

  console.log("Verifying file...");

  try {
    await ensureExists(filePath);
  } catch {
    throw new Error(getErrorMessage("File doesn't exist"));
  }

  console.log("File exists.");

  console.log("Reading the file...");

  try {
    const content = await readFile(filePath, "utf-8");
    console.log(content);
  } catch (err) {
    throw new Error(getErrorMessage(err.message));
  }

  console.log("The file was read successfully.");
};

await read();
