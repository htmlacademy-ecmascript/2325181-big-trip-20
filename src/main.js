import TripPresenter from './presenter/trip-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION_TOKEN, END_POINT } from './const.js';


const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripEventsModel = new TripEventsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
});
const offerModel = new OfferModel({
  offersApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
});
const destinationModel = new DestinationModel({
  destinationsApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
});
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({
  tripMain,
  tripEvents,
  tripEventsModel,
  offerModel,
  destinationModel,
  filterModel
});

tripPresenter.init ();
destinationModel.init ();
offerModel.init ();
tripEventsModel.init ();


