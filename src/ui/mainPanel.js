const selectors = {
  main: "main",
  mainTitle: "[data-ui='main-title']",
  message: "[data-ui='message']",
};

const main = document.querySelector(selectors.main),
  mainTitle = main.querySelector(selectors.mainTitle),
  messageElement = main.querySelector(selectors.message);

const mainPanel = {
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
};

export { mainPanel };
