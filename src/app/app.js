import { Todo, CheckListItem } from "./Todo.js";
import { Project } from "./Project.js";

function getCheckListItems(checkItemsObject) {
  const checkListItems = [];

  for (const [label, isChecked] of Object.entries(checkItemsObject)) {
    checkListItems.push(new CheckListItem(label, isChecked));
  }

  return checkListItems;
}

function deleteTodoFromAnyProject(todo) {
  const projectWithTodo = app.getProjectWithTodo(todo);

  projectWithTodo?.delete(todo);
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
    const todo = this.getTodo(todoId);

    Todo.delete(todo);

    deleteTodoFromAnyProject(todo);

    console.log(Todo.todos, Project.projects);
  },

  addProject(title) {
    const project = new Project(title);

    Project.projects.push(project);

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

  getProjectWithTodo(todo) {
    return Project.find((project) => project.has(todo));
  },

  moveTodoToProject(projectId, todoId) {
    const todo = this.getTodo(todoId);

    deleteTodoFromAnyProject(todo);

    this.getProject(projectId).add(todo);
  },

  deleteProject(projectId) {
    Project.delete(this.getProject(projectId));
  },
};
