import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
// import PointAdditionView from '../view/point-addition-view.js';
import PointEditionView from '../view/point-edition-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render, RenderPosition } from '../render.js';

const TRIP_POINTS_COUNT = 3;

export default class TripPresenter {

  tripList = new TripEventsListView();

  constructor({tripFilters, tripEvents}) {
    this.tripFilters = tripFilters;
    this.tripEvents = tripEvents;
  }

  init() {
    render(new ListFilterView(), this.tripFilters);
    render(this.tripList, this.tripEvents);
    render(new ListSortView(), this.tripList.getElement(), RenderPosition.BEFOREBEGIN);
    render(new PointEditionView(), this.tripList.getElement(), RenderPosition.AFTERBEGIN);
    Array.from({length: TRIP_POINTS_COUNT}, () => render(new TripEventsItemView(), this.tripList.getElement()));
  }
}


