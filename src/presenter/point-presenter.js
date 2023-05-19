import PointEditionFormView from '../view/point-edition-form-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import { render, replace, remove } from '../framework/render.js';
import { PointMode } from '../const.js';

export default class PointPresenter {
  #tripList = null;
  #point = null;
  #tripPointComponent = null;
  #editionFormComponent = null;
  #handlePointChange = null;
  #handleModeChange = null;
  #mode = PointMode.VIEW;
  #allDestinations = null;
  #allOffers = null;


  constructor ({tripList, onPointChange, onModeChange}) {
    this.#tripList = tripList;
    this.#handlePointChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }


  init ({point, allDestinations, allOffers}) {

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditionFormComponent = this.#editionFormComponent;
    this.#point = point;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;

    this.#tripPointComponent = new TripEventsItemView({
      point: this.#point,
      onButtonPointClick: this.#handleButtonPointClick,
      onFavoriteClick: this.#handleFavoriteClick,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations
    });

    this.#editionFormComponent = new PointEditionFormView({
      point: this.#point,
      allDestinations: this.#allDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onButtonFormClick: this.#handleButtonFormClick,
      allOffers: this.#allOffers
    });

    if (prevTripPointComponent === null || prevEditionFormComponent === null) {
      render(this.#tripPointComponent, this.#tripList);
      return;
    }

    if (this.#mode === PointMode.VIEW) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === PointMode.EDIT) {
      replace(this.#editionFormComponent, prevEditionFormComponent);
    }

    remove(prevTripPointComponent);
    remove(prevEditionFormComponent);
  }

  destroy() {
    remove(this.#editionFormComponent);
    remove(this.#tripPointComponent);
  }

  resetView() {
    if (this.#mode !== PointMode.VIEW) {
      this.#editionFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#editionFormComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = PointMode.EDIT;
  }

  #replaceFormToPoint() {
    replace(this.#tripPointComponent, this.#editionFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = PointMode.VIEW;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editionFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleButtonPointClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#handlePointChange(point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleButtonFormClick = () => {
    this.#editionFormComponent.reset(this.#point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handlePointChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

}
