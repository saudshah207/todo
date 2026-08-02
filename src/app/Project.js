import { Todo } from "./Todo.js";
import { utils } from "./utils.js";

export class Project {
  static #projects = [];

  #id = crypto.randomUUID();
  #title = null;
  #todos = [];

  constructor(title) {
    this.title = title;
  }

  static get projects() {
    return Project.#projects;
  }
  static set projects(projects) {
    for (const project of projects) {
      if (!(project instanceof Project)) return;
    }

    Project.#projects = projects;
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

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      todos: this.#todos,
    };
  }

  static find(predicate) {
    return Project.#projects.find(predicate);
  }

  static delete(project) {
    Project.#projects.splice(Project.#projects.indexOf(project), 1);
  }

  static fromJSON(data) {
    const project = new Project(data.title);

    for (const todo of data.todos) {
      project.add(todo);
    }

    project.#id = data.id;

    return project;
  }
}
