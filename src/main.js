import {getRandomInteger} from "./utils";
import getFilterTemplate from './make-filter';
import getTask from "./get-task";
import Task from './task';
import TaskEdit from './task-edit';

const filters = [
  {
    label: `ALL`,
    id: `filter__all`,
    status: `checked`,
    count: 15
  },
  {
    label: `OVERDUE`,
    id: `filter__overdue`,
    status: `disabled`,
    count: 0
  },
  {
    label: `TODAY`,
    id: `filter__today`,
    status: `disabled`,
    count: 0
  },
  {
    label: `FAVORITES`,
    id: `filter__favorites`,
    status: ``,
    count: 7
  },
  {
    label: `Repeating`,
    id: `filter__repeating`,
    status: ``,
    count: 2
  },
  {
    label: `Tags`,
    id: `filter__tags`,
    status: ``,
    count: 6
  },
  {
    label: `ARCHIVE`,
    id: `filter__archive`,
    status: ``,
    count: 115
  }
];

// Функция возвращает шаблон, содержащий все фильтры

const getMainFilterHTML = (arr) => arr.reduce((str, item) => str + getFilterTemplate(item), ``);

const filtersContainer = document.querySelector(`.main__filter`);
filtersContainer.insertAdjacentHTML(`beforeend`, getMainFilterHTML(filters));

// Функция возвращает массив с требуемым количеством задач [Task, TaskEdit]

const getTasksArray = (container, count = 7) => Array.from({length: count}, getTask)
  .map((element) => {
    const task = new Task(element);
    const taskEdit = new TaskEdit(element);
    task.onEdit = () => {
      taskEdit.render();
      container.replaceChild(taskEdit.element, task.element);
      task.unrender();
    };
    taskEdit.onSubmit = () => {
      task.render();
      container.replaceChild(task.element, taskEdit.element);
      taskEdit.unrender();
    };
    return [task, taskEdit];
  });

const renderTasks = (tasks, container) => tasks.forEach((task) => container.appendChild(task[0].render()));

const unrenderTasks = (tasks, container) => tasks.forEach((task) => task.forEach((item) => {
  if (item.element) {
    container.removeChild(item.element);
    item.unrender();
  }
}));

const tasksContainer = document.querySelector(`.board__tasks`);
let tasks = getTasksArray(tasksContainer);
renderTasks(tasks, tasksContainer);

// Повесим обработчики на все фильтры

const filterElements = filtersContainer.querySelectorAll(`.filter__input`);

filterElements.forEach((element) => element.addEventListener(`click`, () => {
  unrenderTasks(tasks, tasksContainer);
  tasks = getTasksArray(tasksContainer, getRandomInteger(1, 20));
  renderTasks(tasks, tasksContainer);
}));
