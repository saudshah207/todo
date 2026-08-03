import { app } from "../app/app.js";
import { setMinimumDueDateValues } from "./date.js";
import {
  clickActions,
  submitActions,
  displayAllProjectsAction,
  displayAllTodosAction,
} from "./eventActions.js";

class EventHandler {
  static #selectors = {
    actionTrigger: "[data-action]",
  };

  static #delegateClickEvent(event, actions) {
    const target = event.target;

    const actionTrigger = target.closest(EventHandler.#selectors.actionTrigger);

    if (!actionTrigger) return;

    for (const action of actions) {
      if (action.name === actionTrigger.dataset.action) {
        action.perform(actionTrigger);

        break;
      }
    }
  }

  static #delegateSubmitEvent(event, actions) {
    const target = event.target;

    event.preventDefault();

    const formElements = target.elements;

    for (const action of actions) {
      if (action.formIdentifier === target.dataset.ui) {
        action.perform(formElements, target);

        break;
      }
    }

    target.reset();
  }

  static {
    document.addEventListener("click", (event) =>
      EventHandler.#delegateClickEvent(event, clickActions),
    );

    document.addEventListener("submit", (event) =>
      EventHandler.#delegateSubmitEvent(event, submitActions),
    );

    setMinimumDueDateValues();

    app.loadData();

    displayAllProjectsAction.perform();
    displayAllTodosAction.perform();
  }
}
