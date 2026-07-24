import { app } from "../app/app.js";

const selectors = {
  todosList: ".todos",
};

const todosList = document.querySelector(selectors.todosList);

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
  dueDate.classList.add("margin-left-auto");

  title.textContent = todo.title;
  markDoneCheckbox.type = "checkbox";
  dueDate.textContent = todo.dueDate?.toLocaleDateString();

  listItem.append(markDoneCheckbox, title, dueDate);

  return listItem;
}

function displayTodo(todo) {
  todosList.append(getTodoElement(todo));
}

displayTodos(app.getTodos());

export { displayTodo };
