const todos = [
  {
    description: "Send the dog",
    done: false,
  },
  {
    description: "Walk the plants",
    done: false,
  },
  {
    description: "Water the chairs",
    done: false,
  },
];

let errors = [];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");
const errorList = document.getElementById("errors-list");

for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener("input", (e) => {
  addTodoButton.disabled = addTodoInput.value.length < 3;
  errors = [];
  renderErrors();
});

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && addTodoInput.value.length >= 3) {
    addTodo();
  }
});

addTodoButton.addEventListener("click", () => {
  addTodo();
});

function renderTodoInReadMode(todo) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("item-container");
  li.append(div);
  const span = document.createElement("span");
  span.textContent = todo.description;
  if (todo.done) {
    span.classList.add("todo-done");
  } else {
    span.addEventListener("dblclick", () => {
      const idx = indexOfTodo(todo);
      todosList.replaceChild(
        renderTodoInEditMode(todo),
        todosList.childNodes[idx]
      );
    });
  }
  div.append(span);

  const button = document.createElement("button");
  button.textContent = "Done";
  if (todo.done) {
    button.classList.add("button-todo-done");
  } else {
    button.addEventListener("click", () => {
      const idx = indexOfTodo(todo);
      todos[idx].done = true;
      todosList.replaceChild(
        renderTodoInReadMode(todo),
        todosList.childNodes[idx]
      );
    });
  }
  div.append(button);
  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("item-container");
  li.append(div);
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.description;
  div.append(input);

  if (!todo.done) {
    const divBtns = document.createElement("div");
    div.append(divBtns);
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => {
      const idx = indexOfTodo(todo);
      updateTodo(idx, input.value);
    });
    saveBtn.classList.add("button-in-row");
    divBtns.append(saveBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
      const idx = indexOfTodo(todo);
      todosList.replaceChild(
        renderTodoInReadMode(todo),
        todosList.childNodes[idx]
      );
    });
    cancelBtn.classList.add("button-cancel");
    divBtns.append(cancelBtn);
  }
  return li;
}

function addTodo() {
  const description = addTodoInput.value;
  const newTodo = {
    description: description,
    done: false,
  };
  console.log(todos);
  console.log(todos.filter((t) => t.description === description && !t.done));
  if (
    todos.filter((t) => t.description === description && !t.done).length === 0
  ) {
    todos.push(newTodo);
    const todo = renderTodoInReadMode(newTodo);
    todosList.append(todo);
    addTodoInput.value = "";
    addTodoButton.disabled = true;
  } else {
    errors.push(
      `"${description}" is already on the TODO list and is not yet done.`
    );
    renderErrors();
  }
}

function updateTodo(index, description) {
  todos[index].description = description;
  const todo = renderTodoInReadMode(todos[index]);
  todosList.replaceChild(todo, todosList.childNodes[index]);
}

function indexOfTodo(todo) {
  return todos.findIndex(
    (t) => t.description === todo.description && t.done === todo.done
  );
}

function renderErrors() {
  errorList.innerHTML = "";
  if (errors.length > 0) {
    for (const error of errors) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = error;
      li.append(span);
      errorList.append(li);
    }
    errorList.classList.remove("errors-list-empty");
  } else {
    errorList.classList.add("errors-list-empty");
  }
}
