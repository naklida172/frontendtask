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
