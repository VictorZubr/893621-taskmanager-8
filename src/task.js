import {createElement} from './utils';
import {COLORS} from "./get-task";

export default class Task {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._btnEditElement = null;
    this._onEditButtonClickBound = this._onEditButtonClick.bind(this);

    this._state = {
      isEdit: false,
      isDone: data.isDone,
      isFavorite: data.isFavorite
    };
    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it);
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
                            id="repeat-${element}-2"
                            name="repeat"
                            value="${element}"
                            ${(this._repeatingDays[element]) ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-${element}-2">${element}</label>`)
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
                        id="color-${element}-2"
                        class="card__color-input card__color-input--${element} visually-hidden"
                        name="color"
                        value="${element}"
                        ${(element === this._color) ? `checked` : ``}
                     />
                     <label for="color-${element}-2" class="card__color card__color--${element}">${element}</label>`)
      .join(``);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="card card--${this._color}${this._isRepeated() ? ` card--repeat` : ``}${(this._dueDate < Date.now()) ? ` card--deadline` : ``}">
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
                                    <fieldset class="card__repeat-days"${!this._isRepeated() ? ` disabled` : ``}>
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
    this._btnEditElement = this._element.querySelector(`.card__btn--edit`);
    this._btnEditElement.addEventListener(`click`, this._onEditButtonClickBound);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._btnEditElement.removeEventListener(`click`, this._onEditButtonClickBound);
    this._btnEditElement = null;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
