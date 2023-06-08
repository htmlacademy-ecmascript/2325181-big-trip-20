import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate(totalValue, startDate, endDate, tripWay) {
  const tripWayDescription = tripWay.length > 3 ? tripWay.at(0).concat('&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp', tripWay.at(-1)) : tripWay.join(' &mdash; ');
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripWayDescription}</h1>

        <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalValue}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #tripTotalValue = null;
  #tripStartDate = null;
  #tripEndDate = null;
  #tripWay = [];

  constructor ({tripTotalValue, tripStartDate, tripEndDate, tripWay}) {
    super();
    this.#tripTotalValue = tripTotalValue;
    this.#tripStartDate = tripStartDate;
    this.#tripEndDate = tripEndDate;
    this.#tripWay = tripWay;
  }

  get template() {
    return createTripInfoTemplate(this.#tripTotalValue, this.#tripStartDate, this.#tripEndDate, this.#tripWay);
  }
}
