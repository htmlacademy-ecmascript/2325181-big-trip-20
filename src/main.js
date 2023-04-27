import TripPresenter from './presenter/trip-presenter.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({tripFilters: tripControlsFilters, tripEvents: tripEvents});

tripPresenter.init();
