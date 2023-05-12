import AbstractView from '../framework/view/abstract-view.js';

function createFilterElementTemplate({filterElement, isChecked}) {
  const {type, hasPoints} = filterElement;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? 'checked' : ''} ${hasPoints ? '' : 'disabled'}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type.charAt(0).toUpperCase().concat(type.slice(1))}</label>
    </div>`
  );
}

function createListFilterTemplate({filtersList}) {
  const filterElements = filtersList.map((filter, index) => createFilterElementTemplate({filterElement: filter, isChecked: index === 0}))
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
  constructor ({filters}) {
    super();
    this.#filters = filters;

  }

  get template() {
    return createListFilterTemplate({filtersList: this.#filters});
  }
}
