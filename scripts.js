document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let taskInput = document.getElementById('new-task');
    let taskText = taskInput.value.trim();
    if (taskText) {
        let task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        saveTask(task);
        taskInput.value = '';
        renderTasks();
    }
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleComplete(id) {
    let tasks = getTasks();
    tasks.forEach(task => {
        if (task.id == id) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function editTask(id) {
    let taskText = prompt('Edit your task:');
    if (taskText !== null && taskText.trim() !== '') {
        let tasks = getTasks();
        tasks.forEach(task => {
            if (task.id == id) {
                task.text = taskText.trim();
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function filterTasks(status) {
    renderTasks(status);
}

function renderTasks(filter = 'all') {
    let tasks = getTasks();
    let taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        if (filter == 'completed' && !task.completed) return;
        if (filter == 'incomplete' && task.completed) return;

        let li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.text}
            <div>
                <button onclick="toggleComplete(${task.id})">Complete</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function loadTasks() {
    console.log("Loading tasks...");
    renderTasks();
}
