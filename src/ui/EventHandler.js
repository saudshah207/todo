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
import { Action } from "./Action.js";

class EventHandler {
  static #selectors = {
    actionTrigger: "[data-action]",
    todoItem: "[data-ui='todo']",
    checkItems: "[data-ui='check-items']",
    checkItem: "[data-ui='check-item']",
  };

  static #getTodoFormValues(formElements) {
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

  static #addTodo(formValues) {
    todosList.display(app.addTodo(formValues));
  }

  static #updateTodo(todoId, formValues) {
    todosList.remove(todoId);

    todosList.display(app.updateTodo(todoId, formValues));
  }

  static #delegateClickEvent(event, actions) {
    const target = event.target;

    const actionTrigger = target.closest(EventHandler.#selectors.actionTrigger);

    if (!actionTrigger) return;

    for (const action of actions) {
      if (action.name === actionTrigger.dataset.action)
        action.perform(actionTrigger);
    }
  }

  static #delegateSubmitEvent(event) {
    const target = event.target;

    event.preventDefault();

    const formElements = target.elements;

    switch (target.dataset.ui) {
      case "add-todo-form":
        EventHandler.#addTodo(EventHandler.#getTodoFormValues(formElements));
        addTodoDialog.close();
        break;
      case "edit-todo-form":
        EventHandler.#updateTodo(
          target.dataset.id,
          EventHandler.#getTodoFormValues(formElements),
        );
        editTodoDialog.close();
        break;
      case "add-project-form":
        const project = app.addProject(formElements.title.value);

        projectsList.display(project);

        addProjectDialog.close();
        break;
      case "move-todo-to-project-form":
        app.moveTodoToProject(
          formElements.project.value,
          todoActionDialog.dialog.dataset.id,
        );

        todoActionDialog.close();
        todoActionDialog.toggleActionButtonsDisplay();
        todoActionDialog.toggleFormDisplay();
        break;
    }
  }

  static {
    const clickActions = [
      new Action("display-add-todo-dialog", function () {
        addTodoDialog.display();
      }),
      new Action("close-dialog", function (actionTrigger) {
        Dialog.closeDialog(actionTrigger);
      }),
      new Action("mark-todo-done", function (actionTrigger) {
        const todoItem = actionTrigger.closest(
          EventHandler.#selectors.todoItem,
        );
        app.toggleTodoDone(todoItem.dataset.id);
        todosList.toggleDone(todoItem);
      }),
      new Action("add-check-item", function (actionTrigger) {
        const checkItemsList = actionTrigger.parentElement.querySelector(
          EventHandler.#selectors.checkItems,
        );
        checkItem.add(checkItemsList);
      }),
      new Action("remove-check-item", function (actionTrigger) {
        const checkItemElement = actionTrigger.closest(
          EventHandler.#selectors.checkItem,
        );
        checkItemElement.remove();
      }),
      new Action("edit-todo", function (actionTrigger) {
        const todo = app.getTodo(actionTrigger.dataset.id);
        editTodoDialog.populate(todo);
        editTodoDialog.display();
      }),
      new Action("display-add-project-dialog", function () {
        addProjectDialog.display();
      }),
      new Action("display-project-todos", function (actionTrigger) {
        const project = app.getProject(actionTrigger.dataset.id);
        const todos = app.getTodos(project);

        mainPanel.updateTitle(project.title);

        if (todos.length === 0)
          mainPanel.displayMessage("No todos in this project yet.");
        else mainPanel.hideMessage();

        todosList.displayTodos(todos);
      }),
      new Action("perform-todo-action", function (actionTrigger) {
        const todoId = actionTrigger.closest(EventHandler.#selectors.todoItem)
          .dataset.id;
        todoActionDialog.attachTodoId(todoId);
        todoActionDialog.display();
      }),
      new Action("delete-todo", function () {
        const todoId = todoActionDialog.dialog.dataset.id;
        app.deleteTodo(todoId);
        todosList.remove(todoId);
        todoActionDialog.close();
      }),
      new Action("move-todo-to-project", function () {
        todoActionDialog.toggleActionButtonsDisplay();
        todoActionDialog.toggleFormDisplay();

        projectsList.displayProjects(
          app.getProjects(),
          todoActionDialog.form.querySelector("[data-ui='projects']"),
          true,
        );
      }),
    ];

    document.addEventListener("click", (event) =>
      EventHandler.#delegateClickEvent(event, clickActions),
    );
    document.addEventListener("submit", EventHandler.#delegateSubmitEvent);
  }
}
