import AbstractView from '../framework/view/abstract-view.js';

function createEventAddButtonTemplate(isDisabled) {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isDisabled}>New event</button>`
  );
}

export default class EventAddButtonView extends AbstractView {
  #isDisabled = null;

  constructor ({disabled}) {
    super();
    this.#isDisabled = disabled;
  }

  get template() {
    return createEventAddButtonTemplate(this.#isDisabled);
  }
}
