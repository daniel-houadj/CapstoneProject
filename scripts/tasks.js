document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    try {
        // Fetch tasks from localStorage (defaulting to an empty array if none exists)
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [
            { "name": "Complete project report", "status": "Pending" },
            { "name": "Review codebase", "status": "In Progress" },
            { "name": "Deploy new version", "status": "Completed" }
        ];

        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
            taskItem.innerHTML = `
                ${task.name} - <strong>${task.status}</strong>
                <div>
                    <button class="btn btn-sm btn-warning" onclick="editTask(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
        displayError("Could not load tasks.");
    }
}

function addTask() {
    displayError(" ");
    const taskName = document.getElementById("task-name").value;
    if (!taskName) return displayError("Task name is required!");

    try {
         
        // Get current tasks from localStorage or initialize an empty array
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Add new task to the array
        tasks.push({ name: taskName, status: "Pending" });
        // Save updated tasks back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Reload tasks
        loadTasks();
        // Clear the input field
        document.getElementById("task-name").value = "";
    } catch (error) {
        console.error("Error adding task:", error);
        displayError("Could not add task.");
    }
}

function deleteTask(index) {
    try {
         displayError(" ");
        // Get current tasks from localStorage or initialize an empty array
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Remove the task at the given index
        tasks.splice(index, 1);
        // Save updated tasks back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Reload tasks
        loadTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
        displayError("Could not delete task.");
    }
}

function editTask(index) {
    try {
        displayError(" ");
        // Get current tasks from localStorage or initialize an empty array
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Prompt for the new task name
        const newTaskName = prompt("Edit task name:", tasks[index].name);
        // If the user provided a new name, update the task
        if (newTaskName) {
            tasks[index].name = newTaskName;
            // Save updated tasks back to localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));
            // Reload tasks
            loadTasks();
        }
    } catch (error) {
        console.error("Error editing task:", error);
        displayError("Could not edit task.");
    }
}

function displayError(message) {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
    }
}