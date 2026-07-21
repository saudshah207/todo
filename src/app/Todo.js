import { CheckListItem } from "./CheckListItem.js";
import { utils } from "./utils.js";

export class Todo {
  static #priorities = ["low", "medium", "high"];

  #id = crypto.randomUUID();
  #title = null;
  #description = null;
  #dueDate = null;
  #priority = null;
  #checklist = [];

  constructor(title, description, dueDate, priority, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
  }

  set title(title) {
    if (utils.isValidString(title)) this.#title = title;
  }
  get title() {
    return this.#title;
  }
  set description(description) {
    if (description === null || utils.isValidString(description))
      this.#description = description;
  }
  get description() {
    return this.#description;
  }
  set dueDate(dateString) {
    if (dateString === null) {
      this.#dueDate = dateString;

      return;
    }

    const date = new Date(dateString);

    if (date.valueOf() !== NaN && date >= new Date()) this.#dueDate = date;
  }
  get dueDate() {
    return this.#dueDate;
  }
  set priority(priority) {
    if (priority === null || Todo.#priorities.includes(priority))
      this.#priority = priority;
  }
  get priority() {
    return this.#priority;
  }
  set checklist(list) {
    if (!list) return;

    for (const item of list) {
      if (!(item instanceof CheckListItem)) return;
    }

    this.#checklist = list;
  }
  get checklist() {
    return this.#checklist;
  }
}

export { CheckListItem };
