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

  static #delegateClickEvent(event) {
    const target = event.target;

    const actionTrigger = target.closest(EventHandler.#selectors.actionTrigger);

    if (!actionTrigger) return;

    switch (actionTrigger.dataset.action) {
      case "display-add-todo-dialog":
        addTodoDialog.display();
        break;
      case "close-dialog":
        Dialog.closeDialog(actionTrigger);
        break;
      case "mark-todo-done":
        const todoItem = actionTrigger.closest(
          EventHandler.#selectors.todoItem,
        );
        app.toggleTodoDone(todoItem.dataset.id);
        todosList.toggleDone(todoItem);
        break;
      case "add-check-item":
        const checkItemsList = actionTrigger.parentElement.querySelector(
          EventHandler.#selectors.checkItems,
        );
        checkItem.add(checkItemsList);
        break;
      case "remove-check-item":
        const checkItemElement = actionTrigger.closest(
          EventHandler.#selectors.checkItem,
        );
        checkItemElement.remove();
        break;
      case "edit-todo":
        const todo = app.getTodo(actionTrigger.dataset.id);
        editTodoDialog.populate(todo);
        editTodoDialog.display();
        break;
      case "display-add-project-dialog":
        addProjectDialog.display();
        break;
      case "display-project-todos":
        const project = app.getProject(actionTrigger.dataset.id);
        const todos = app.getTodos(project);

        mainPanel.updateTitle(project.title);

        if (todos.length === 0)
          mainPanel.displayMessage("No todos in this project yet.");
        else mainPanel.hideMessage();

        todosList.displayTodos(todos);
        break;
      case "perform-todo-action":
        const todoId = actionTrigger.closest(EventHandler.#selectors.todoItem)
          .dataset.id;
        todoActionDialog.attachTodoId(todoId);
        todoActionDialog.display();
        break;
      case "delete-todo": {
        const todoId = todoActionDialog.dialog.dataset.id;
        app.deleteTodo(todoId);
        todosList.remove(todoId);
        todoActionDialog.close();
        break;
      }
      case "move-todo-to-project":
        todoActionDialog.toggleActionButtonsDisplay();
        todoActionDialog.toggleFormDisplay();

        projectsList.displayProjects(
          app.getProjects(),
          todoActionDialog.form.querySelector("[data-ui='projects']"),
          true,
        );
        break;
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
    document.addEventListener("click", EventHandler.#delegateClickEvent);
    document.addEventListener("submit", EventHandler.#delegateSubmitEvent);
  }
}
