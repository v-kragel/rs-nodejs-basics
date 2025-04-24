import { rename as renameFile } from "fs/promises";
import { getAbsolutePath } from "./utils/getAbsolutePath.js";
import { ensureExists } from "./utils/ensureExists.js";
import { getErrorMessage } from "./utils/getErrorMessage.js";
import { FILE_DOES_NOT_EXIST_ERROR } from "./utils/constants.js";

const SOURCE = "files";
const WRONG_FILE_NAME = "wrongFilename.txt";
const PROPER_FILE_NAME = "properFilename.md";

const rename = async () => {
  console.log("Received request to rename file.");

  const src = getAbsolutePath(SOURCE);

  console.log("Generated source value: ", src);

  const oldPath = getAbsolutePath(SOURCE, WRONG_FILE_NAME);

  console.log("Generated oldPath value: ", oldPath);

  const newPath = getAbsolutePath(SOURCE, PROPER_FILE_NAME);

  console.log("Generated newPath value: ", newPath);

  console.log("Verifying source...");

  try {
    await ensureExists(src);
  } catch {
    throw new Error(getErrorMessage("Source folder doesn't exist."));
  }

  console.log("Source folder exists.");

  console.log("Verifying the wrong file...");

  try {
    await ensureExists(oldPath);
  } catch {
    throw new Error(getErrorMessage("Wrong file doesn't exist"));
  }

  console.log("Wrong file exists.");

  console.log("Verifying the proper file...");

  try {
    await ensureExists(newPath);

    throw new Error("Proper file exists.");
  } catch (err) {
    if (err.message !== FILE_DOES_NOT_EXIST_ERROR) {
      throw new Error(getErrorMessage(err.message));
    }
  }

  console.log("Proper file doesn't exist.");

  console.log("Renaming the file...");

  try {
    await renameFile(oldPath, newPath);
  } catch (err) {
    throw new Error(getErrorMessage(err.message));
  }

  console.log("The file was renamed successfully.");
};

await rename();
