import getTask from './get-task';
import Filter from './filter';
import Task from './task';
import TaskEdit from './task-edit';
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

const renderTasks = (tasks, container) => {
  container.innerHTML = ``;
  tasks
    .filter((it) => !it.isDeleted)
    .forEach((element, index) => {
      const task = new Task(element);
      const taskEdit = new TaskEdit(element);
      task.index = index;
      taskEdit.index = index;

      task.onEdit = () => {
        taskEdit.render();
        container.replaceChild(taskEdit.element, task.element);
        task.unrender();
      };

      taskEdit.onSubmit = (newObject) => {
        Object.assign(element, newObject);
        task.update(element);
        task.render();
        container.replaceChild(task.element, taskEdit.element);
        taskEdit.unrender();
      };

      taskEdit.onDelete = () => {
        container.removeChild(taskEdit.element);
        element.isDeleted = true;
        taskEdit.unrender();
      };

      container.appendChild(task.render());
    });
};

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
let initialTasks = getTasksArray();

FILTERS_DATA.forEach((element) => {
  const filter = new Filter(element);
  filter.onFilter = () => renderTasks(element.filter(initialTasks), tasksContainer);
  filtersContainer.appendChild(filter.render());
});

renderTasks(initialTasks, tasksContainer);
