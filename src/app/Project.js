import { Todo } from "./Todo.js";
import { utils } from "./utils.js";

export class Project {
  static #projects = [];

  #id = crypto.randomUUID();
  #title = null;
  #todos = [];

  constructor(title) {
    this.#title = title;
  }

  static get projects() {
    return Project.#projects;
  }

  get id() {
    return this.#id;
  }
  set title(title) {
    const isString = utils.isString(title);

    if (utils.isEmptyValue(title, isString)) this.#title = null;
    else if (isString) this.#title = title.trim();
  }
  get title() {
    return this.#title;
  }
  get todos() {
    return this.#todos;
  }

  add(todo) {
    if (todo instanceof Todo) this.#todos.push(todo);
  }

  has(todo) {
    return this.#todos.includes(todo);
  }

  delete(todo) {
    this.#todos.splice(this.#todos.indexOf(todo), 1);
  }

  static find(predicate) {
    return Project.#projects.find(predicate);
  }
}
