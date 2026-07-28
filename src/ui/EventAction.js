class EventAction {
  perform;

  constructor(behavior) {
    this.perform = behavior;
  }
}

class ClickEventAction extends EventAction {
  #name;

  constructor(name, behavior) {
    super(behavior);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

class SubmitEventAction extends EventAction {
  #formIdentifier;

  constructor(formIdentifier, behavior) {
    super(behavior);
    this.#formIdentifier = formIdentifier;
  }

  get formIdentifier() {
    return this.#formIdentifier;
  }
}

export { ClickEventAction, SubmitEventAction };
