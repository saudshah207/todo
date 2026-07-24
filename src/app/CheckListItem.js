import { utils } from "./utils.js";

export class CheckListItem {
  #label;
  #isChecked = false;

  constructor(label, isChecked) {
    this.label = label;
    this.isChecked = isChecked;
  }

  toggle() {
    this.#isChecked = !this.#isChecked;
  }

  set label(label) {
    const isString = utils.isString(label);

    if (utils.isEmptyValue(label, isString)) this.#label = null;
    else if (isString) this.#label = label;
  }
  get label() {
    return this.#label;
  }
  set isChecked(isChecked) {
    if (typeof isChecked === "boolean") this.#isChecked = isChecked;
  }
  get isChecked() {
    return this.#isChecked;
  }
}
