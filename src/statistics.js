import Component from './component';
import flatpickr from 'flatpickr';
import moment from 'moment';
import getChart from './get-chart';

export default class Statistics extends Component {
  constructor(data) {
    super();
    this._dateBegin = data.dateBegin;
    this._dateEnd = data.dateEnd;
    this._data = {
      tags: data.tags,
      colors: data.colors
    };
    this._count = data.count;

    this._onPeriodChange = null;
    this._periodElement = null;
    this._tagsCtx = null;
    this._colorsCtx = null;
  }

  _onPeriodInputChange(dateBegin, dateEnd) {
    if (typeof this._onPeriodChange === `function`) {
      this._onPeriodChange(dateBegin, dateEnd);
    }
  }

  set onPeriodChange(fn) {
    this._onPeriodChange = fn;
  }

  get template() {
    return `<div><div class="statistic__line">
          <div class="statistic__period">
            <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

            <div class="statistic-input-wrap">
              <input
                class="statistic__period-input"
                type="text"
                placeholder="01 Feb - 08 Feb"
              />
            </div>

            <p class="statistic__period-result">
              In total for the specified period
              <span class="statistic__task-found">0</span> tasks were fulfilled.
            </p>
          </div>
          <div class="statistic__line-graphic visually-hidden">
            <canvas class="statistic__days" width="550" height="150"></canvas>
          </div>
        </div>
        
        <div class="statistic__circle">
          <div class="statistic__tags-wrap">
            <canvas class="statistic__tags" width="400" height="300"></canvas>
          </div>
          <div class="statistic__colors-wrap">
            <canvas class="statistic__colors" width="400" height="300"></canvas>
          </div>
        </div></div>`;
  }

  bind() {
    this._periodElement = this._element.querySelector(`.statistic__period-input`);
    this._periodFlatpickr = flatpickr(this._periodElement,
        {
          mode: `range`,
          enableTime: false,
          altInput: true,
          altFormat: `d M`,
          dateFormat: `d M`,
          defaultDate: [moment(this._dateBegin).format(`DD MMM`), moment(this._dateEnd).format(`DD MMM`)],
          onClose: (dates) =>
            this._onPeriodInputChange(+moment(dates[0], `DD MMM`).startOf(`day`), +moment(dates[1], `DD MMM`).endOf(`day`))
        });

    this._tagsCtx = this._element.querySelector(`.statistic__tags`);
    this._tagsChart = getChart(this._tagsCtx, this._data.tags);

    this._colorsCtx = this._element.querySelector(`.statistic__colors`);
    this._colorsChart = getChart(this._colorsCtx, this._data.colors);

    this._counterElement = this._element.querySelector(`.statistic__task-found`);
    this._counterElement.innerText = this._count;
  }

  unbind() {
    this._periodFlatpickr.destroy();
    this._periodElement = null;
    this._tagsCtx = null;
    this._colorsCtx = null;
  }

  update(data) {
    this._dateBegin = data.dateBegin;
    this._dateEnd = data.dateEnd;
    this._data = {
      tags: data.tags,
      colors: data.colors
    };
    this._count = data.count;
    this._tagsChart.data = this._data.tags.data;
    this._tagsChart.update();

    this._colorsChart.data = this._data.colors.data;
    this._colorsChart.update();
    this._counterElement.innerText = this._count;
  }
}
