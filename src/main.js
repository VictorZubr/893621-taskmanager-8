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

// Функция возвращает массив с требуемым количеством задач

const getTasksArray = (count = 7) => Array.from({length: count}, getTask);

const renderTasks = (tasks, container) => tasks.map((element, index) => {
  const task = new Task(element);
  const taskEdit = new TaskEdit(element);
  taskEdit.index = index;

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
  container.appendChild(task.render());
  return [task, taskEdit];
});

const unrenderTasks = (tasks, container) => tasks.forEach((task) => task.forEach((item) => {
  if (item.element) {
    container.removeChild(item.element);
    item.unrender();
  }
}));

const tasksContainer = document.querySelector(`.board__tasks`);
let tasks = renderTasks(getTasksArray(), tasksContainer);

// Повесим обработчики на все фильтры

const filterElements = filtersContainer.querySelectorAll(`.filter__input`);

filterElements.forEach((element) => element.addEventListener(`click`, () => {
  unrenderTasks(tasks, tasksContainer);
  tasks = renderTasks(getTasksArray(getRandomInteger(1, 20)), tasksContainer);
}));
