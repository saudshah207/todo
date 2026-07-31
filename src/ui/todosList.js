const selectors = {
  todosList: ".todos",
};

const todosList = document.querySelector(selectors.todosList);

function getTodoElement(todo) {
  const listItem = document.createElement("li"),
    markDoneCheckbox = document.createElement("input"),
    title = document.createElement("h3"),
    priority = document.createElement("span"),
    dueDate = document.createElement("span"),
    actionButton = document.createElement("button");

  const listItemCssClasses = [
    "todo",
    "flex",
    "flex-wrap",
    "standard-gap",
    "standard-padding",
    "align-items-center",
  ];

  if (todo.isDone) {
    listItemCssClasses.push("done");
    markDoneCheckbox.checked = true;
  }

  listItem.dataset.todoId = todo.id;
  listItem.classList.add(...listItemCssClasses);
  title.classList.add("todo-title");
  priority.classList.add("priority");
  dueDate.classList.add("margin-left-auto");
  actionButton.classList.add("button", "light-button");

  listItem.dataset.ui = "todo";
  listItem.dataset.action = "display-edit-todo-dialog";
  title.textContent = todo.title;
  markDoneCheckbox.type = "checkbox";
  markDoneCheckbox.dataset.action = "mark-todo-done";
  if (todo.priority) {
    priority.textContent = todo.priority;
    priority.classList.add(todo.priority);
  }
  dueDate.textContent = todo.dueDate?.toLocaleDateString();
  actionButton.dataset.action = "display-todo-action-dialog";
  actionButton.textContent = "Action";

  listItem.append(markDoneCheckbox, title, priority, dueDate, actionButton);

  return listItem;
}

const todo = {
  toggleDone(todoItem) {
    todoItem.classList.toggle("done");
  },

  display(todo) {
    todosList.append(getTodoElement(todo));
  },

  remove(todoId) {
    todosList.querySelector(`[data-todo-id='${todoId}']`).remove();
  },

  displayTodos(todos) {
    todosList.replaceChildren();

    for (const todo of todos) {
      this.display(todo);
    }
  },

  isEmpty() {
    return todosList.childElementCount === 0;
  },
};

export { todo as todosList };
