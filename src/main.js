import getFilterTemplate from './make-filter';
import getTaskTemplate from './make-task';

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

// Функция возвращает шаблон с нужным количеством задач

const getBoardTasksContent = (count = 7) => {
  let result = ``;
  while (count--) {
    result += getTaskTemplate();
  }
  return result;
};

const boardElement = document.querySelector(`.board__tasks`);
boardElement.insertAdjacentHTML(`beforeend`, getBoardTasksContent());

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

// Повесим обработчики на все фильтры

const filterElements = filtersContainer.querySelectorAll(`.filter__input`);

filterElements.forEach((element) => element.addEventListener(`click`, () => {
  boardElement.innerHTML = ``;
  boardElement.insertAdjacentHTML(`beforeend`, getBoardTasksContent(getRandomInteger(1, 20)));
}));
