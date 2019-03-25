import getTask from './get-task';
import Filter from './filter';
import renderTasks from './render-tasks';
import renderStatistics from './render-statistics';
import moment from 'moment';

const FILTERS_DATA = [
  {label: `ALL`, isChecked: true,
    filter: (tasks) => tasks},
  {label: `OVERDUE`, isChecked: false,
    filter: (tasks) => tasks.filter((it) => it.isDate && it.dueDate < Date.now())},
  {label: `TODAY`, isChecked: false,
    filter: (tasks) => tasks.filter((it) => it.isDate && +moment(it.dueDate).startOf(`day`) === +moment().startOf(`day`))},
  {label: `FAVORITES`, isChecked: false,
    filter: (tasks) => tasks.filter((it) => it.isFavorite)},
  {label: `Repeating`, isChecked: false,
    filter: (tasks) => tasks.filter((it) => Object.values(it.repeatingDays).some((element) => element))},
  {label: `Tags`, isChecked: false,
    filter: (tasks) => tasks.filter((it) => it.tags.size)},
  {label: `ARCHIVE`, isChecked: false,
    filter: (tasks) => tasks}
];

// Функция возвращает массив с требуемым количеством задач

const getTasksArray = (count = 7) => Array.from({length: count}, getTask);
const initialTasks = getTasksArray();

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const statisticContainer = document.querySelector(`.statistic`);

FILTERS_DATA.forEach((element) => {
  const filter = new Filter(element);
  filter.onFilter = () => renderTasks(element.filter(initialTasks), tasksContainer);
  filtersContainer.appendChild(filter.render());
});

renderTasks(initialTasks, tasksContainer);
renderStatistics(initialTasks, statisticContainer);

const statisticButtonElement = document.querySelector(`#control__statistic`);
const taskButtonElement = document.querySelector(`#control__task`);

const onStatisticClick = () => {
  tasksContainer.classList.add(`visually-hidden`);
  statisticContainer.classList.remove(`visually-hidden`);
};

const onTaskClick = () => {
  statisticContainer.classList.add(`visually-hidden`);
  tasksContainer.classList.remove(`visually-hidden`);
};

statisticButtonElement.addEventListener(`click`, onStatisticClick);
taskButtonElement.addEventListener(`click`, onTaskClick);
