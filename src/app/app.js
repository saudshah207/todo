import { Todo, CheckListItem } from "./Todo.js";
import { Project } from "./Project.js";
import { storage } from "../data/storage.js";

function getCheckListItems(checkItemsObject) {
  const checkListItems = [];

  for (const [label, isChecked] of Object.entries(checkItemsObject)) {
    checkListItems.push(new CheckListItem(label, isChecked));
  }

  return checkListItems;
}

function getProjectWithTodo(todo) {
  return Project.find((project) => project.has(todo));
}

function deleteTodoFromAnyProject(todo) {
  const projectWithTodo = getProjectWithTodo(todo);

  projectWithTodo?.delete(todo);

  if (projectWithTodo) storage?.updateProject(projectWithTodo);
}

function markCheckItemsChecked(todo) {
  for (const checkListItem of todo.checklist) {
    if (!checkListItem.isChecked) checkListItem.toggle();
  }
}

function updateTodoInStorage(todo) {
  storage?.updateTodo(todo);

  const projectWithTodo = getProjectWithTodo(todo);

  if (projectWithTodo) storage?.updateProject(projectWithTodo);
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

    storage?.saveTodo(todo);

    return todo;
  },

  updateTodo(todoId, todoData) {
    const todo = this.getTodo(todoId);

    todo.title = todoData.title;
    todo.description = todoData.description;
    todo.dueDate = todoData.dueDate;
    todo.priority = todoData.priority;
    todo.checklist = getCheckListItems(todoData.checkItems);

    updateTodoInStorage(todo);

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

    if (todo.isDone) markCheckItemsChecked(todo);

    updateTodoInStorage(todo);
  },

  deleteTodo(todoId) {
    const todo = this.getTodo(todoId);

    Todo.delete(todo);

    deleteTodoFromAnyProject(todo);

    storage?.deleteTodo(todo);
  },

  addProject(title) {
    const project = new Project(title);

    Project.projects.push(project);

    storage?.saveProject(project);

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
    const todo = this.getTodo(todoId);

    deleteTodoFromAnyProject(todo);

    const project = this.getProject(projectId);

    project.add(todo);

    storage?.updateProject(project);
  },

  deleteProject(projectId) {
    const project = this.getProject(projectId);

    Project.delete(project);

    storage?.deleteProject(project);
  },

  updateProject(projectId, title) {
    const project = this.getProject(projectId);

    project.title = title;

    storage?.updateProject(project);
  },

  loadData() {
    const { todos, projects } = storage?.load();

    if (todos) Todo.todos = todos;
    if (projects) Project.projects = projects;

    console.log(Todo.todos, Project.projects);
  },
};
