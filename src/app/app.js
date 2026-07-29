import { Todo, CheckListItem } from "./Todo.js";
import { Project } from "./Project.js";

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
      todoData.dueDate,
      todoData.priority,
      getCheckListItems(todoData.checkItems),
    );

    Todo.todos.push(todo);

    return todo;
  },

  updateTodo(todoId, todoData) {
    const todo = this.getTodo(todoId);

    todo.title = todoData.title;
    todo.description = todoData.description;
    todo.dueDate = todoData.dueDate;
    todo.priority = todoData.priority;
    todo.checklist = getCheckListItems(todoData.checkItems);

    return todo;
  },

  getTodos(project = null) {
    if (!project) return Todo.todos;

    return project.todos;
  },

  getTodo(todoId) {
    return Todo.find((todo) => todo.id === todoId);
  },

  toggleTodoDone(todoId) {
    const todo = this.getTodo(todoId);

    todo.toggleDone();
  },

  deleteTodo(todoId) {
    Todo.delete((todo) => todo.id === todoId);

    console.log(Todo.todos);
  },

  addProject(title) {
    const project = new Project(title);

    Project.projects.push(project);

    console.log(Project.projects);

    return project;
  },

  getProject(projectId) {
    return Project.find((project) => project.id === projectId);
  },

  getProjects(todoProjectsShouldNotHave = null) {
    if (!todoProjectsShouldNotHave) return Project.projects;

    const projects = [];

    for (const project of Project.projects) {
      if (!project.has(todoProjectsShouldNotHave)) projects.push(project);
    }

    return projects;
  },

  moveTodoToProject(projectId, todoId) {
    this.getProject(projectId).add(this.getTodo(todoId));
  },
};
