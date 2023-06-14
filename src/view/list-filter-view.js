import AbstractView from '../framework/view/abstract-view.js';
import { ElementsStatus } from '../const.js';

function createFilterElementTemplate(filterElement, actualFilterType) {
  const {type, hasPoints} = filterElement;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === actualFilterType ? ElementsStatus.CHECKED : ''} ${hasPoints.length ? '' : ElementsStatus.DISABLED}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type.charAt(0).toUpperCase().concat(type.slice(1))}</label>
    </div>`
  );
}

function createListFilterTemplate(filtersList, actualFilterType) {
  const filterElements = filtersList.map((filter) => createFilterElementTemplate(filter, actualFilterType))
    .join('');
  return (
    `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filterElements}

          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>`
  );
}

export default class ListFilterView extends AbstractView {
  #filters = [];
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor ({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };


}
