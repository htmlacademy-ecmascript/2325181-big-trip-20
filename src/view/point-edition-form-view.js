import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getDateTimeFormatted, } from '../utils/time-date.js';
import {PointTypes} from '../const.js';
import { DateFormat } from '../const.js';
import { findArrayElementById, findArrayElementByType, findArrayElementByName } from '../utils/model.js';


function createPointEditionFormTemplate(state) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    type,
    eventType,
    newCityName,
    newCityDescription,
    newOffersAvailable,
    newCityPictures,
    newPointOffers
  } = state;
  const eventStartDate = getDateTimeFormatted(dateFrom, DateFormat.EVENT_START_END_DATE);
  const eventToDate = getDateTimeFormatted(dateTo, DateFormat.EVENT_START_END_DATE);

  function createOfferTemplate (offer) {

    const picked = newPointOffers.includes(offer.id) ? 'checked' : '';
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${offer.id}" data-offer-id="${offer.id}" type="checkbox" name="event-offer-${type}" ${picked}>
        <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`);
  }

  function createOffersEditionTemplate(offersAvailableList) {
    return offersAvailableList.length ? offersAvailableList.map((offer) => createOfferTemplate(offer)).join('') : '';
  }

  function createDestinationPhotoTemplate(destinations) {
    return `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinations.map((city) =>`<img class="event__photo" src="${city.src}" alt="${city.description}">`).join('')}
              </div>
            </div>`;
  }

  function createEventDetailsTemplate() {
    return (
      `<section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${createOffersEditionTemplate(newOffersAvailable)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${newCityDescription}</p>
          ${createDestinationPhotoTemplate(newCityPictures)}
        </section>
      </section>`
    );
  }

  function createEventTypeItemTemplate () {
    return Object.values(PointTypes).map((pointType) => `<div class="event__type-item">
      <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${pointType.charAt(0).toUpperCase().concat(pointType.slice(1))}</label>
      </div>`).join('');
  }

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeItemTemplate ()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${eventType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="select" name="event-destination" value="${newCityName}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventToDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
          ${createEventDetailsTemplate()}
      </form>
    </li>`
  );
}

export default class PointEditionFormView extends AbstractStatefulView {

  #offersAvailable = null;
  #city = null;
  #handleFormSubmit = null;
  #handleButtonFormClick = null;
  #allOffers = null;
  #allDestinations = null;

  constructor({point, onFormSubmit, onButtonFormClick, allOffers, allDestinations}) {
    super();
    this.#allDestinations = allDestinations;
    this.#city = findArrayElementById(this.#allDestinations, point.destination);
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonFormClick = onButtonFormClick;
    this.#allOffers = allOffers;
    this.#offersAvailable = findArrayElementByType(this.#allOffers, point.type)?.offers;
    this._setState(PointEditionFormView.parsePointToState(point, this.#city, this.#offersAvailable));
    this._restoreHandlers();

  }

  static parsePointToState(point, city, offersAvailableList) {
    return {
      ...point,
      eventType: point.type,
      newPointDestinationId: point.destination,
      newCityName: city.name,
      newCityDescription: city.description,
      newOffersAvailable: offersAvailableList,
      newPointOffers: point.offers,
      newCityPictures: city.pictures,
    };
  }

  reset(point) {
    this.updateElement(
      PointEditionFormView.parsePointToState(point, this.#city, this.#offersAvailable),
    );
  }

  _restoreHandlers () {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#eventTypeListClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventInputDestinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#eventOfferSelectionHandler);
  }

  get template() {
    return createPointEditionFormTemplate(this._state);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditionFormView.parseStateToPoint(this._state));
  };

  #buttonClickFormHandler = () => {
    this.#handleButtonFormClick();
  };

  #eventTypeListClickHandler = (evt) => {
    if (evt.target.matches('input[type=\'radio\']')) {
      const newEventType = evt.target.value;
      const newOffersAvailableList = findArrayElementByType(this.#allOffers, newEventType);
      this.updateElement({
        eventType: newEventType,
        newOffersAvailable: newOffersAvailableList?.offers,
        newPointOffers:[]
      });
    }
  };

  #eventOfferSelectionHandler = (evt) => {
    if (evt.target.matches('input[type=\'checkbox\']')) {
      const offerSelected = evt.target.dataset.offerId;
      const offersPicked = this._state.newPointOffers;
      if (!offersPicked.includes(offerSelected)) {
        offersPicked.push(offerSelected);
      } else {
        offersPicked.splice(offersPicked.lastIndexOf(offerSelected), 1);
      }
      this.updateElement({
        newPointOffers: offersPicked
      });
    }
  };

  #eventInputDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedCityName = evt.target.value;
    const newDestination = findArrayElementByName(this.#allDestinations, selectedCityName);
    if (newDestination !== undefined) {
      this._state.newPointDestinationId = newDestination.id;
      this.updateElement({
        newCityName: selectedCityName,
        newCityDescription: newDestination.description,
        newCityPictures: newDestination.pictures
      });
    } else {
      this.updateElement({});
    }
  };

  static parseStateToPoint(state) {
    const point = {...state};

    if (point.eventType !== point.type) {
      point.type = point.eventType;
      point.offers = point.newPointOffers;
    }
    if (point.destination !== point.newPointDestinationId) {
      point.destination = point.newPointDestinationId;
    }

    delete point.eventType;
    delete point.newCityName;
    delete point.newCityDescription;
    delete point.newPointDestinationId;
    delete point.newOffersAvailable;
    delete point.newCityPictures;
    delete point.newPointOffers;

    return point;
  }
}
