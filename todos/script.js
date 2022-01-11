const input = document.getElementById("input"),
    todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form = document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoElement = document.createElement("li");
        if (todo && todo.completed) {
            todoElement.classList.add("completed");
        }

        todoElement.innerText = todoText;

        todoElement.addEventListener("click", () => {
            todoElement.classList.toggle("completed");
            updateLS();
        });

        todoElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoElement.remove();
            updateLS();
        });

        document.getElementById("todos").appendChild(todoElement);

        input.value = "";
        updateLS();
    }
}

function updateLS() {
    const todoElement = document.querySelectorAll("li"),
        todos = [];

    todoElement.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
