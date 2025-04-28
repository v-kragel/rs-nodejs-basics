import { access, constants } from "fs/promises";
import { FILE_DOES_NOT_EXIST_ERROR } from './constants.js';

export const ensureExists = async (path) => {
  try {
    await access(path, constants.F_OK);
  } catch {
    throw new Error(FILE_DOES_NOT_EXIST_ERROR);
  }
};
