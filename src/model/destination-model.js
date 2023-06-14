import { DownloadErrorMessage } from '../const.js';

export default class DestinationModel {
  #allDestinations = [];
  #destinationsApiService = null;

  constructor({destinationsApiService}) {
    this.#destinationsApiService = destinationsApiService;
  }

  get allDestinations () {
    return this.#allDestinations;
  }

  async init () {
    try {
      const destinationsFromServer = await this.#destinationsApiService.destinations;
      this.#allDestinations.push(...destinationsFromServer);
    } catch (err) {
      throw new Error(DownloadErrorMessage.ERROR_DESTINATIONS);
    }
  }


}


