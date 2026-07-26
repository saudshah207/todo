const selectors = {
  projectsList: "[data-ui='projects']",
};

const projectsList = document.querySelector(selectors.projectsList);

function getProjectElement(project) {
  const listItem = document.createElement("li"),
    projectButton = document.createElement("button"),
    title = document.createElement("h3");

  const projectButtonCssClasses = [
    "button",
    "light-button",
    "flex",
    "standard-gap",
    "align-items-center",
  ];

  projectButton.classList.add(...projectButtonCssClasses);

  projectButton.dataset.id = project.id;
  projectButton.dataset.action = "display-project-todos";
  title.textContent = project.title;

  projectButton.append(title);

  listItem.append(projectButton);

  return listItem;
}

const project = {
  display(project) {
    projectsList.classList.remove("display-none");

    projectsList.append(getProjectElement(project));
  },
};

export { project as projectsList };
