import AbstractView from '../framework/view/abstract-view.js';
import { ListEmptyMessage, DownloadErrorMessage } from '../const.js';

function createListEmptyTemplate(filterType, loading, isFailure) {
  const failureMessage = isFailure ?
    DownloadErrorMessage.ERROR_DOWNLOAD : '';

  const noEventsMessage = loading ?
    ListEmptyMessage.LOADING :
    ListEmptyMessage[filterType];

  return `<p class="trip-events__msg">${failureMessage || noEventsMessage}</p>`;

}

export default class ListEmptyView extends AbstractView {
  #filterType = null;
  #loading = null;
  #isFailure = null;

  constructor ({filterType, isLoading = false, isFailure}) {
    super();
    this.#filterType = filterType;
    this.#loading = isLoading;
    this.#isFailure = isFailure;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType, this.#loading, this.#isFailure);
  }
}
