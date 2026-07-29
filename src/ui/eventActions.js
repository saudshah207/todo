import { app } from "../app/app.js";
import { todosList } from "./todosList.js";
import { projectsList } from "./projectsList.js";
import { checkItem } from "./checkItem.js";
import {
  addTodoDialog,
  editTodoDialog,
  addProjectDialog,
  todoActionDialog,
  Dialog,
} from "./dialog.js";
import { mainPanel } from "./mainPanel.js";
import { ClickEventAction, SubmitEventAction } from "./EventAction.js";

const selectors = {
  todoItem: "[data-ui='todo']",
  checkItems: "[data-ui='check-items']",
  checkItem: "[data-ui='check-item']",
  projectsList: "[data-ui='projects']",
};

function getTodoFormValues(formElements) {
  const [title, description, dueDate, priority] = [
    formElements.title.value,
    formElements.description.value,
    formElements.dueDate.value,
    formElements.priority.value,
  ];

  const checkItemElements = formElements.checkItem,
    checkItemsCheckedStates = formElements.isChecked,
    checkItems = {};

  // Array.isArray doesn't work because checkItemElements is a RadioNodeList
  if (checkItemElements?.length) {
    for (let i = 0; i < checkItemElements.length; i++) {
      checkItems[checkItemElements[i].value] =
        checkItemsCheckedStates[i].checked;
    }
  } else if (checkItemElements)
    checkItems[checkItemElements?.value] = checkItemsCheckedStates?.checked;

  return {
    title,
    description,
    dueDate,
    priority,
    checkItems,
  };
}

const clickActions = [
  new ClickEventAction("display-add-todo-dialog", function () {
    addTodoDialog.display();
  }),
  new ClickEventAction("close-dialog", function (actionTrigger) {
    Dialog.closeDialog(actionTrigger);
  }),
  new ClickEventAction("mark-todo-done", function (actionTrigger) {
    const todoItem = actionTrigger.closest(selectors.todoItem);
    app.toggleTodoDone(todoItem.dataset.id);
    todosList.toggleDone(todoItem);
  }),
  new ClickEventAction("add-check-item", function (actionTrigger) {
    const checkItemsList = actionTrigger.parentElement.querySelector(
      selectors.checkItems,
    );
    checkItem.add(checkItemsList);
  }),
  new ClickEventAction("remove-check-item", function (actionTrigger) {
    const checkItemElement = actionTrigger.closest(selectors.checkItem);
    checkItemElement.remove();
  }),
  new ClickEventAction("display-edit-todo-dialog", function (actionTrigger) {
    const todo = app.getTodo(actionTrigger.dataset.id);
    editTodoDialog.populate(todo);
    editTodoDialog.display();
  }),
  new ClickEventAction("display-add-project-dialog", function () {
    addProjectDialog.display();
  }),
  new ClickEventAction("display-project-todos", function (actionTrigger) {
    const project = app.getProject(actionTrigger.dataset.id);
    const todos = app.getTodos(project);

    mainPanel.updateTitle(project.title);

    if (todos.length === 0)
      mainPanel.displayMessage("No todos in this project yet.");
    else mainPanel.hideMessage();

    todosList.displayTodos(todos);
  }),
  new ClickEventAction("display-todo-action-dialog", function (actionTrigger) {
    const todoId = actionTrigger.closest(selectors.todoItem).dataset.id;
    todoActionDialog.attachTodoId(todoId);
    todoActionDialog.display();
  }),
  new ClickEventAction("delete-todo", function () {
    const todoId = todoActionDialog.dialog.dataset.id;
    app.deleteTodo(todoId);
    todosList.remove(todoId);
    todoActionDialog.close();
  }),
  new ClickEventAction("display-projects-to-move-todo-to", function () {
    todoActionDialog.toggleActionButtonsDisplay();
    todoActionDialog.toggleFormDisplay();

    projectsList.displayProjects(
      app.getProjects(app.getTodo(todoActionDialog.dialog.dataset.id)),
      todoActionDialog.form.querySelector(selectors.projectsList),
      true,
    );
  }),
];

const submitActions = [
  new SubmitEventAction("add-todo-form", function (formElements) {
    todosList.display(app.addTodo(getTodoFormValues(formElements)));

    addTodoDialog.close();
  }),
  new SubmitEventAction("edit-todo-form", function (formElements, target) {
    const todoId = target.dataset.id;

    todosList.remove(todoId);
    todosList.display(app.updateTodo(todoId, getTodoFormValues(formElements)));

    editTodoDialog.close();
  }),
  new SubmitEventAction("add-project-form", function (formElements) {
    const project = app.addProject(formElements.title.value);

    projectsList.display(project);

    addProjectDialog.close();
  }),
  new SubmitEventAction("move-todo-to-project-form", function (formElements) {
    app.moveTodoToProject(
      formElements.project.value,
      todoActionDialog.dialog.dataset.id,
    );

    todoActionDialog.close();
    todoActionDialog.toggleActionButtonsDisplay();
    todoActionDialog.toggleFormDisplay();
  }),
];

export { clickActions, submitActions };
