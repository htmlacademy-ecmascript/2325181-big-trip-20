import TripPresenter from './presenter/trip-presenter.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEventsList = document.querySelector('.trip-events').appendChild(document.createElement('ul'));
const tripPresenter = new TripPresenter({tripFilters: tripControlsFilters, tripList: tripEventsList});

tripPresenter.init();
