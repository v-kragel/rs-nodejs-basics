import { ERROR_MESSAGE_BODY } from "./constants.js";

export const getErrorMessage = (message) => `${ERROR_MESSAGE_BODY}: ${message}`;
