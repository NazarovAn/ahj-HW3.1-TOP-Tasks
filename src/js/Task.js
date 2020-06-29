import getRandomID from './utils';

export default class Task {
  constructor(text) {
    this.taskText = text;
    this.id = getRandomID();
    this.pinned = false;
    this.element = this.getTaskElement();
  }

  getTaskElement() {
    const element = document.createElement('div');
    element.className = 'task';
    element.innerHTML = `
        <input type="checkbox" id="${this.id}" class="task-checkbox">
        <label for="${this.id}" class="task-label"><span class="task-text">${this.taskText}</span></label>`;
    return element;
  }
}
