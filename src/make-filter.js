export default (filter) =>
  `<input type="radio" id="${filter.id}" class="filter__input visually-hidden" name="filter" ${filter.status}/>
  <label for="${filter.id}" class="filter__label"> ${filter.label} <span class="filter__all-count">${filter.count}</span></label>`;
