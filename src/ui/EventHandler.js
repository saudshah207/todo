import { app } from "../app/app.js";
import { displayTodo, toggleTodoItemDone, addCheckItem } from "./display.js";
import {
  displayAddTodoDialog,
  closeAddTodoDialog,
  displayEditTodoDialog,
  closeEditTodoDialog,
  closeDialog,
  insertEditTodoData,
} from "./dialog.js";

class EventHandler {
  static #selectors = {
    actionTrigger: "[data-action]",
    todoItem: "[data-ui='todo']",
    checkItems: "[data-ui='check-items']",
    checkItem: "[data-ui='check-item']",
    addTodoForm: "[data-ui='add-todo-form']",
  };

  static #addTodo(formElements) {
    console.log(formElements);

    const [title, description, due, priority] = [
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

    const todo = app.addTodo({
      title,
      description,
      due,
      priority,
      checkItems,
    });

    displayTodo(todo);
  }

  static #delegateClickEvent(event) {
    const target = event.target;

    const actionTrigger = target.closest(EventHandler.#selectors.actionTrigger);

    if (!actionTrigger) return;

    switch (actionTrigger.dataset.action) {
      case "display-add-todo-dialog":
        displayAddTodoDialog();
        break;
      case "close-dialog":
        closeDialog(actionTrigger);
        break;
      case "mark-todo-done":
        const todoItem = actionTrigger.closest(
          EventHandler.#selectors.todoItem,
        );
        app.toggleTodoDone(todoItem.dataset.id);
        toggleTodoItemDone(todoItem);
        break;
      case "add-check-item":
        const checkItemsList = actionTrigger.parentElement.querySelector(
          EventHandler.#selectors.checkItems,
        );
        addCheckItem(checkItemsList);
        break;
      case "remove-check-item":
        const checkItem = actionTrigger.closest(
          EventHandler.#selectors.checkItem,
        );
        checkItem.remove();
        break;
      case "edit-todo":
        const todo = app.getTodo(actionTrigger.dataset.id);
        insertEditTodoData(todo);
        displayEditTodoDialog();
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
