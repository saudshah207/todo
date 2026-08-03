const selectors = {
  projectsList: "[data-ui='projects']",
};

function getNoProjectsMessageElement() {
  const message =
      "Seems like there aren't any projects this todo can be moved to. Try creating a new project first.",
    element = document.createElement("p");

  element.textContent = message;

  return element;
}

const projectsList = document.querySelector(selectors.projectsList),
  noProjectsElement = getNoProjectsMessageElement();

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

  projectButton.dataset.projectId = project.id;
  projectButton.dataset.action = "display-project-todos";
  title.textContent = project.title;

  projectButton.append(title);

  listItem.append(projectButton);

  return listItem;
}

function getProjectOptionElement(project) {
  const listItem = document.createElement("li"),
    label = document.createElement("label"),
    radioInput = document.createElement("input");

  label.classList.add("flex", "align-items-center");
  radioInput.classList.add("flex", "align-items-center");

  radioInput.type = "radio";
  radioInput.name = "project";
  radioInput.value = project.id;

  label.append(radioInput);
  label.append(project.title);
  listItem.append(label);

  return listItem;
}

const project = {
  display(project, list = null, isOptionElementNeeded = false) {
    const elementToDisplay = !isOptionElementNeeded
      ? getProjectElement(project)
      : getProjectOptionElement(project);

    if (!list) list = projectsList;

    list.classList.remove("display-none");
    list.append(elementToDisplay);
  },

  remove(projectId) {
    projectsList
      .querySelector(`[data-project-id='${projectId}']`)
      .parentElement.remove();
  },

  displayProjects(
    projects,
    alternativeList = null,
    areOptionElementsNeeded = false,
  ) {
    const list = !alternativeList ? projectsList : alternativeList;

    list.replaceChildren();

    for (const project of projects) {
      this.display(project, list, areOptionElementsNeeded);
    }
  },

  displayNoProjectsMessage(alternativeList = null) {
    const list = !alternativeList ? projectsList : alternativeList;

    list.append(noProjectsElement);
  },

  isEmpty() {
    return projectsList.childElementCount === 0;
  },

  hide() {
    projectsList.classList.add("display-none");
  },
};

export { project as projectsList };
