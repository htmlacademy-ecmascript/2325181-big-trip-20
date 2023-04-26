import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
// import NewPointAdditionView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import { render, RenderPosition } from '../render.js';

const TRIP_POINTS_COUNT = 3;

export default class TripPresenter {

  constructor({tripFilters, tripList}) {
    this.tripFilters = tripFilters;
    this.tripList = tripList;
  }

  init() {
    render(new ListFilterView(), this.tripFilters);
    render(new ListSortView(), this.tripList, RenderPosition.BEFOREBEGIN);
    render(new EditPointView(), this.tripList, RenderPosition.AFTERBEGIN);
    Array.from({length: TRIP_POINTS_COUNT}, () => render(new TripEventsItemView(), this.tripList));
  }
}


