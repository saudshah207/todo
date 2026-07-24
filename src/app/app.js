import { Todo, CheckListItem } from "./Todo.js";

function getCheckListItems(labels) {
  const checkListItems = [];

  for (const label of labels) {
    checkListItems.push(new CheckListItem(label));
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
