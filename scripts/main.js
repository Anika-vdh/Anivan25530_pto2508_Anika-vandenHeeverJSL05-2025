import { initialTasks } from "./initialdata.js";
import { loadTasks, saveTasks } from "./storage.js";

let tasks = loadTasks();

if (!tasks) {
  tasks = initialTasks;
  saveTasks(tasks);
}

function renderTasks() {
  const columns = document.querySelectorAll(".column-div");

  columns.forEach(col => {
    col.querySelector(".tasks-container").innerHTML = "";
  });

  tasks.forEach(task => {
    const container = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`
    );

    const taskEl = document.createElement("div");
    taskEl.classList.add("task-div");
    taskEl.textContent = task.title;

    container.appendChild(taskEl);
  });
}

function updateCounts() {
  const todoCount = tasks.filter(t => t.status === "todo").length;
  const doingCount = tasks.filter(t => t.status === "doing").length;
  const doneCount = tasks.filter(t => t.status === "done").length;

  document.getElementById("toDoText").textContent = `TODO (${todoCount})`;
  document.getElementById("doingText").textContent = `DOING (${doingCount})`;
  document.getElementById("doneText").textContent = `DONE (${doneCount})`;
}

const addBtn = document.getElementById("add-new-task-btn");
const modal = document.querySelector(".modal-overlay");
const cancelBtn = document.getElementById("cancel-add-btn");
const form = document.getElementById("new-task-modal-window");

addBtn.addEventListener("click", () => {
  modal.showModal();
});

cancelBtn.addEventListener("click", () => {
  modal.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title-input").value;
  const description = document.getElementById("desc-input").value;
  const status = document.getElementById("select-status").value;

  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
  };

  tasks.push(newTask);

  saveTasks(tasks);
  renderTasks();
  updateCounts();

  modal.close();
  form.reset();
});

renderTasks();
updateCounts();