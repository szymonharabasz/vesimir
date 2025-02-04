const todos = ['Send the dog', 'Walk the plants', 'Water the chairs'];

const addTodoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list');

for (const todo of todos) {
    todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener('input', (e) => {
    addTodoButton.disabled = addTodoInput.value.length < 3;
    console.log("", addTodoButton.value, addTodoButton.value.length, addTodoButton.disabled);
});

addTodoInput.addEventListener('keydown', ({key}) => {
    if (key === 'Enter' && addTodoInput.value.length >= 3) {
        addTodo();
    }
});

addTodoButton.addEventListener('click', () => {
    addTodo();
})

function renderTodoInReadMode(todo) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("item-container");
    li.append(div);
    const span = document.createElement("span");
    span.textContent = todo;
    span.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo);
        todosList.replaceChild(renderTodoInEditMode(todo), todosList.childNodes[idx]);

    });
    div.append(span);

    const button = document.createElement("button");
    button.textContent = 'Done';
    button.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        removeTodo(idx);
    });
    div.append(button);
    return li;
}

function renderTodoInEditMode(todo) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.classList.add("item-container");
    li.append(div);
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo;
    div.append(input);
    const divBtns = document.createElement("div");
    div.append(divBtns);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener("click", () => {
        const idx = todos.indexOf(todo);
        updateTodo(idx, input.value);
    });
    saveBtn.classList.add("button-in-row");
    divBtns.append(saveBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
        const idx = todos.indexOf(todo);
        todosList.replaceChild(renderTodoInReadMode(todo), todosList.childNodes[idx]);
    });
    cancelBtn.classList.add("button-cancel");
    divBtns.append(cancelBtn);

    return li;
}


function addTodo() {
    const description = addTodoInput.value;
    todos.push(description);
    const todo = renderTodoInReadMode(description);
    todosList.append(todo);
    addTodoInput.value = "";
    addTodoButton.disabled = true;
}

function removeTodo(index) {
    todos.splice(index, 1);
    todosList.childNodes[index].remove();
}

function updateTodo(index, description) {
    todos[index] = description;
    const todo = renderTodoInReadMode(description);
    todosList.replaceChild(todo, todosList.childNodes[index]);
}