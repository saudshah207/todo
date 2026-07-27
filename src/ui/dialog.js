import { checkItem } from "./checkItem.js";
import { getFormattedDateString } from "./date.js";

const selectors = {
  dialog: ".dialog",
  checkItemsList: "[data-ui='check-items']",
  checkListItem: "[name='checkItem']",
  checkItemCheckBox: "[name='isChecked']",
  addTodoDialog: "[data-ui='add-todo-dialog']",
  editTodoDialog: "[data-ui='edit-todo-dialog']",
  editTodoForm: "[data-ui='edit-todo-form']",
  editTodoDialogTitle: "#edit-title",
  editTodoDialogDescription: "#edit-description",
  editTodoDialogDueDate: "#edit-dueDate",
  editTodoDialogPriority: "#edit-priority",
  addProjectDialog: "[data-ui='add-project-dialog']",
  todoActionDialog: "[data-ui='todo-action-dialog']",
};

class Dialog {
  #dialog;

  constructor(element) {
    this.#dialog = element;
  }

  get dialog() {
    return this.#dialog;
  }

  display() {
    this.#dialog.dataset.state = "open";
    this.#dialog.inert = false;
  }

  close() {
    this.#dialog.dataset.state = "closed";
    this.#dialog.inert = true;
  }

  static #close(dialog) {
    dialog.dataset.state = "closed";
    dialog.inert = true;
  }

  static closeDialog(closeButton) {
    const dialog = closeButton.closest(selectors.dialog);

    Dialog.#close(dialog);
  }
}

const canBePopulatedWithTodoData = {
  addElementsToBePopulated(elementIdentifiers) {
    for (const identifier of elementIdentifiers) {
      const [name, selector] = Object.entries(identifier)[0];

      this[name] = this.dialog
        ? this.dialog.querySelector(selector)
        : document.querySelector(selector);
    }

    return this;
  },

  populate(todo) {
    this.form.dataset.id = todo.id;
    this.title.value = todo.title;
    this.description.value = todo.description;
    this.dueDate.value = getFormattedDateString(todo.dueDate);
    this.priority.value = todo.priority ? todo.priority : "";

    this.checkItemsList.replaceChildren();

    for (const checkListItem of todo.checklist) {
      const checkItemElement = checkItem.add(this.checkItemsList);

      checkItemElement.querySelector(selectors.checkListItem).value =
        checkListItem.label;
      checkItemElement.querySelector(selectors.checkItemCheckBox).checked =
        checkListItem.isChecked;
    }
  },
};

const addTodoDialog = new Dialog(
    document.querySelector(selectors.addTodoDialog),
  ),
  editTodoDialog = Object.assign(
    new Dialog(document.querySelector(selectors.editTodoDialog)),
    canBePopulatedWithTodoData,
  );

editTodoDialog.addElementsToBePopulated([
  { form: selectors.editTodoForm },
  { title: selectors.editTodoDialogTitle },
  { description: selectors.editTodoDialogDescription },
  { dueDate: selectors.editTodoDialogDueDate },
  { priority: selectors.editTodoDialogPriority },
  { checkItemsList: selectors.checkItemsList },
]);

const addProjectDialog = new Dialog(
  document.querySelector(selectors.addProjectDialog),
);

const needsToHaveTodoIdAttached = {
  attachTodoId(id) {
    this.dialog.dataset.id = id;
  },
};

const todoActionDialog = Object.assign(
  new Dialog(document.querySelector(selectors.todoActionDialog)),
  needsToHaveTodoIdAttached,
);

export {
  addTodoDialog,
  editTodoDialog,
  addProjectDialog,
  todoActionDialog,
  Dialog,
};
