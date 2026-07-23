import { app } from "../app/app.js";

class EventHandler {
  static #selectors = {
    dialog: ".dialog",
    addTodoDialog: "[data-ui='add-todo-dialog']",
    addTodoForm: "[data-ui='add-todo-form']",
  };

  static #addTodoDialog = document.querySelector(
    EventHandler.#selectors.addTodoDialog,
  );

  static #displayAddTodoDialog() {
    EventHandler.#addTodoDialog.dataset.state = "open";

    EventHandler.#addTodoDialog.inert = false;
  }

  static #closeDialog(closeButton) {
    const dialog = closeButton.closest(EventHandler.#selectors.dialog);

    dialog.dataset.state = "closed";

    dialog.inert = true;
  }

  static #addTodo(formElements) {
    const [title, description, due, priority] = [
      formElements.title.value,
      formElements.description.value,
      formElements.dueDate.value,
      formElements.priority.value,
    ];

    app.addTodo({
      title,
      description,
      due,
      priority,
    });
  }

  static #delegateClickEvent(event) {
    const target = event.target;

    const actionTrigger = target.closest("[data-action]");

    if (!actionTrigger) return;

    switch (actionTrigger.dataset.action) {
      case "display-add-todo-dialog":
        EventHandler.#displayAddTodoDialog();
        break;
      case "close-dialog":
        EventHandler.#closeDialog(actionTrigger);
        break;
    }
  }

  static #delegateSubmitEvent(event) {
    const target = event.target;

    const isAddTodoForm = target.closest(EventHandler.#selectors.addTodoForm);

    event.preventDefault();

    if (isAddTodoForm) EventHandler.#addTodo(target.elements);
  }

  static {
    document.addEventListener("click", EventHandler.#delegateClickEvent);
    document.addEventListener("submit", EventHandler.#delegateSubmitEvent);
  }
}
