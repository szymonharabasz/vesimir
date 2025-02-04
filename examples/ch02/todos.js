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

}

function addTodo() {

}