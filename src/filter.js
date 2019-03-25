import Component from './component';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._label = data.label;
    this._count = null;

    this._onFilter = null;

    this._state = {
      isChecked: data.isChecked
    };

    this._onFilterClickBound = this._onFilterClick.bind(this);
  }
  _onFilterClick() {
    return typeof this._onFilter === `function` && this._onFilter();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `<div>
                <input type="radio" id="filter__${this._label.toLowerCase()}" class="filter__input visually-hidden" name="filter"${this._state.isChecked ? `checked` : ``}/>
                <label for="filter__${this._label.toLowerCase()}" class="filter__label"> ${this._label} <span class="filter__all-count">${this._count ? this._count : ``}</span></label>
           </div>`;
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClickBound);
  }
}
