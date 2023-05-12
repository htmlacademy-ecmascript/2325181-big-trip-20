import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import PointEditionFormView from '../view/point-edition-form-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, replace, RenderPosition } from '../framework/render.js';
import { createFilter } from '../mock/filter.js';
import { getDateTimeFormatted } from '../utils/time-date.js';
import { DateFormat } from '../const.js';

export default class TripPresenter {

  #tripList = new TripEventsListView();
  #listSort = new ListSortView();
  #tripMain = null;
  #tripEvents = null;
  #tripEventsModel = null;
  #offerModel = null;
  #destinationModel = null;
  #tripPoints = [];

  constructor({tripMain, tripEvents, tripEventsModel, offerModel, destinationModel}) {
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
    this.#tripEventsModel = tripEventsModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
  }

  getPointDestination (point) {
    const pointDestinationId = point.destination;
    const destinationName = this.#destinationModel.findDestination(pointDestinationId);
    return destinationName;
  }

  getPointPickedOffers (point) {
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

  getPointAvailableOffers (point) {
    const pointType = point.type;
    return this.#offerModel.getOffersByType(pointType);
  }

  init() {
    this.#tripPoints = [...this.#tripEventsModel.points];
    this.#tripPoints.sort((pointOne, pointTwo) => Date.parse(pointOne.dateFrom) - Date.parse(pointTwo.dateFrom));
    this.#renderTrip ();
  }

  #renderPoint ({point}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointComponent = new TripEventsItemView({
      point: point,
      offersArray: this.getPointPickedOffers (point),
      city: this.getPointDestination (point),
      onButtonClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editionFormComponent = new PointEditionFormView({
      point: point,
      offersAvailable: this.getPointAvailableOffers(point),
      city: this.getPointDestination(point),
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editionFormComponent, tripPointComponent);
    }

    function replaceFormToPoint() {
      replace(tripPointComponent, editionFormComponent);
    }

    render(tripPointComponent, this.#tripList.element);
  }

  #renderTrip () {
    const filters = createFilter(this.#tripEventsModel.points);
    render(new ListFilterView({filters}), this.#tripMain);
    render(this.#tripList, this.#tripEvents);
    render(this.#listSort, this.#tripList.element, RenderPosition.BEFOREBEGIN);
    if (this.#tripPoints.length) {
      render(new EventAddButtonView({disabled: 'disabled'}), this.#tripMain);
      this.#tripPoints.forEach((point) => this.#renderPoint({point}));
      this.#renderTripInfo ();
    } else {
      render(new EventAddButtonView({disabled: ''}), this.#tripMain);
      this.#listSort.removeElement();
      this.#tripList.removeElement();
      render(new ListEmptyView, this.#tripEvents);
    }
  }

  #renderTripInfo () {

    const tripTotalValue = this.#tripPoints.reduce((acc, point) => acc + point.basePrice, 0);
    const tripStartDate = getDateTimeFormatted(this.#tripPoints[0].dateFrom, DateFormat.INFO_DAY);
    const tripEndDate = getDateTimeFormatted(this.#tripPoints[this.#tripPoints.length - 1].dateFrom, DateFormat.INFO_DAY);
    const tripWay = this.#tripPoints.map((point) => this.getPointDestination(point) !== undefined ?
      this.getPointDestination(point).name : '');
    render(new TripInfoView({tripTotalValue, tripStartDate, tripEndDate, tripWay}), this.#tripMain, RenderPosition.AFTERBEGIN);
  }

}
