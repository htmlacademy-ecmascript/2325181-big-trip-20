import AbstractView from '../framework/view/abstract-view.js';

function createEventAddButtonTemplate() {
  return (
    '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>'
  );
}

export default class EventAddButtonView extends AbstractView {
  get template() {
    return createEventAddButtonTemplate();
  }
}
