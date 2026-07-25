import { addCheckItem } from "./display.js";

const selectors = {
  dialog: ".dialog",
  checkListItem: "[name='checkItem']",
  checkItemCheckBox: "[name='isChecked']",
  addTodoDialog: "[data-ui='add-todo-dialog']",
  editTodoDialog: "[data-ui='edit-todo-dialog']",
  editTodoDialogCheckItems: "[data-ui='check-items']",
  editTodoDialogTitle: "#title",
  editTodoDialogDescription: "#description",
  editTodoDialogDueDate: "#dueDate",
  editTodoDialogPriority: "#priority",
};

const addTodoDialog = document.querySelector(selectors.addTodoDialog);

const editTodoDialog = getEditTodoDialog([
  { dialog: selectors.editTodoDialog },
  { checkItemsList: selectors.editTodoDialogCheckItems },
  { title: selectors.editTodoDialogTitle },
  { description: selectors.editTodoDialogDescription },
  { dueDate: selectors.editTodoDialogDueDate },
  { priority: selectors.editTodoDialogPriority },
]);

function getEditTodoDialog(elementIdentifiers) {
  const editTodoDialog = {};

  let dialog;

  for (const identifier of elementIdentifiers) {
    const [name, selector] = Object.entries(identifier)[0];

    editTodoDialog[name] = dialog
      ? dialog.querySelector(selector)
      : document.querySelector(selector);

    if (name === "dialog") dialog = editTodoDialog[name];
  }

  return editTodoDialog;
}

function display(dialog) {
  dialog.dataset.state = "open";
  dialog.inert = false;
}

function close(dialog) {
  dialog.dataset.state = "closed";
  dialog.inert = true;
}

function displayAddTodoDialog() {
  display(addTodoDialog);
}

function closeAddTodoDialog() {
  close(addTodoDialog);
}

function displayEditTodoDialog() {
  display(editTodoDialog.dialog);
}

function closeEditTodoDialog() {
  close(editTodoDialog.dialog);
}

function closeDialog(closeButton) {
  const dialog = closeButton.closest(selectors.dialog);

  close(dialog);
}

function insertEditTodoData(todo) {
  editTodoDialog.title.value = todo.title;
  editTodoDialog.description.value = todo.description;
  editTodoDialog.dueDate.value = todo.dueDate?.toLocaleDateString();
  editTodoDialog.priority.value = todo.priority ? todo.priority : "";

  editTodoDialog.checkItemsList.replaceChildren();

  for (const checkItem of todo.checklist) {
    const checkItemElement = addCheckItem(editTodoDialog.checkItemsList);

    checkItemElement.querySelector(selectors.checkListItem).value =
      checkItem.label;
    checkItemElement.querySelector(selectors.checkItemCheckBox).checked =
      checkItem.isChecked;
  }
}

export {
  displayAddTodoDialog,
  closeAddTodoDialog,
  displayEditTodoDialog,
  closeEditTodoDialog,
  closeDialog,
  insertEditTodoData,
};
