import AbstractView from '../framework/view/abstract-view.js';
import {getDateTimeFormatted, } from '../utils/time-date.js';
import {PointTypes} from '../const.js';
import { DateFormat } from '../const.js';

function createPointEditionFormTemplate(point, offersAvailable, city) {
  const {basePrice, dateFrom, dateTo, offers: offersChosen, type} = point;
  const {name: cityName, description: cityDescription} = city;
  const eventStartDate = getDateTimeFormatted(dateFrom, DateFormat.EVENT_START_END_DATE);
  const eventToDate = getDateTimeFormatted(dateTo, DateFormat.EVENT_START_END_DATE);

  function createOfferTemplate (offer) {
    const picked = offersChosen.includes(offer.id) ? 'checked' : '';
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${type}" ${picked}>
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

  function createEventDetailsTemplate() {
    return (
      `<section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${createOffersEditionTemplate(offersAvailable)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${cityDescription}</p>
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
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityName}" list="destination-list-1">
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

export default class PointEditionFormView extends AbstractView {
  #point = null;
  #offersAvailable = null;
  #city = null;
  #handleFormSubmit = null;
  #handleButtonFormClick = null;

  constructor({point, offersAvailable, city, onFormSubmit, onButtonFormClick}) {
    super();
    this.#point = point;
    this.#offersAvailable = offersAvailable;
    this.#city = city;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonFormClick = onButtonFormClick;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickFormHandler);
  }

  get template() {
    return createPointEditionFormTemplate(this.#point, this.#offersAvailable, this.#city);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #buttonClickFormHandler = () => {
    this.#handleButtonFormClick();
  };

}