import {getRandomInteger, getRandomItems, getTrueOrFalse} from "./utils";

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

const WEEK = 7;

const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
  `Составить отзыв об интенсиве`
];

const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const hashtags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `JavaScript`,
  `family`,
  `shopping`,
];

export default () => ({
  title: titles[getRandomInteger(0, titles.length - 1)],
  dueDate: Date.now() - WEEK * MILLISECONDS_IN_DAY + getRandomInteger(0, 2 * WEEK) * MILLISECONDS_IN_DAY, // плюс минус 7 дней от текущей даты
  tags: new Set(getRandomItems(hashtags, getRandomInteger(0, 3))),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  color: colors[getRandomInteger(0, colors.length - 1)],

  // При формировании дней повторения понизил вероятность (0.2) в сторону false, чтобы иногда формировались задачи без повторений

  repeatingDays: [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`].reduce((acc, element) => {
    acc[element] = getTrueOrFalse(0.2);
    return acc;
  }, {})
});
