import { Todo } from "./Todo.js";

export const app = {
  addTodo(todoData) {
    const todo = new Todo(
      todoData.title,
      todoData.description,
      todoData.due,
      todoData.priority,
    );

    Todo.todos.push(todo);

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
