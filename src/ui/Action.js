export class Action {
  #name;
  perform;

  constructor(name, behavior) {
    this.#name = name;
    this.perform = behavior;
  }

  get name() {
    return this.#name;
  }
}
