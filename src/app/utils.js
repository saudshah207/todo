export const utils = {
  isEmptyValue(value, isValueString = null) {
    isValueString =
      isValueString === null ? this.isString(value) : isValueString;
    const isEmptyString = isValueString && this.isEmptyString(value);

    return value === null || isEmptyString;
  },
  isString(string) {
    if (typeof string === "string") return true;

    return false;
  },
  isEmptyString(string) {
    if (string.trim() === "") return true;

    return false;
  },
};
