import {COLORS} from "./get-task";

const getFormattedDate = (milliseconds) => {
  const date = new Date(milliseconds);
  return `${date.toLocaleString(`en-US`, {day: `2-digit`})} ${date.toLocaleString(`en-US`, {month: `long`})}`;
};

const getFormattedTime = (milliseconds) => `${(new Date(milliseconds)).toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`})}`;

const isTaskRepeat = (days) => Object.keys(days).some((element) => days[element]);

// Функция возвращает шаблон, содержащий все хештеги

const getHashtagsHTML = (tags) =>
  [...tags]
  .map((element) => `<span class="card__hashtag-inner">
                        <input
                                type="hidden"
                                name="hashtag"
                                value="repeat"
                                class="card__hashtag-hidden-input"
                        />
                        <button type="button" class="card__hashtag-name">
                          #${element}
                        </button>
                        <button type="button" class="card__hashtag-delete">
                          delete
                        </button>
                      </span>`)
  .join(``);

// Функция возвращает шаблон всех чекбоксов с лабелом на все дни недели

const getRepeatingDaysHTML = (days) =>
  Object.keys(days)
  .map((element) =>`<input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${element}-2"
                            name="repeat"
                            value="${element}"
                            ${(days[element]) ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-${element}-2">${element}</label>`)
  .join(``);

// Функция возвращает шаблон контейнера для выбора цвета карточки

const getCardColorsWrapHTML = (colors, task) =>
  colors
  .map((element) => `<input
                        type="radio"
                        id="color-${element}-2"
                        class="card__color-input card__color-input--${element} visually-hidden"
                        name="color"
                        value="${element}"
                        ${(element === task.color) ? `checked` : ``}
                     />
                     <label for="color-${element}-2" class="card__color card__color--${element}">${element}</label>`)
  .join(``);

// экспортируем функцию, которая возвращает шаблон одной задачи

export default (task) => `<article class="card card--${task.color}${isTaskRepeat(task.repeatingDays) ? ` card--repeat` : ``}">
                <form class="card__form" method="get">
                    <div class="card__inner">
                        <div class="card__control">
                            <button type="button" class="card__btn card__btn--edit">
                                edit
                            </button>
                            <button type="button" class="card__btn card__btn--archive${!task.isDone ? `` : ` card__btn--disabled`}">
                                archive
                            </button>
                            <button
                                    type="button"
                                    class="card__btn card__btn--favorites${task.isFavorite ? `` : ` card__btn--disabled`}"
                            >
                                favorites
                            </button>
                        </div>
                        <div class="card__color-bar">
                            <svg class="card__color-bar-wave" width="100%" height="10">
                                <use xlink:href="#wave"></use>
                            </svg>
                        </div>
                        <div class="card__textarea-wrap">
                            <label>
                    <textarea
                            class="card__text"
                            placeholder="Start typing your text here..."
                            name="text"
                    >
${task.title}</textarea
                    >
                            </label>
                        </div>
                        <div class="card__settings">
                            <div class="card__details">
                                <div class="card__dates">
                                    <button class="card__date-deadline-toggle" type="button">
                                        date: <span class="card__date-status">no</span>
                                    </button>
                                    <fieldset class="card__date-deadline"${!task.dueDate ? ` disabled` : ``}>
                                        <label class="card__input-deadline-wrap">
                                            <input
                                                    class="card__date"
                                                    type="text"
                                                    placeholder="${getFormattedDate(task.dueDate)}"
                                                    name="date"
                                            />
                                        </label>
                                        <label class="card__input-deadline-wrap">
                                            <input
                                                    class="card__time"
                                                    type="text"
                                                    placeholder="${getFormattedTime(task.dueDate)}"
                                                    name="time"
                                            />
                                        </label>
                                    </fieldset>
                                    <button class="card__repeat-toggle" type="button">
                                        repeat:<span class="card__repeat-status">${isTaskRepeat(task.repeatingDays) ? `yes` : `no`}</span>
                                    </button>
                                    <fieldset class="card__repeat-days" disabled>
                                        <div class="card__repeat-days-inner">
                                            ${getRepeatingDaysHTML(task.repeatingDays)}
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="card__hashtag">
                                    <div class="card__hashtag-list">
                                        ${getHashtagsHTML(task.tags)}
                                    </div>
                                    <label>
                                        <input
                                                type="text"
                                                class="card__hashtag-input"
                                                name="hashtag-input"
                                                placeholder="Type new hashtag here"
                                        />
                                    </label>
                                </div>
                            </div>
                            <label class="card__img-wrap card__img-wrap--empty">
                                <input
                                        type="file"
                                        class="card__img-input visually-hidden"
                                        name="img"
                                />
                                <img
                                        src="${task.picture}"
                                        alt="task picture"
                                        class="card__img"
                                />
                            </label>
                            <div class="card__colors-inner">
                                <h3 class="card__colors-title">Color</h3>
                                <div class="card__colors-wrap">
                                    ${getCardColorsWrapHTML(COLORS, task)}
                            </div>
                        </div>
                        <div class="card__status-btns">
                            <button class="card__save" type="submit">save</button>
                            <button class="card__delete" type="button">delete</button>
                        </div>
                    </div>
                </form>
            </article>`;
