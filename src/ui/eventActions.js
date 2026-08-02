import { app } from "../app/app.js";
import { todosList } from "./todosList.js";
import { projectsList } from "./projectsList.js";
import { checkItem } from "./checkItem.js";
import {
  addTodoDialog,
  editTodoDialog,
  addProjectDialog,
  deleteProjectDialog,
  editProjectDialog,
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

const displayAllProjectsAction = new ClickEventAction(
  "display-all-projects",
  function () {
    projectsList.displayProjects(app.getProjects());
  },
);

const displayAllTodosAction = new ClickEventAction(
  "display-all-todos",
  function () {
    mainPanel.projectId = null;
    mainPanel.hideProjectActionButtons();

    const todos = app.getTodos();

    mainPanel.updateTitle(mainPanel.getDefaultTitle());
    todosList.displayTodos(todos);

    if (todos.length === 0)
      mainPanel.displayMessage(mainPanel.getNoTodosMessage());
    else mainPanel.hideMessage();
  },
);

const clickActions = [
  displayAllTodosAction,
  new ClickEventAction("display-add-todo-dialog", function () {
    addTodoDialog.display();
  }),
  new ClickEventAction("close-dialog", function (actionTrigger) {
    Dialog.closeDialog(actionTrigger);
  }),
  new ClickEventAction("mark-todo-done", function (actionTrigger) {
    const todoItem = actionTrigger.closest(selectors.todoItem);
    app.toggleTodoDone(todoItem.dataset.todoId);
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
    const todo = app.getTodo(actionTrigger.dataset.todoId);
    editTodoDialog.populate(todo);
    editTodoDialog.display();
  }),
  new ClickEventAction("display-add-project-dialog", function () {
    addProjectDialog.display();
  }),
  new ClickEventAction("display-project-todos", function (actionTrigger) {
    mainPanel.projectId = actionTrigger.dataset.projectId;
    mainPanel.displayProjectActionButtons();

    const project = app.getProject(mainPanel.projectId);
    const todos = app.getTodos(project);

    mainPanel.updateTitle(project.title);

    if (todos.length === 0)
      mainPanel.displayMessage(mainPanel.getNoTodosInProjectMessage());
    else mainPanel.hideMessage();

    todosList.displayTodos(todos);
  }),
  new ClickEventAction("display-todo-action-dialog", function (actionTrigger) {
    const todoId = actionTrigger.closest(selectors.todoItem).dataset.todoId;
    todoActionDialog.attachTodoId(todoId);
    todoActionDialog.display();

    if (todoActionDialog.isFormBeingDisplayed()) {
      todoActionDialog.toggleActionButtonsDisplay();
      todoActionDialog.toggleFormDisplay();
    }
  }),
  new ClickEventAction("delete-todo", function () {
    const todoId = todoActionDialog.dialog.dataset.todoId;
    app.deleteTodo(todoId);
    todosList.remove(todoId);
    todoActionDialog.close();

    if (todosList.isEmpty()) {
      const noTodosMessage = mainPanel.projectId
        ? mainPanel.getNoTodosInProjectMessage()
        : mainPanel.getNoTodosMessage();

      mainPanel.displayMessage(noTodosMessage);
    }
  }),
  new ClickEventAction("display-projects-to-move-todo-to", function () {
    todoActionDialog.toggleActionButtonsDisplay();
    todoActionDialog.toggleFormDisplay();

    projectsList.displayProjects(
      app.getProjects(app.getTodo(todoActionDialog.dialog.dataset.todoId)),
      todoActionDialog.form.querySelector(selectors.projectsList),
      true,
    );
  }),
  new ClickEventAction("display-delete-project-dialog", function () {
    deleteProjectDialog.display();
  }),
  new ClickEventAction("display-edit-project-dialog", function () {
    const project = app.getProject(mainPanel.projectId);

    editProjectDialog.populate(project);

    editProjectDialog.display();
  }),
];

const submitActions = [
  new SubmitEventAction("add-todo-form", function (formElements) {
    mainPanel.hideMessage();

    const todo = app.addTodo(getTodoFormValues(formElements));

    if (mainPanel.projectId)
      app.moveTodoToProject(mainPanel.projectId, todo.id);

    todosList.display(todo);

    addTodoDialog.removeCheckListItems();

    addTodoDialog.close();
  }),
  new SubmitEventAction("edit-todo-form", function (formElements, target) {
    const todoId = target.dataset.todoId;

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
    const todoId = todoActionDialog.dialog.dataset.todoId;

    app.moveTodoToProject(formElements.project.value, todoId);

    if (mainPanel.projectId) {
      todosList.remove(todoId);

      if (todosList.isEmpty())
        mainPanel.displayMessage(mainPanel.getNoTodosInProjectMessage());
    }

    todoActionDialog.close();
  }),
  new SubmitEventAction("delete-project-form", function () {
    const projectId = mainPanel.projectId;

    app.deleteProject(projectId);

    projectsList.remove(projectId);

    if (projectsList.isEmpty()) projectsList.hide();

    displayAllTodosAction.perform();

    deleteProjectDialog.close();
  }),
  new SubmitEventAction("edit-project-form", function (formElements) {
    const newTitle = formElements.title.value,
      projectId = mainPanel.projectId,
      project = app.getProject(projectId);

    app.updateProject(projectId, newTitle);

    mainPanel.updateTitle(newTitle);

    projectsList.remove(projectId);

    projectsList.display(project);

    editProjectDialog.close();
  }),
];

export {
  clickActions,
  submitActions,
  displayAllTodosAction,
  displayAllProjectsAction,
};
