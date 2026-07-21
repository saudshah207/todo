import { Todo, CheckListItem } from "./app/Todo.js";

console.log(new Todo("Sleep"));
console.log(new Todo("Code", null, null, "high"));
console.log(new Todo());
console.log(
  new Todo("Workout", "Why not?", "2026-07-22", "high", [
    new CheckListItem("Pushups"),
    new CheckListItem("Pullup holds"),
    new CheckListItem("Squats"),
  ]),
);
