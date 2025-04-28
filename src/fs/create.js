import { writeFile } from "fs/promises";
import { getAbsolutePath } from "./utils/getAbsolutePath.js";
import { ensureExists } from "./utils/ensureExists.js";
import { getErrorMessage } from "./utils/getErrorMessage.js";
import { FILE_DOES_NOT_EXIST_ERROR } from "./utils/constants.js";

const FILE_CONTENT = "I am fresh and young";
const FILE_NAME = "fresh.txt";
const SOURCE = "files";

const create = async () => {
  console.log("Received request to create file.");

  const src = getAbsolutePath(SOURCE);

  console.log("Generated source value: ", src);

  const filePath = getAbsolutePath(SOURCE, FILE_NAME);

  console.log("Generated file path: ", filePath);

  console.log("Verifying source...");

  try {
    await ensureExists(src);
  } catch (err) {
    throw new Error(getErrorMessage("Source folder doesn't exist."));
  }

  console.log("Source folder exists.");

  console.log("Verifying created file...");

  try {
    await ensureExists(filePath);

    throw new Error("Created file exists.");
  } catch (err) {
    if (err.message !== FILE_DOES_NOT_EXIST_ERROR) {
      throw new Error(getErrorMessage(err.message));
    }
  }

  console.log("File doesn't exist.");

  console.log("Creating the file...");

  try {
    await writeFile(filePath, FILE_CONTENT, { flag: "wx" });
  } catch (err) {
    throw new Error(getErrorMessage(err.message));
  }

  console.log("File was written successfully");
};

await create();
