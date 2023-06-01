import AbstractView from '../framework/view/abstract-view.js';
import { ListEmptyMessage } from '../const.js';

function createListEmptyTemplate(filterType) {
  const noEventsMessage = ListEmptyMessage[filterType];
  return `<p class="trip-events__msg">${noEventsMessage}</p>`;

}

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
