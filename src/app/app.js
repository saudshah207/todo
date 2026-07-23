import { Todo } from "./Todo.js";

export const app = {
  addTodo(todoData) {
    console.log(todoData);

    Todo.todos.push(
      new Todo(
        todoData.title,
        todoData.description,
        todoData.due,
        todoData.priority,
      ),
    );

    console.log(Todo.todos);
  },
};
