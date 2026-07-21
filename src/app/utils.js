export const utils = {
  isValidString(string) {
    if (typeof string === "string" && string.trim() !== "") return true;

    return false;
  },
};
