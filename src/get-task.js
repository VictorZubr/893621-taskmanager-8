import {getRandomInteger, getRandomItems, getTrueOrFalse} from "./utils";

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const WEEK = 7;
const TITLES = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`, `Составить отзыв об интенсиве`];
const HASTAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`, `JavaScript`, `family`, `shopping`];
const WEEK_DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
export default () => ({
  title: TITLES[getRandomInteger(0, TITLES.length - 1)],
  dueDate: Date.now() - WEEK * MILLISECONDS_IN_DAY + getRandomInteger(0, 2 * WEEK) * MILLISECONDS_IN_DAY, // плюс минус 7 дней от текущей даты
  tags: new Set(getRandomItems(HASTAGS, getRandomInteger(0, 3))),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  color: COLORS[getRandomInteger(0, COLORS.length - 1)],

  // При формировании дней повторения понизил вероятность (0.2) в сторону false, чтобы иногда формировались задачи без повторений

  repeatingDays: WEEK_DAYS.reduce((acc, element) => {
    acc[element] = getTrueOrFalse(0.2);
    return acc;
  }, {}),
  isFavorite: getTrueOrFalse(),
  isDone: getTrueOrFalse()
});
