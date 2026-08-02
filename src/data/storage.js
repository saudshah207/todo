import { Project } from "../app/Project.js";
import { CheckListItem, Todo } from "../app/Todo.js";

function isStorageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function saveItem(item, key) {
  const itemsInLocalStorage = localStorage.getItem(key);

  const items = itemsInLocalStorage ? JSON.parse(itemsInLocalStorage) : [];

  items.push(item);

  localStorage.setItem(key, JSON.stringify(items));
}

function deleteItem(itemToDelete, key) {
  const items = JSON.parse(localStorage.getItem(key));

  const itemToDeleteIndex = items.findIndex(
    (item) => item.id === itemToDelete.id,
  );

  items.splice(itemToDeleteIndex, 1);

  localStorage.setItem(key, JSON.stringify(items));
}

function updateItem(updatedItem, key) {
  const items = JSON.parse(localStorage.getItem(key));

  const itemToUpdateIndex = items.findIndex(
    (item) => item.id === updatedItem.id,
  );

  items.splice(itemToUpdateIndex, 1, updatedItem);

  localStorage.setItem(key, JSON.stringify(items));
}

function getItems(key, todosCache = null) {
  const items = JSON.parse(localStorage.getItem(key));

  let type;

  if (key === keys.todos) type = Todo;
  else if (key === keys.projects) type = Project;

  if (!items) return items;

  for (let index = 0; index < items.length; index++) {
    let object = items[index];

    if (type === Todo) {
      const checklist = [];

      for (const checkListItem of object.checklist) {
        checklist.push(CheckListItem.fromJSON(checkListItem));
      }

      object.checklist = checklist;
    } else {
      const todos = [];

      for (const todo of object.todos) {
        todos.push(todosCache.find((cachedTodo) => cachedTodo.id === todo.id));
      }

      object.todos = todos;
    }

    object = type.fromJSON(object);

    items[index] = object;
  }

  return items;
}

const keys = { todos: "todos", projects: "projects" };

let storage = null;

if (isStorageAvailable("localStorage")) {
  storage = {
    load() {
      const todos = getItems(keys.todos);

      return {
        todos: todos,
        projects: getItems(keys.projects, todos),
      };
    },

    saveTodo(todo) {
      saveItem(todo, keys.todos);
    },

    saveProject(project) {
      saveItem(project, keys.projects);
    },

    updateTodo(todo) {
      updateItem(todo, keys.todos);
    },

    updateProject(project) {
      updateItem(project, keys.projects);
    },

    deleteTodo(todo) {
      deleteItem(todo, keys.todos);
    },

    deleteProject(project) {
      deleteItem(project, keys.projects);
    },
  };
}

export { storage };
