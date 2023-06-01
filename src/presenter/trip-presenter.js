import ListSortView from '../view/list-sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import EventAddPresenter from './event-add-presenter.js';
import {Filter} from '../utils/filter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { getDateTimeFormatted } from '../utils/time-date.js';
import { DateFormat, SortOrder, modelCallback, UpdateType, FilterType } from '../const.js';
import { Sort } from '../utils/sort.js';
import { findArrayElementById } from '../utils/model.js';

export default class TripPresenter {

  #tripList = new TripEventsListView();
  #listSort = null;
  #tripMain = null;
  #tripEvents = null;
  #tripEventsModel = null;
  #offerModel = null;
  #destinationModel = null;
  #filterModel = null;
  #listEmpty = null;
  #eventAddButtonComponent = null;
  #tripInfo = null;
  #pointPresenters = new Map();
  #eventAddPresenter = null;
  #actualSortOrder = SortOrder.DEFAULT;
  #actualFilterType = FilterType.EVERYTHING;


  constructor({tripMain, tripEvents, tripEventsModel, offerModel, destinationModel, filterModel}) {
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
    this.#tripEventsModel = tripEventsModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#eventAddPresenter = new EventAddPresenter ({
      tripList: this.#tripList.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleAdditionFormComponentClose
    });
  }

  get points() {
    this.#actualFilterType = this.#filterModel.filter;
    const points = this.#tripEventsModel.points;
    const filteredPoints = Filter[this.#actualFilterType](points);
    return filteredPoints.sort(Sort[this.#actualSortOrder]);
  }

  init() {
    this.#renderTrip ();
  }

  #handleModeChange = () => {
    this.#eventAddPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTrip () {
    this.#renderListFilter ();
    this.#renderEventAddButton();
    render(this.#tripList, this.#tripEvents);
    this.#renderListSort (SortOrder.DEFAULT);
    this.#renderPointsList ();
  }

  #renderListFilter () {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#tripMain,
      filterModel: this.#filterModel,
      tripEventsModel: this.#tripEventsModel
    });
    filterPresenter.init();
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripList.element,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init({
      point: point,
      allDestinations: this.#destinationModel.allDestinations,
      allOffers: this.#offerModel.allOffers,
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    this.#tripEventsModel[modelCallback[actionType]](updateType, update);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#handlePointChange(data);
        break;
      case UpdateType.MINOR:
        this.#handlePointChange(data);
        this.#renderPointsList ();
        break;
      case UpdateType.MAJOR:
        this.#resetSortOrder();
        break;
    }
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id)?.init({
      point: updatedPoint,
      allDestinations: this.#destinationModel.allDestinations,
      allOffers: this.#offerModel.allOffers,
    });
  };

  #renderPointsList () {
    remove(this.#tripInfo);
    this.#renderTripInfo ();
    this.#clearTripList();
    remove(this.#listEmpty);
    if (this.points.length) {
      this.points.forEach((point) => this.#renderPoint(point));
    } else {
      if (!this.#tripEventsModel.points.length && this.#filterModel.filter !== FilterType.EVERYTHING) {
        this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      } else {
        this.#renderListEmpty();
      }
    }
  }

  #clearTripList() {
    this.#eventAddPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderTripInfo () {
    if (this.#tripEventsModel.points.length) {
      const tripPointsCopy = [...this.#tripEventsModel.points].sort(Sort[SortOrder.DEFAULT]);
      const tripTotalValue = tripPointsCopy.reduce((acc, point) => acc + point.basePrice, 0);
      const tripStartDate = getDateTimeFormatted(tripPointsCopy[0].dateFrom, DateFormat.INFO_DAY);
      const tripEndDate = getDateTimeFormatted(tripPointsCopy[tripPointsCopy.length - 1].dateTo, DateFormat.INFO_DAY);
      const tripWay = tripPointsCopy.map((point) => findArrayElementById(this.#destinationModel.allDestinations, point.destination) !== undefined ?
        findArrayElementById(this.#destinationModel.allDestinations, point.destination).name : '');
      this.#tripInfo = new TripInfoView({tripTotalValue, tripStartDate, tripEndDate, tripWay});
      render(this.#tripInfo, this.#tripMain, RenderPosition.AFTERBEGIN);
    }
  }

  #resetSortOrder = () => {
    if (this.#actualSortOrder !== SortOrder.DEFAULT) {
      this.#actualSortOrder = SortOrder.DEFAULT;
      this.#renderListSort(SortOrder.DEFAULT);
    }
    this.#renderPointsList ();
  };

  #handleSortOrderChange = (sortOrder) => {
    if (this.#actualSortOrder === sortOrder || sortOrder === undefined) {
      return;
    }
    this.#actualSortOrder = sortOrder;
    this.#renderListSort(sortOrder);
    this.#renderPointsList ();
  };

  #renderListSort (sortOrder) {
    if (this.#listSort) {
      remove(this.#listSort);
    }
    this.#listSort = new ListSortView({onSortOrderChange: this.#handleSortOrderChange, sortOrder});
    render(this.#listSort, this.#tripList.element, RenderPosition.BEFOREBEGIN);
  }

  #renderEventAddButton () {
    this.#eventAddButtonComponent = new EventAddButtonView({onClick: this.#handleEventAddButtonClick});
    render(this.#eventAddButtonComponent, this.#tripMain);
  }

  #handleEventAddButtonClick = () => {
    this.#resetSortOrder();
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#eventAddPresenter.init({
      allDestinations: this.#destinationModel.allDestinations,
      allOffers: this.#offerModel.allOffers
    });
    this.#eventAddButtonComponent.element.disabled = true;
  };

  #handleAdditionFormComponentClose = () => {
    this.#eventAddButtonComponent.element.disabled = false;
  };

  #renderListEmpty () {
    this.#listEmpty = new ListEmptyView({filterType: this.#actualFilterType});
    render(this.#listEmpty, this.#tripEvents);
  }

}
