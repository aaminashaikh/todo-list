const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyState = document.querySelector('#emptyState');

let tasks = JSON.parse(localStorage.getItem('taskflow-tasks')) || [];

function saveTasks() {
  localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const item = document.createElement('li');
    item.className = 'task-item';
    if (task.completed) {
      item.classList.add('completed');
    }
    item.innerHTML = `
      <input type="checkbox" aria-label="Mark ${task.text} as complete" ${task.completed ? 'checked' : ''}>
      <span class="task-text"></span>
      <button class="delete-button" type="button" aria-label="Delete ${task.text}">&times;</button>`;
    item.querySelector('.task-text').textContent = task.text;
    item.querySelector('input').addEventListener('change', () => {
      tasks[i].completed = !tasks[i].completed;
      saveTasks();
      renderTasks();
    });
    item.querySelector('.delete-button').addEventListener('click', () => {
      tasks.splice(i, 1);
      saveTasks();
      renderTasks();
    });
    taskList.appendChild(item);
  }

  emptyState.hidden = tasks.length > 0;
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  const newTask = {
    text: text,
    completed: false
  };
  tasks.push(newTask);
  taskInput.value = '';
  saveTasks();
  renderTasks();
});

renderTasks();
