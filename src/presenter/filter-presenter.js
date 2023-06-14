import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/list-filter-view.js';
import {Filter} from '../utils/filter.js';
import {UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tripEventsModel = null;
  #isLoading = null;
  #filterComponent = null;

  constructor({filterContainer, filterModel, tripEventsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripEventsModel = tripEventsModel;
    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#tripEventsModel.points;
    return Object.entries(Filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        hasPoints: filterPoints(points) ?? [],
      }),
    );
  }

  init({isLoading}) {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#isLoading = isLoading;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init({isLoading: this.#isLoading});
  };

  #handleFilterTypeChange = (filterType) => {
    if (!this.#isLoading) {
      if (this.#filterModel.filter === filterType) {
        return;
      }

      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };
}
