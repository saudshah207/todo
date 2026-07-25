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

function toggleTodoItemDone(todoItem) {
  todoItem.classList.toggle("done");
}

function displayTodo(todo) {
  todosList.append(getTodoElement(todo));
}

function removeTodo(todoId) {
  todosList.querySelector(`[data-id='${todoId}']`).remove();
}

function addCheckItem(checkItems) {
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
}

displayTodos(app.getTodos());

export { displayTodo, toggleTodoItemDone, addCheckItem, removeTodo };
