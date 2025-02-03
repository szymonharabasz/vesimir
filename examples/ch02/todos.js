const todos = ['Send the dog', 'Walk the plants', 'Water the chairs'];

const addTodoInput = document.createElementById('todo-input');
const addTodoButton = document.createElementById('add-todo-btn')
const todosList = document.createElementById('todos-list');

for (const todo of todos) {
    todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener('input', (e) => {
    addTodoButton.disabled = addTodoInput.value.length < 3;
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