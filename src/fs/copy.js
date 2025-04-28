import { cp } from "fs/promises";
import { getAbsolutePath } from "./utils/getAbsolutePath.js";
import { ensureExists } from "./utils/ensureExists.js";
import { getErrorMessage } from "./utils/getErrorMessage.js";
import { FILE_DOES_NOT_EXIST_ERROR } from "./utils/constants.js";

const SOURCE = "files";
const DESTINATION = "files_copy";

const copy = async () => {
  console.log("Received request to copy 'files' folder.");

  const sourcePath = getAbsolutePath(SOURCE);

  console.log("Generated source value: ", sourcePath);

  const destinationPath = getAbsolutePath(DESTINATION);

  console.log("Generated destination value: ", destinationPath);

  console.log("Verifying source...");

  try {
    await ensureExists(sourcePath);
  } catch {
    throw new Error(getErrorMessage("Source folder doesn't exist."));
  }

  console.log("Source folder exists.");

  console.log("Verifying destination...");

  try {
    await ensureExists(destinationPath);

    throw new Error("Destination folder exists.");
  } catch (err) {
    if (err.message !== FILE_DOES_NOT_EXIST_ERROR) {
      throw new Error(getErrorMessage(err.message));
    }
  }

  console.log("Destination folder doesn't exist.");

  console.log("Copying the source folder...");

  try {
    await cp(sourcePath, destinationPath, { recursive: true });
  } catch (err) {
    throw new Error(getErrorMessage(err.message));
  }

  console.log("The source folder was copied successfully.");
};

await copy();
