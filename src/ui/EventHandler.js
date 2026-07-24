import { app } from "../app/app.js";
import { displayTodo, toggleTodoItemDone } from "./display.js";
import {
  displayAddTodoDialog,
  closeAddTodoDialog,
  closeDialog,
} from "./dialog.js";

class EventHandler {
  static #selectors = {
    addTodoForm: "[data-ui='add-todo-form']",
  };

  static #addTodo(formElements) {
    const [title, description, due, priority] = [
      formElements.title.value,
      formElements.description.value,
      formElements.dueDate.value,
      formElements.priority.value,
    ];

    const todo = app.addTodo({
      title,
      description,
      due,
      priority,
    });

    displayTodo(todo);
  }

  static #delegateClickEvent(event) {
    const target = event.target;

    const actionTrigger = target.closest("[data-action]");

    if (!actionTrigger) return;

    switch (actionTrigger.dataset.action) {
      case "display-add-todo-dialog":
        displayAddTodoDialog();
        break;
      case "close-dialog":
        closeDialog(actionTrigger);
        break;
      case "mark-todo-done":
        const todoItem = actionTrigger.closest(".todo");
        app.toggleTodoDone(todoItem.dataset.id);
        toggleTodoItemDone(todoItem);
        break;
    }
  }

  static #delegateSubmitEvent(event) {
    const target = event.target;

    const isAddTodoForm = target.closest(EventHandler.#selectors.addTodoForm);

    event.preventDefault();

    if (isAddTodoForm) {
      EventHandler.#addTodo(target.elements);
      closeAddTodoDialog();
    }
  }

  static {
    document.addEventListener("click", EventHandler.#delegateClickEvent);
    document.addEventListener("submit", EventHandler.#delegateSubmitEvent);
  }
}
