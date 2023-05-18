import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { createFilter } from '../mock/filter.js';
import { getDateTimeFormatted } from '../utils/time-date.js';
import { DateFormat, EventAddButtonStatus, SortOrder } from '../const.js';
import { updateItem } from '../utils/common.js';
import { Sort } from '../utils/sort.js';

export default class TripPresenter {

  #tripList = new TripEventsListView();
  #listSort = null;
  #tripMain = null;
  #tripEvents = null;
  #tripEventsModel = null;
  #offerModel = null;
  #destinationModel = null;
  #tripPoints = [];
  #listEmpty = new ListEmptyView();
  #listFilter = null;
  #eventAddButton = null;
  #tripInfo = null;
  #pointPresenters = new Map();
  #actualSortOrder = SortOrder.DEFAULT;


  constructor({tripMain, tripEvents, tripEventsModel, offerModel, destinationModel}) {
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
    this.#tripEventsModel = tripEventsModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
  }

  #getPointDestination (point) {
    const pointDestinationId = point.destination;
    const destinationName = this.#destinationModel.findDestination(pointDestinationId);
    return destinationName;
  }

  #getPointPickedOffers (point) {
    const pointType = point.type;
    const pointOffers = point.offers;
    const pickedOffers = [];
    pointOffers.map((offer) => {
      const offerObj = this.#offerModel.findOffer(pointType, offer);
      if (offerObj) {
        pickedOffers.push(offerObj);
      }
    });
    return pickedOffers;

  }

  #getPointAvailableOffers (point) {
    const pointType = point.type;
    return this.#offerModel.getOffersByType(pointType);
  }

  init() {

    this.#tripPoints = [...this.#tripEventsModel.points];
    this.#renderTrip ();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTrip () {
    const filters = createFilter(this.#tripEventsModel.points);
    this.#listFilter = new ListFilterView({filters: filters});
    this.#renderListFilter ();
    render(this.#tripList, this.#tripEvents);
    this.#renderListSort (SortOrder.DEFAULT);
    if (this.#tripPoints.length) {
      this.#renderEventAddButton({disabled:EventAddButtonStatus.DISABLED});
      this.#renderPointsList ();
      this.#renderTripInfo ();
    } else {
      this.#renderEventAddButton({disabled: EventAddButtonStatus.ENABLED});
      this.#listSort.removeElement();
      this.#tripList.removeElement();
      this.#renderListEmpty();
    }
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripList.element,
      onPointChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init({
      point: point,
      offersPicked: this.#getPointPickedOffers (point),
      offersAvailable: this.#getPointAvailableOffers(point),
      city: this.#getPointDestination(point)
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      offersPicked: this.#getPointPickedOffers (updatedPoint),
      offersAvailable: this.#getPointAvailableOffers(updatedPoint),
      city: this.#getPointDestination(updatedPoint)
    });
  };

  #sortPoints (sortMethod) {
    this.#tripPoints.sort(Sort[sortMethod]);
    this.#actualSortOrder = sortMethod;
  }

  #handleSortOrderChange = (sortOrder) => {
    if (this.#actualSortOrder === sortOrder || sortOrder === undefined) {
      return;
    }
    remove(this.#listSort);
    this.#renderListSort(sortOrder);
    this.#sortPoints(sortOrder);
    this.#clearTripList();
    this.#renderPointsList ();
  };


  #clearTripList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList () {
    this.#tripPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderListSort (sortOrder) {
    this.#listSort = new ListSortView({onSortOrderChange: this.#handleSortOrderChange, sortOrder});
    render(this.#listSort, this.#tripList.element, RenderPosition.BEFOREBEGIN);
  }

  #renderListFilter () {
    render(this.#listFilter, this.#tripMain);
  }

  #renderEventAddButton({disabled}) {
    this.#eventAddButton = new EventAddButtonView({disabled});
    render(this.#eventAddButton, this.#tripMain);
  }

  #renderListEmpty () {
    render(this.#listEmpty, this.#tripEvents);
  }

  #renderTripInfo () {

    const tripTotalValue = this.#tripPoints.reduce((acc, point) => acc + point.basePrice, 0);
    const tripStartDate = getDateTimeFormatted(this.#tripPoints[0].dateFrom, DateFormat.INFO_DAY);
    const tripEndDate = getDateTimeFormatted(this.#tripPoints[this.#tripPoints.length - 1].dateFrom, DateFormat.INFO_DAY);
    const tripWay = this.#tripPoints.map((point) => this.#getPointDestination(point) !== undefined ?
      this.#getPointDestination(point).name : '');
    this.#tripInfo = new TripInfoView({tripTotalValue, tripStartDate, tripEndDate, tripWay});
    render(this.#tripInfo, this.#tripMain, RenderPosition.AFTERBEGIN);
  }

}