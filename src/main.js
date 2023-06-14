import TripPresenter from './presenter/trip-presenter.js';

const tripPresenter = new TripPresenter();

tripPresenter.init()
  .catch((err) => {
    throw new Error(err);
  });

