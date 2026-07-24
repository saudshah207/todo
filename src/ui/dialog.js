const selectors = {
  dialog: ".dialog",
  addTodoDialog: "[data-ui='add-todo-dialog']",
};

const addTodoDialog = document.querySelector(selectors.addTodoDialog);

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

function closeDialog(closeButton) {
  const dialog = closeButton.closest(selectors.dialog);

  close(dialog);
}

export { displayAddTodoDialog, closeAddTodoDialog, closeDialog };
