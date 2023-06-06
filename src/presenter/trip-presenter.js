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
import { DateFormat, SortOrder, ModelCallback, UpdateType, FilterType } from '../const.js';
import { Sort } from '../utils/sort.js';
import { findArrayElementById } from '../utils/model.js';

export default class TripPresenter {

  #tripListComponent = new TripEventsListView();
  #listSortComponent = null;
  #tripMain = null;
  #tripEvents = null;
  #tripEventsModel = null;
  #offerModel = null;
  #destinationModel = null;
  #filterModel = null;
  #listEmptyComponent = null;
  #eventAddButtonComponent = null;
  #tripInfoComponent = null;
  #pointPresenters = new Map();
  #eventAddPresenter = null;
  #actualSortOrder = SortOrder.DEFAULT;
  #actualFilterType = FilterType.EVERYTHING;
  #isLoading = true;
  #filterPresenter = null;


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
      tripList: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleAdditionFormComponentClose
    });
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#tripMain,
      filterModel: this.#filterModel,
      tripEventsModel: this.#tripEventsModel,
    });
  }

  get points() {
    this.#actualFilterType = this.#filterModel.filter;
    const points = this.#tripEventsModel.points;
    const filteredPoints = Filter[this.#actualFilterType](points);
    return filteredPoints.sort(Sort[this.#actualSortOrder]);
  }

  #handleModeChange = () => {
    this.#eventAddPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
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
      case UpdateType.INIT:
        remove(this.#listEmptyComponent);
        if(this.#destinationModel.allDestinations.length && this.#offerModel.allOffers.length) {
          this.#isLoading = false;
          this.#eventAddButtonComponent.element.disabled = false;
          this.#renderListFilter ();
          this.#resetSortOrder();
        } else {
          this.#renderListEmpty(true);
        }

        break;
    }
  };

  init() {
    this.#renderListFilter ();
    render(this.#tripListComponent, this.#tripEvents);
    this.#renderEventAddButton();
    if (this.#isLoading) {
      this.#eventAddButtonComponent.element.disabled = true;
      this.#renderListEmpty();
    }
  }

  #renderPointsList () {
    remove(this.#listEmptyComponent);
    remove(this.#tripInfoComponent);
    this.renderTripInfo ();
    this.#clearTripList();
    if (this.points.length) {
      this.#renderListSort (this.#actualSortOrder);
      this.points.forEach((point) => this.#renderPoint(point));
    } else {
      if (!this.#tripEventsModel.point?.length && this.#filterModel.filter !== FilterType.EVERYTHING) {
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


  #renderListFilter () {
    this.#filterPresenter.init({isLoading: this.#isLoading});
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripListComponent.element,
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
    this.#tripEventsModel[ModelCallback[actionType]](updateType, update);
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id)?.init({
      point: updatedPoint,
      allDestinations: this.#destinationModel.allDestinations,
      allOffers: this.#offerModel.allOffers,
    });
  };

  renderTripInfo () {
    if (this.#tripEventsModel.points?.length) {
      const tripPointsCopy = [...this.#tripEventsModel.points].sort(Sort[SortOrder.DEFAULT]);
      const tripTotalValue = tripPointsCopy.reduce((acc, point) => acc + point.basePrice, 0);
      const tripStartDate = getDateTimeFormatted(tripPointsCopy[0].dateFrom, DateFormat.INFO_DAY);
      const tripEndDate = getDateTimeFormatted(tripPointsCopy[tripPointsCopy.length - 1].dateTo, DateFormat.INFO_DAY);
      const tripWay = tripPointsCopy.map((point) => findArrayElementById(this.#destinationModel.allDestinations, point.destination) !== undefined ?
        findArrayElementById(this.#destinationModel.allDestinations, point.destination).name : '');
      this.#tripInfoComponent = new TripInfoView({tripTotalValue, tripStartDate, tripEndDate, tripWay});
      render(this.#tripInfoComponent, this.#tripMain, RenderPosition.AFTERBEGIN);
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
    if (!this.#isLoading) {
      if (this.#actualSortOrder === sortOrder || sortOrder === undefined) {
        return;
      }
      this.#actualSortOrder = sortOrder;
      this.#renderListSort(sortOrder);
      this.#renderPointsList ();
    }
  };

  #renderListSort (sortOrder) {
    if (this.#listSortComponent) {
      remove(this.#listSortComponent);
    }
    this.#listSortComponent = new ListSortView({onSortOrderChange: this.#handleSortOrderChange, sortOrder});
    render(this.#listSortComponent, this.#tripListComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderEventAddButton () {
    this.#eventAddButtonComponent = new EventAddButtonView({onClick: this.#handleEventAddButtonClick});
    render(this.#eventAddButtonComponent, this.#tripMain);
  }

  #handleEventAddButtonClick = () => {
    this.#resetSortOrder();
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    remove(this.#listEmptyComponent);
    this.#eventAddPresenter.init({
      allDestinations: this.#destinationModel.allDestinations,
      allOffers: this.#offerModel.allOffers
    });
    this.#eventAddButtonComponent.element.disabled = true;
  };

  #handleAdditionFormComponentClose = () => {
    this.#eventAddButtonComponent.element.disabled = false;
    this.#renderListSort (SortOrder.DEFAULT);
    if (!this.points.length) {
      this.#renderListEmpty ();
    }
  };

  #renderListEmpty (isFailure = false) {
    this.#listEmptyComponent = new ListEmptyView({filterType: this.#actualFilterType, isLoading: this.#isLoading, isFailure});
    render(this.#listEmptyComponent, this.#tripEvents);
  }

}