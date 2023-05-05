import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
// import PointAdditionView from '../view/point-addition-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import PointEditionView from '../view/point-edition-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render, RenderPosition } from '../render.js';

export default class TripPresenter {

  tripList = new TripEventsListView();

  constructor({tripMain, tripEvents, tripEventsModel, offerModel, destinationModel, pointEditionModel}) {
    this.tripMain = tripMain;
    this.tripEvents = tripEvents;
    this.tripEventsModel = tripEventsModel;
    this.offerModel = offerModel;
    this.destinationModel = destinationModel;
    this.pointEditionModel = pointEditionModel;
  }

  getPointDestination (point) {
    const pointDestinationId = point.destination;
    const destinationName = this.destinationModel.findDestination(pointDestinationId);
    return destinationName;
  }

  getPointPickedOffers (point) {
    const pointType = point.type;
    const pointOffers = point.offers;
    const pickedOffers = [];
    pointOffers.map((offer) => {
      const offerObj = this.offerModel.findOffer(pointType, offer);
      if (offerObj) {
        pickedOffers.push(offerObj);
      }
    });
    return pickedOffers;

  }

  getPointAvailableOffers (point) {
    const pointType = point.type;
    return this.offerModel.getOffersByType(pointType);
  }


  init() {
    this.tripPoints = [...this.tripEventsModel.getTripEvents()];
    this.pointEdition = this.pointEditionModel.getPointEdition();
    render(new TripInfoView(), this.tripMain);
    render(new ListFilterView(), this.tripMain);
    render(new EventAddButtonView(), this.tripMain);
    render(this.tripList, this.tripEvents);
    render(new ListSortView(), this.tripList.getElement(), RenderPosition.BEFOREBEGIN);
    render(new PointEditionView({point: this.pointEdition, offersAvailable: this.getPointAvailableOffers(this.pointEdition), city: this.getPointDestination(this.pointEdition)}), this.tripList.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new TripEventsItemView({point: this.tripPoints[i], offersArray: this.getPointPickedOffers (this.tripPoints[i]), city: this.getPointDestination (this.tripPoints[i])}), this.tripList.getElement());
    }
  }
}


