import {remove, render, RenderPosition} from '../framework/render.js';
import PointEditionView from '../view/point-edition-form-view.js';
import {UserAction, UpdateType} from '../const.js';

function getEmptyPoint () {
  return {
    id: '',
    basePrice: 0,
    dateFrom: null,
    dateTo: null,
    destination: '',
    isFavorite: false,
    type: 'taxi',
    offers: [],
  };
}

export default class EventAddPresenter {
  #tripList = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #editionFormComponent = null;
  #allDestinations = null;
  #allOffers = null;

  constructor ({tripList, onDataChange, onDestroy}) {
    this.#tripList = tripList;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init ({allDestinations, allOffers}) {
    if (this.#editionFormComponent !== null) {
      return;
    }

    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;

    this.#editionFormComponent = new PointEditionView ({
      point: getEmptyPoint(),
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      newPoint: true
    });
    render(this.#editionFormComponent, this.#tripList, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy () {
    if (this.#editionFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editionFormComponent);
    this.#editionFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

  }

  setSavingDeleting (saveDeleteStatus) {
    this.#editionFormComponent.updateElement({
      isDisabled: true,
      [saveDeleteStatus]: true,
    });
  }

  setAborting () {
    const resetPointState = () => this.#editionFormComponent.updateElement({
      isDisabled: false,
      isDeleting: false,
      isSaving: false
    });

    this.#editionFormComponent.shake(resetPointState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

}
