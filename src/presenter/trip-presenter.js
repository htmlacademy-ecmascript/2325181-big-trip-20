import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import PointEditionFormView from '../view/point-edition-form-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render, replace, RenderPosition } from '../framework/render.js';

export default class TripPresenter {

  #tripList = new TripEventsListView();
  #tripMain = null;
  #tripEvents = null;
  #tripEventsModel = null;
  #offerModel = null;
  #destinationModel = null;
  #pointEditionModel = null;
  #tripPoints = [];
  #pointEdition = null;

  constructor({tripMain, tripEvents, tripEventsModel, offerModel, destinationModel, pointEditionModel}) {
    this.#tripMain = tripMain;
    this.#tripEvents = tripEvents;
    this.#tripEventsModel = tripEventsModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#pointEditionModel = pointEditionModel;
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
    this.#pointEdition = this.#pointEditionModel.editionPoint;
    render(new TripInfoView(), this.#tripMain);
    render(new ListFilterView(), this.#tripMain);
    render(new EventAddButtonView(), this.#tripMain);
    render(this.#tripList, this.#tripEvents);
    render(new ListSortView(), this.#tripList.element, RenderPosition.BEFOREBEGIN);
    this.#tripPoints.forEach((point) => this.#renderPoint({point}));
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

}
