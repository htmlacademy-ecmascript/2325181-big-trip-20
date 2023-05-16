import PointEditionFormView from '../view/point-edition-form-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import { render, replace, remove } from '../framework/render.js';
import { PointMode } from '../const.js';

export default class PointPresenter {
  #tripList = null;
  #point = null;
  #offersPicked = null;
  #offersAvailable = null;
  #city = null;
  #tripPointComponent = null;
  #editionFormComponent = null;
  #handlePointChange = null;
  #handleModeChange = null;
  #mode = PointMode.VIEW;


  constructor ({tripList, onPointChange, onModeChange}) {
    this.#tripList = tripList;
    this.#handlePointChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }


  init ({point, offersPicked, offersAvailable, city}) {

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditionFormComponent = this.#editionFormComponent;
    this.#point = point;
    this.#offersPicked = offersPicked;
    this.#offersAvailable = offersAvailable;
    this.#city = city;

    this.#tripPointComponent = new TripEventsItemView({
      point: this.#point,
      offersArray: this.#offersPicked,
      city: this.#city,
      onButtonPointClick: this.#handleButtonPointClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editionFormComponent = new PointEditionFormView({
      point: this.#point,
      offersAvailable: this.#offersAvailable,
      city: this.#city,
      onFormSubmit: this.#handleFormSubmit,
      onButtonFormClick: this.#handleButtonFormClick
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
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handlePointChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

}
