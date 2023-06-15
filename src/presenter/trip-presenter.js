import ListSortView from '../view/list-sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import EventAddPresenter from './event-add-presenter.js';
import TripEventsModel from '../model/trip-events-model.js';
import OfferModel from '../model/offer-model.js';
import DestinationModel from '../model/destination-model.js';
import FilterModel from '../model/filter-model.js';
import {Filter} from '../utils/filter.js';
import { getDateTimeFormatted } from '../utils/time-date.js';
import { findArrayElementById, findArrayElementByType } from '../utils/model.js';
import { Sort } from '../utils/sort.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { DateFormat, SortOrder, UpdateType, FilterType, UserAction, SaveDeleteStatus, BlockTimeLimit, AUTHORIZATION_TOKEN, END_POINT } from '../const.js';
import PointsApiService from '../points-api-service.js';

export default class TripPresenter {

  #tripEventsModel = new TripEventsModel({
    pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
  });

  #offerModel = new OfferModel({
    offersApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
  });

  #destinationModel = new DestinationModel({
    destinationsApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
  });

  #filterModel = new FilterModel();
  #tripListComponent = new TripEventsListView();
  #listSortComponent = null;
  #listEmptyComponent = null;
  #eventAddButtonComponent = null;
  #tripInfoComponent = null;
  #tripMainElement = document.querySelector('.trip-main');
  #tripEventsElement = document.querySelector('.trip-events');
  #pointPresenters = new Map();
  #actualSortOrder = SortOrder.DEFAULT;
  #actualFilterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: BlockTimeLimit.LOWER_LIMIT,
    upperLimit: BlockTimeLimit.UPPER_LIMIT
  });

  #filterPresenter = new FilterPresenter({
    filterContainer: this.#tripMainElement,
    filterModel: this.#filterModel,
    tripEventsModel: this.#tripEventsModel,
  });

  constructor() {
    this.#tripEventsModel.addObserver(this.#handleModelEvent,);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#actualFilterType = this.#filterModel.filter;
    const points = this.#tripEventsModel.points;
    const filteredPoints = Filter[this.#actualFilterType](points);
    return filteredPoints.sort(Sort[this.#actualSortOrder]);
  }

  async init () {
    this.#renderListFilter ();
    this.#renderEventAddButton();
    this.#eventAddButtonComponent.element.disabled = true;
    render(this.#tripListComponent, this.#tripEventsElement);
    this.#renderListEmpty();
    try {
      await Promise.all([this.#destinationModel.init(), this.#offerModel.init()])
        .then(() => this.#tripEventsModel.init());
    } catch (err) {
      remove(this.#listEmptyComponent);
      this.#renderListEmpty(true);
    }
  }

  #renderInitialPointsList () {
    remove(this.#listEmptyComponent);
    this.#isLoading = false;
    this.#eventAddButtonComponent.element.disabled = false;
    this.#renderListFilter ();
    this.#resetSortOrder();
  }

  #renderPointsList () {
    remove(this.#listEmptyComponent);
    remove(this.#tripInfoComponent);
    this.#renderTripInfo ();
    this.#clearTripList();
    if (this.points.length) {
      this.#renderListSort (this.#actualSortOrder);
      this.points.forEach((point) => this.#renderPoint(point));
    } else {
      if (!this.#tripEventsModel.points?.length && this.#filterModel.filter !== FilterType.EVERYTHING) {
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

  #renderListSort (sortOrder) {
    if (this.#listSortComponent) {
      remove(this.#listSortComponent);
    }
    this.#listSortComponent = new ListSortView({onSortOrderChange: this.#handleSortOrderChange, sortOrder});
    render(this.#listSortComponent, this.#tripListComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #resetSortOrder () {
    if (this.#actualSortOrder !== SortOrder.DEFAULT) {
      this.#actualSortOrder = SortOrder.DEFAULT;
      this.#renderListSort(SortOrder.DEFAULT);
    }
    this.#renderPointsList ();
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

  #renderTripInfo () {
    if (this.#tripEventsModel.points?.length) {
      const tripPointsCopy = [...this.#tripEventsModel.points].sort(Sort[SortOrder.DEFAULT]);
      const addOfferValue = (accPrice, offer, point) => {
        const offersByType = findArrayElementByType(this.#offerModel.allOffers, point.type);
        const offerById = findArrayElementById(offersByType?.offers, offer);
        return accPrice + offerById.price;
      };
      const tripTotalValue = tripPointsCopy.reduce(
        (accValue, point) => accValue + point.basePrice + point.offers.reduce(
          (accPrice, offer) => addOfferValue (accPrice, offer, point), 0
        ), 0
      );
      const tripStartDate = getDateTimeFormatted(tripPointsCopy[0].dateFrom, DateFormat.INFO_DAY);
      const tripEndDate = getDateTimeFormatted(tripPointsCopy[tripPointsCopy.length - 1].dateTo, DateFormat.INFO_DAY);
      const tripWay = tripPointsCopy.map((point) => findArrayElementById(this.#destinationModel.allDestinations, point.destination)?.name ?? '');
      this.#tripInfoComponent = new TripInfoView({tripTotalValue, tripStartDate, tripEndDate, tripWay});
      render(this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
    }
  }

  #renderListEmpty (isFailure = false) {
    this.#listEmptyComponent = new ListEmptyView({filterType: this.#actualFilterType, isLoading: this.#isLoading, isFailure});
    render(this.#listEmptyComponent, this.#tripEventsElement);
  }

  #renderEventAddButton () {
    this.#eventAddButtonComponent = new EventAddButtonView({onClick: this.#handleEventAddButtonClick});
    render(this.#eventAddButtonComponent, this.#tripMainElement);
  }

  #handleModeChange = () => {
    this.#eventAddPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id)?.init({
      point: updatedPoint,
      allDestinations: this.#destinationModel.allDestinations,
      allOffers: this.#offerModel.allOffers,
    });
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    const activePresenter = (actionType === UserAction.ADD_POINT) ? this.#eventAddPresenter : this.#pointPresenters.get(update.id);
    activePresenter.setSavingDeleting(SaveDeleteStatus[actionType]);
    try {
      await this.#tripEventsModel[actionType](updateType, update);
    } catch (err) {
      activePresenter.setAborting();
    }
    this.#uiBlocker.unblock();
  };

  #handleAdditionFormComponentClose = () => {
    this.#eventAddButtonComponent.element.disabled = false;
    this.#renderListSort (SortOrder.DEFAULT);
    if (!this.points.length) {
      this.#renderListEmpty ();
    }
  };

  #eventAddPresenter = new EventAddPresenter ({
    tripList: this.#tripListComponent.element,
    onDataChange: this.#handleViewAction,
    onDestroy: this.#handleAdditionFormComponentClose
  });

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
        this.#renderInitialPointsList ();
        break;
    }
  };
}
