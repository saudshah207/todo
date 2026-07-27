const selectors = {
  todosList: ".todos",
};

const todosList = document.querySelector(selectors.todosList);

function getTodoElement(todo) {
  const listItem = document.createElement("li"),
    markDoneCheckbox = document.createElement("input"),
    title = document.createElement("h3"),
    dueDate = document.createElement("span"),
    actionButton = document.createElement("button");

  const listItemCssClasses = [
    "todo",
    "flex",
    "flex-wrap",
    "standard-gap",
    "standard-padding",
    "align-items-center",
  ];

  listItem.dataset.id = todo.id;
  listItem.classList.add(...listItemCssClasses);
  title.classList.add("todo-title");
  dueDate.classList.add("margin-left-auto");
  actionButton.classList.add("button", "light-button");

  listItem.dataset.ui = "todo";
  listItem.dataset.action = "edit-todo";
  title.textContent = todo.title;
  markDoneCheckbox.type = "checkbox";
  markDoneCheckbox.dataset.action = "mark-todo-done";
  dueDate.textContent = todo.dueDate?.toLocaleDateString();
  actionButton.dataset.action = "perform-todo-action";
  actionButton.textContent = "Action";

  listItem.append(markDoneCheckbox, title, dueDate, actionButton);

  return listItem;
}

const todo = {
  toggleDone(todoItem) {
    todoItem.classList.toggle("done");
  },

  display(todo) {
    todosList.append(getTodoElement(todo));
  },

  remove(todoId) {
    todosList.querySelector(`[data-id='${todoId}']`).remove();
  },

  displayTodos(todos) {
    todosList.replaceChildren();

    for (const todo of todos) {
      this.display(todo);
    }
  },
};

export { todo as todosList };
