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
  #isDone = false;

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
  static set todos(todos) {
    for (const todo of todos) {
      if (!(todo instanceof Todo)) return;
    }

    Todo.#todos = todos;
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

    const date = new Date(dateString),
      currentDate = new Date();

    date.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (date.valueOf() !== NaN && date >= currentDate) this.#dueDate = date;
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
  get isDone() {
    return this.#isDone;
  }

  toggleDone() {
    this.#isDone = !this.#isDone;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      checklist: this.#checklist,
      isDone: this.#isDone,
    };
  }

  static find(predicate) {
    return Todo.#todos.find(predicate);
  }

  static delete(todo) {
    Todo.#todos.splice(Todo.#todos.indexOf(todo), 1);
  }

  static fromJSON(data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.checklist,
    );

    todo.#id = data.id;
    todo.#isDone = data.isDone;

    // also set date directly in case it is now in the past
    if (data.dueDate) {
      const dueDate = new Date(data.dueDate);
      todo.#dueDate = dueDate;
    }

    return todo;
  }
}

export { CheckListItem };
