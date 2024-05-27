let tasks = [];
let completedTasks = [];
let deletedTasks = [];
let editedTasks = [];

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

  window.location.reload();
}

function completeTask(id) {
  let completedTasks = JSON.parse(localStorage.getItem("completed_tasks"));
  if (!completedTasks) {
    completedTasks = [];
  }

  let task;
  for (const t of tasks) {
    if (t.id == id) {
      task = t;
    }
  }

  if (!task) {
    alert("An error occured!");
    return;
  }

  const currentDate = new Date().toISOString().split("T")[0];
  task.completionDate = currentDate;

  completedTasks.push(task);
  localStorage.setItem("completed_tasks", JSON.stringify(completedTasks));

  // remove tasks
  const newTasks = [];
  for (const oldTask of tasks) {
    if (oldTask.id == id) {
      continue;
    }

    newTasks.push(oldTask);
  }

  localStorage.setItem("tasks", JSON.stringify(newTasks));
  window.location.reload();
}

function deleteTask(id) {
  let deletedTasks = JSON.parse(localStorage.getItem("deleted_tasks"));
  if (!deletedTasks) {
    deletedTasks = [];
  }

  let task;
  for (const t of tasks) {
    if (t.id == id) {
      task = t;
    }
  }

  if (!task) {
    alert("An error occured!");
    return;
  }

  deletedTasks.push(task);
  localStorage.setItem("deleted_tasks", JSON.stringify(deletedTasks));

  // remove tasks
  const newTasks = [];
  for (const oldTask of tasks) {
    if (oldTask.id == id) {
      continue;
    }

    newTasks.push(oldTask);
  }

  localStorage.setItem("tasks", JSON.stringify(newTasks));
  window.location.reload();
}

// function editTask(id) {
//   const newDate = prompt("Enter new deadline (YYYY-MM-DD):");
//   if (newDate === null || newDate === "") return;

//   let editedTasks = JSON.parse(localStorage.getItem("edited_tasks"));
//   if (!editedTasks) {
//     editedTasks = [];
//   }

//   let task;
//   for (const t of tasks) {
//     if (t.id == id) {
//       task = t;
//     }
//   }

//   if (!task) {
//     alert("An error occured!");
//     return;
//   }

//   const originalTask = { ...task };
//   task.date = newDate;
//   editedTasks.push({
//     ...task,
//     originalTask: originalTask.name,
//     originalDate: originalTask.date,
//     newDate: newDate,
//   });

//   localStorage.setItem("edited_tasks", JSON.stringify(editedTasks));
//   window.location.reload();
// }

function renderTasks() {
  if (tasks.length <= 0) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (!tasks) {
    tasks = [];
    return;
  }

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

function renderCompletedTasks() {
  if (completedTasks.length <= 0) {
    completedTasks = JSON.parse(localStorage.getItem("completed_tasks"));
  }

  const completedTaskList = document.getElementById("completedTaskList");
  completedTaskList.innerHTML = "";

  completedTasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.date}</td>
            <td>${task.completionDate}</td>
        `;
    completedTaskList.appendChild(row);
  });
}

function renderDeletedTasks() {
  if (deletedTasks.length <= 0) {
    deletedTasks = JSON.parse(localStorage.getItem("deleted_tasks"));
  }

  const deletedTaskList = document.getElementById("deletedTaskList");
  deletedTaskList.innerHTML = "";

  deletedTasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.date}</td>
    `;
    deletedTaskList.appendChild(row);
  });
}

// function renderEditedTasks() {
//   if (editedTasks.length <= 0) {
//     editedTasks = JSON.parse(localStorage.getItem("edited_tasks"));
//   }

//   const editedTaskList = document.getElementById("editedTaskList");
//   editedTaskList.innerHTML = "";

//   editedTasks.forEach((task) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//             <td>${task.originalTask}</td>
//             <td>${task.originalDate}</td>
//             <td>${task.newDate}</td>
//         `;
//     editedTaskList.appendChild(row);
//   });
// }

function renderAllTasks() {
  renderTasks();
  renderCompletedTasks();
  renderDeletedTasks();
  // renderEditedTasks();
}
renderAllTasks();