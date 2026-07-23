import { app } from "../app/app.js";

const selectors = {
  todosList: ".todos",
};

const todosList = document.querySelector(selectors.todosList);

function displayTodos(todos) {
  for (const todo of todos) {
    displayTodo(todo);
  }
}

function getTodoElement(todo) {
  const listItem = document.createElement("li"),
    markDoneCheckbox = document.createElement("input"),
    title = document.createElement("h3"),
    dueDate = document.createElement("span");

  listItem.dataset.id = todo.id;

  title.textContent = todo.title;
  markDoneCheckbox.type = "checkbox";
  dueDate.textContent = todo.dueDate.toLocaleDateString();

  listItem.append(markDoneCheckbox, title, dueDate);

  return listItem;
}

function displayTodo(todo) {
  todosList.append(getTodoElement(todo));
}

displayTodos(app.getTodos());

export { displayTodo };
