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

export default () => ({
  title: titles[Math.floor(Math.random() * titles.length)],
  dueDate: Date.now() - (7 * 24 * 60 * 60 * 1000) + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000, // плюс минус 7 дней от текущей даты

  // Дата и время используются в задачах в определенном формате. Лучше сразу заготовить для них отформатированные значения

  get formattedDate() {
    const date = new Date(this.dueDate);
    return `${date.toLocaleString(`en-US`, {day: `2-digit`})} ${date.toLocaleString(`en-US`, {month: `long`})}`;
  },
  get formattedTime() {
    return `${(new Date(this.dueDate)).toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`})}`;
  },

  hashtags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `JavaScript`,
    `family`,
    `shopping`,
  ]),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  color: colors[Math.floor(Math.random() * colors.length)],

  // При формировании дней повторения сделал перевес (0.8) в сторону false, чтобы иногда формировались задачи без повторений

  repeatingDays: {
    'mo': (((Math.random() - 0.8) > 0) ? true : false),
    'tu': (((Math.random() - 0.8) > 0) ? true : false),
    'we': (((Math.random() - 0.8) > 0) ? true : false),
    'th': (((Math.random() - 0.8) > 0) ? true : false),
    'fr': (((Math.random() - 0.8) > 0) ? true : false),
    'sa': (((Math.random() - 0.8) > 0) ? true : false),
    'su': (((Math.random() - 0.8) > 0) ? true : false),
  },
  isFavorite: (((Math.random() - 0.5) > 0) ? true : false),
  isDone: (((Math.random() - 0.5) > 0) ? true : false)
});
