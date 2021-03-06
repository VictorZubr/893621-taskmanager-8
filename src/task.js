import TaskComponent from './task-component';
import moment from 'moment';

export default class Task extends TaskComponent {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._index = null;
    this._btnEditElement = null;
    this._onEditButtonClickBound = this._onEditButtonClick.bind(this);

    this._state = {
      isDone: data.isDone,
      isFavorite: data.isFavorite,
      isDate: data.isDate,
      isRepeated: this._isRepeated()
    };
    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it);
  }

  _getFormattedDate() {
    return moment(this._dueDate).format(`DD MMMM`);
  }

  _getFormattedTime() {
    return moment(this._dueDate).format(`hh:mm A`);
  }

  _getRepeatingDaysHTML() {
    return Object.keys(this._repeatingDays)
      .map((element) =>`<input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${element}-${this._index}"
                            name="repeat"
                            value="${element}"
                            ${this._repeatingDays[element] ? `checked` : ``}
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

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set index(num) {
    this._index = num;
  }

  get template() {
    return `<article class="card card--${this._color}${this._state.isRepeated ? ` card--repeat` : ``}${(this._state.isDate && this._dueDate < Date.now()) ? ` card--deadline` : ``}">
                <form class="card__form" method="get">
                    <div class="card__inner">
                        <div class="card__control">
                            <button type="button" class="card__btn card__btn--edit">
                                edit
                            </button>
                            <button type="button" class="card__btn card__btn--archive${!this._state.isDone ? ` card__btn--disabled` : ``}">
                                archive
                            </button>
                            <button type="button" class="card__btn card__btn--favorites${!this._state.isFavorite ? ` card__btn--disabled` : ``}">
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
                                    <fieldset class="card__date-deadline"${!this._state.isDate ? ` disabled` : ``}>
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
                                </div>
                                <div class="card__hashtag">
                                    <div class="card__hashtag-list">
                                        ${this._getHashtagsHTML()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </article>`;
  }

  bind() {
    this._btnEditElement = this._element.querySelector(`.card__btn--edit`);
    this._btnEditElement.addEventListener(`click`, this._onEditButtonClickBound);
  }

  unbind() {
    this._btnEditElement.removeEventListener(`click`, this._onEditButtonClickBound);
    this._btnEditElement = null;
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._state.isRepeated = this._isRepeated();
    this._dueDate = data.dueDate;
    this._state.isDate = data.isDate;
  }
}
