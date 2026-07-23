import { CheckListItem } from "./CheckListItem.js";
import { utils } from "./utils.js";

export class Todo {
  static #todos = [];

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

  static get todos() {
    return Todo.#todos;
  }

  set title(title) {
    const isString = utils.isString(title);

    if (utils.isEmptyValue(title, isString)) this.#title = null;
    else if (isString) this.#title = title.trim();
  }
  get title() {
    return this.#title;
  }
  set description(description) {
    const isString = utils.isString(description);

    if (utils.isEmptyValue(description, isString)) this.#description = null;
    else if (isString) this.#description = description.trim();
  }
  get description() {
    return this.#description;
  }
  set dueDate(dateString) {
    if (utils.isEmptyValue(dateString)) {
      this.#dueDate = null;

      return;
    }

    const date = new Date(dateString);

    if (date.valueOf() !== NaN && date >= new Date()) this.#dueDate = date;
  }
  get dueDate() {
    return this.#dueDate;
  }
  set priority(priority) {
    if (utils.isEmptyValue(priority)) this.#priority = null;
    else if (Todo.#priorities.includes(priority)) this.#priority = priority;
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
