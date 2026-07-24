import { Todo, CheckListItem } from "./Todo.js";

function getCheckListItems(checkItemsObject) {
  const checkListItems = [];

  for (const [label, isChecked] of Object.entries(checkItemsObject)) {
    checkListItems.push(new CheckListItem(label, isChecked));
  }

  return checkListItems;
}

export const app = {
  addTodo(todoData) {
    const todo = new Todo(
      todoData.title,
      todoData.description,
      todoData.due,
      todoData.priority,
      getCheckListItems(todoData.checkItems),
    );

    Todo.todos.push(todo);

    console.log(Todo.todos);

    return todo;
  },

  getTodos() {
    return Todo.todos;
  },

  toggleTodoDone(todoId) {
    const todo = Todo.find((todo) => todo.id === todoId);

    todo.toggleDone();
  },
};
