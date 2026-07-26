import { app } from "../app/app.js";

const selectors = {
  todosList: ".todos",
  projectsList: "[data-ui='projects']",
};

const todosList = document.querySelector(selectors.todosList),
  projectsList = document.querySelector(selectors.projectsList);

function displayTodos(todos) {
  todosList.replaceChildren();

  for (const todo of todos) {
    displayTodo(todo);
  }
}

function getTodoElement(todo) {
  const listItem = document.createElement("li"),
    markDoneCheckbox = document.createElement("input"),
    title = document.createElement("h3"),
    dueDate = document.createElement("span");

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

  listItem.dataset.ui = "todo";
  listItem.dataset.action = "edit-todo";
  title.textContent = todo.title;
  markDoneCheckbox.type = "checkbox";
  markDoneCheckbox.dataset.action = "mark-todo-done";
  dueDate.textContent = todo.dueDate?.toLocaleDateString();

  listItem.append(markDoneCheckbox, title, dueDate);

  return listItem;
}

function getProjectElement(project) {
  const listItem = document.createElement("li"),
    projectButton = document.createElement("button"),
    title = document.createElement("h3");

  const projectButtonCssClasses = [
    "button",
    "light-button",
    "flex",
    "standard-gap",
    "align-items-center",
  ];

  projectButton.classList.add(...projectButtonCssClasses);

  projectButton.dataset.id = project.id;
  projectButton.dataset.action = "display-project-todos";
  title.textContent = project.title;

  projectButton.append(title);

  listItem.append(projectButton);

  return listItem;
}

const display = {
  toggleTodoDone(todoItem) {
    todoItem.classList.toggle("done");
  },

  displayTodo(todo) {
    todosList.append(getTodoElement(todo));
  },

  removeTodo(todoId) {
    todosList.querySelector(`[data-id='${todoId}']`).remove();
  },

  addCheckItem(checkItems) {
    checkItems.classList.remove("display-none");

    const checkItem = document.createElement("li"),
      checkbox = document.createElement("input"),
      labelInput = document.createElement("input"),
      deleteButton = document.createElement("button");

    checkItem.classList.add(
      "check-item",
      "flex",
      "align-items-center",
      "standard-gap",
    );
    labelInput.classList.add("check-item-label");
    deleteButton.classList.add("button", "display-none");

    checkItem.dataset.ui = "check-item";
    checkbox.type = "checkbox";
    checkbox.name = "isChecked";
    labelInput.type = "text";
    labelInput.name = "checkItem";
    labelInput.required = true;
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "remove-check-item";

    checkItem.append(checkbox, labelInput, deleteButton);

    checkItems.append(checkItem);

    return checkItem;
  },

  displayProject(project) {
    projectsList.classList.remove("display-none");

    projectsList.append(getProjectElement(project));
  },
};

displayTodos(app.getTodos());

const { addCheckItem } = display;

export { display, addCheckItem };
