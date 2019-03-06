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

const getTasksArray = (count = 7) => Array.from({length: count}, getTask)
  .map((element) => [new Task(element), new TaskEdit(element)]);

const renderTasks = (tasks, container) => tasks.forEach((task) => {
  container.appendChild(task[0].render());
  task[0].onEdit = () => {
    task[1].render();
    container.replaceChild(task[1].element, task[0].element);
    task[0].unrender();
  };
  task[1].onSubmit = () => {
    task[0].render();
    container.replaceChild(task[0].element, task[1].element);
    task[1].unrender();
  };
});

const unrenderTasks = (tasks, container) => tasks.forEach((element) => element.forEach((el) => {
  if (el.element) {
    container.removeChild(el.element);
    el.unrender();
  }
}));

const tasksContainer = document.querySelector(`.board__tasks`);
let tasks = getTasksArray();
renderTasks(tasks, tasksContainer);

// Повесим обработчики на все фильтры

const filterElements = filtersContainer.querySelectorAll(`.filter__input`);

filterElements.forEach((element) => element.addEventListener(`click`, () => {
  unrenderTasks(tasks, tasksContainer);
  tasks = getTasksArray(getRandomInteger(1, 20));
  renderTasks(tasks, tasksContainer);
}));
