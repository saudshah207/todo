class Project {
  #title;
  #todos = [];

  constructor(title) {
    this.#title = title;
  }

  add(todo) {
    if (todo instanceof Todo) this.#todos.push(todo);
  }
}
