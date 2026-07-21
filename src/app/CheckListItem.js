import { utils } from "./utils.js";

export class CheckListItem {
  #label;
  #isChecked = false;

  constructor(label) {
    this.label = label;
  }

  toggle() {
    this.#isChecked = !this.#isChecked;
  }

  set label(label) {
    if (utils.isValidString(label)) this.#label = label;
  }
  get label() {
    return this.#label;
  }

  get isChecked() {
    return this.#isChecked;
  }
}
