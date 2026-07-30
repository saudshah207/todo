const selectors = {
  main: "main",
  mainTitle: "[data-ui='main-title']",
  message: "[data-ui='message']",
};

const main = document.querySelector(selectors.main),
  mainTitle = main.querySelector(selectors.mainTitle),
  messageElement = main.querySelector(selectors.message);

const mainPanel = {
  projectId: null,

  updateTitle(title) {
    mainTitle.textContent = title;
  },

  displayMessage(message) {
    messageElement.classList.remove("display-none");

    messageElement.textContent = message;
  },

  hideMessage() {
    messageElement.classList.add("display-none");

    messageElement.textContent = "";
  },

  getNoTodosMessage() {
    return "Seems like you don't have any todos right now.";
  },

  getNoTodosInProjectMessage() {
    return "No todos in this project yet.";
  },

  getDefaultTitle() {
    return "Your Todos";
  },
};

export { mainPanel };
