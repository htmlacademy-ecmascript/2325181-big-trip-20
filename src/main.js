import TripPresenter from './presenter/trip-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';

const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripEventsModel = new TripEventsModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({
  tripMain,
  tripEvents,
  tripEventsModel,
  offerModel,
  destinationModel,
  filterModel
});

tripPresenter.init();
