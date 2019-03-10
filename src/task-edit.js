import {COLORS} from "./get-task";
import TaskComponent from './task-component';

export default class TaskEdit extends TaskComponent {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._index = null;
    this._onSubmit = null;
    this._state = {
      isDone: data.isDone,
      isFavorite: data.isFavorite
    };
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set index(num) {
    this._index = num;
  }

  _getFormattedDate() {
    const date = new Date(this._dueDate);
    return `${date.toLocaleString(`en-US`, {day: `2-digit`})} ${date.toLocaleString(`en-US`, {month: `long`})}`;
  }

  _getFormattedTime() {
    return `${(new Date(this._dueDate)).toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`})}`;
  }

  _getRepeatingDaysHTML() {
    return Object.keys(this._repeatingDays)
      .map((element) =>`<input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${element}-${this._index}"
                            name="repeat"
                            value="${element}"
                            ${(this._repeatingDays[element]) ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-${element}-${this._index}">${element}</label>`)
      .join(``);
  }

  _getHashtagsHTML() {
    return [...this._tags]
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
  }

  _getCardColorsWrapHTML(colors) {
    return colors
      .map((element) => `<input
                        type="radio"
                        id="color-${element}-${this._index}"
                        class="card__color-input card__color-input--${element} visually-hidden"
                        name="color"
                        value="${element}"
                        ${(element === this._color) ? `checked` : ``}
                     />
                     <label for="color-${element}-${this._index}" class="card__color card__color--${element}">${element}</label>`)
      .join(``);
  }

  get template() {
    return `<article class="card card--edit card--${this._color}${this._isRepeated() ? ` card--repeat` : ``}">
                <form class="card__form" method="get">
                    <div class="card__inner">
                        <div class="card__control">
                            <button type="button" class="card__btn card__btn--edit">
                                edit
                            </button>
                            <button type="button" class="card__btn card__btn--archive${!this._state.isDone ? `` : ` card__btn--disabled`}">
                                archive
                            </button>
                            <button type="button" class="card__btn card__btn--favorites${this._state.isFavorite ? `` : ` card__btn--disabled`}">
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
                                  ${this._title}
                              </textarea
                              >
                            </label>
                        </div>
                        <div class="card__settings">
                            <div class="card__details">
                                <div class="card__dates">
                                    <button class="card__date-deadline-toggle" type="button">
                                        date: <span class="card__date-status">no</span>
                                    </button>
                                    <fieldset class="card__date-deadline"${!this._dueDate ? ` disabled` : ``}>
                                        <label class="card__input-deadline-wrap">
                                            <input
                                                    class="card__date"
                                                    type="text"
                                                    placeholder="${this._getFormattedDate()}"
                                                    name="date"
                                            />
                                        </label>
                                        <label class="card__input-deadline-wrap">
                                            <input
                                                    class="card__time"
                                                    type="text"
                                                    placeholder="${this._getFormattedTime()}"
                                                    name="time"
                                            />
                                        </label>
                                    </fieldset>
                                    <button class="card__repeat-toggle" type="button">
                                        repeat:<span class="card__repeat-status">${this._isRepeated() ? `yes` : `no`}</span>
                                    </button>
                                    <fieldset class="card__repeat-days${!this._isRepeated() ? ` disabled` : ``}">
                                        <div class="card__repeat-days-inner">
                                            ${this._getRepeatingDaysHTML()}
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="card__hashtag">
                                    <div class="card__hashtag-list">
                                        ${this._getHashtagsHTML()}
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
                                        src="${this._picture}"
                                        alt="task picture"
                                        class="card__img"
                                />
                            </label>
                            <div class="card__colors-inner">
                                <h3 class="card__colors-title">Color</h3>
                                <div class="card__colors-wrap">
                                    ${this._getCardColorsWrapHTML(COLORS)}
                                </div>
                            </div>
                        </div>
                        <div class="card__status-btns">
                            <button class="card__save" type="submit">save</button>
                            <button class="card__delete" type="button">delete</button>
                        </div>
                    </div>
                </form>
            </article>`;
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }
}
