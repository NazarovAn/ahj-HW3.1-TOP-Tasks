import Task from './Task';

export default class List {
  constructor() {
    this.container = document.getElementById('container');
    this.input = document.getElementById('task-input');
    this.allTasksBox = document.querySelector('.all-tasks');
    this.pinnedBox = document.querySelector('.pinned-container');
    this.allTasks = [];
    this.pinned = [];
  }

  init() {
    this.addListners();
  }

  drawTasks(tasks = this.allTasks) {
    this.allTasksBox.innerHTML = '';
    this.pinnedBox.innerHTML = '';
    tasks.forEach((item) => {
      if (!item.pinned) {
        this.allTasksBox.insertAdjacentElement('beforeend', item.getTaskElement());
        return;
      }
      this.pinnedBox.insertAdjacentElement('beforeend', item.getTaskElement());
    });
    this.checkPinedTasks();
    this.checkAllTasks();
  }

  checkPinedTasks() {
    if (this.pinned.length === 0) {
      this.pinnedBox.innerHTML = `
      <div class="task">
        <span>No pinned tasks</span>
      </div>`;
      return;
    }

    const pinnedCheckbox = this.pinnedBox.querySelectorAll('.task-checkbox');
    pinnedCheckbox.forEach((item) => {
      const checkbox = item;
      checkbox.checked = true;
    });
  }

  checkAllTasks() {
    const tasks = this.allTasksBox.querySelectorAll('.task');
    if (tasks.length === 0) {
      this.allTasksBox.innerHTML = `
      <div class="task">
        <span>No tasks found</span>
      </div>`;
    }
  }

  addNewTask(text) {
    const newTask = new Task(text);
    this.allTasks.push(newTask);
    this.input.value = '';
  }

  inputError() {
    this.input.style.outline = 'red solid 2px';
    setTimeout(() => {
      this.input.style.outline = null;
    }, 2000);
  }

  checkInput() {
    if (this.input.value === '') {
      this.inputError();
      return;
    }
    this.addNewTask(this.input.value);
    this.drawTasks();
  }

  addListners() {
    this.container.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.checkInput();
        return;
      }
      this.filterTasks(this.input.value);
    });

    this.allTasksBox.addEventListener('click', (event) => {
      if (event.target.pinned === '') {
        return;
      }
      this.pinTask(event.target);
    });

    this.pinnedBox.addEventListener('click', (event) => {
      if (event.target.pinned === '') {
        return;
      }
      this.unpinTask(event.target);
    });
  }

  pinTask(task) {
    const { id } = task;
    const pinned = this.allTasks.find((item) => item.id === id);
    if (pinned === undefined) {
      return;
    }
    pinned.pinned = true;
    this.pinned.push(pinned);
    this.filterTasks(this.input.value);
  }

  unpinTask(task) {
    const { id } = task;
    const pinned = this.allTasks.find((item) => item.id === id);
    if (pinned === undefined) {
      return;
    }
    this.pinned = this.pinned.filter((item) => item.id !== id);
    pinned.pinned = false;
    this.filterTasks(this.input.value);
  }

  filterTasks(text) {
    const filter = text.toLowerCase();
    const filteredTasks = this.allTasks.filter((item) => item.taskText.includes(filter));
    this.pinned.forEach((item) => {
      if (filteredTasks.includes(item)) {
        return;
      }
      filteredTasks.push(item);
    });

    this.drawTasks(filteredTasks);
  }
}
