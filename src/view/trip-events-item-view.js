import AbstractView from '../framework/view/abstract-view.js';
import {getDateTimeFormatted, getTimeDifference} from '../utils/time-date.js';
import {DateFormat} from '../const.js';

function createTripEventsItemTemplate(point, offersArray, city) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;
  const {name: cityName} = city;
  const eventStartDate = getDateTimeFormatted(dateFrom, DateFormat.EVENT_START_END_DATE);
  const eventToDate = getDateTimeFormatted(dateTo, DateFormat.EVENT_START_END_DATE);
  const eventStartTime = getDateTimeFormatted(dateFrom, DateFormat.EVENT_START_END_TIME);
  const eventToTime = getDateTimeFormatted(dateTo, DateFormat.EVENT_START_END_TIME);
  const eventDuration = getTimeDifference(dateTo, dateFrom);
  const startDate = getDateTimeFormatted(dateFrom, DateFormat.START_DATE);
  const eventDate = getDateTimeFormatted(dateFrom, DateFormat.EVENT_DATE);
  const favorite = isFavorite ? '--active' : '';

  function createOffersTemplate(offersList) {
    if (offersList.length) {
      return offersList.map((offer) => `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('');
    } return '';
  }

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startDate}">${eventDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${cityName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${eventStartDate}">${eventStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${eventToDate}">${eventToTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offersArray)}
        </ul>
        <button class="event__favorite-btn event__favorite-btn${favorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class TripEventsItemView extends AbstractView {
  #point = null;
  #offersArray = null;
  #city = null;
  #handleButtonPointClick = null;
  #handleFavoriteClick = null;

  constructor({point, offersArray, city, onButtonPointClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#offersArray = offersArray;
    this.#city = city;
    this.#handleButtonPointClick = onButtonPointClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonPointClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripEventsItemTemplate(this.#point, this.#offersArray, this.#city);
  }

  #buttonPointClickHandler = () => {
    this.#handleButtonPointClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}