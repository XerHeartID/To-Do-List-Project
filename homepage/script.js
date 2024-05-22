let tasks = [];

function generateId() {
  const result = Math.floor(Date.now() / 1000);
  console.log(result);
  return result;
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");

  if (taskInput.value === "" || dateInput.value === "") {
    alert("Please enter a task and deadline");
    return;
  }

  const task = {
    id: generateId(),
    name: taskInput.value,
    date: dateInput.value,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  dateInput.value = "";

  renderNewTasks();
}

function renderNewTasks() {
    if (tasks.length < 0) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    console.log(tasks);
    tasks.forEach((task) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.date}</td>
        <td>
        <button class="complete" onclick="completeTask(${task.id})">Complete</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                </td>
        `;

    taskList.appendChild(row);
  });
}

function renderTasks() {
    if (tasks.length <= 0) {
        newTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    console.log(tasks);
    newTasks.forEach((task) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.date}</td>
        <td>
        <button class="complete" onclick="completeTask(${task.id})">Complete</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        </td>
        `;
        
        taskList.appendChild(row);
    });
}
renderTasks();