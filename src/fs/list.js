import { readdir } from "fs/promises";
import { getAbsolutePath } from "./utils/getAbsolutePath.js";
import { ensureExists } from "./utils/ensureExists.js";
import { getErrorMessage } from "./utils/getErrorMessage.js";

const SOURCE = "files";

const list = async () => {
  console.log("Received request to print file names.");

  const src = getAbsolutePath(SOURCE);

  console.log("Generated source value: ", src);

  console.log("Verifying source...");

  try {
    await ensureExists(src);
  } catch {
    throw new Error(getErrorMessage("Source folder doesn't exist."));
  }

  console.log("Source folder exists.");

  console.log("Reading the files folder...");

  try {
    const files = await readdir(src);
    console.log(files);
  } catch (err) {
    throw new Error(getErrorMessage(err.message));
  }

  console.log("The files folder was read successfully.");
};

await list();
