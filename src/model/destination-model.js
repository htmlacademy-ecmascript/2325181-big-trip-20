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
    let destinationsFromServer;
    try {
      destinationsFromServer = await this.#destinationsApiService.destinations;
    } catch (err) {
      destinationsFromServer = [];
    } finally {
      this.#allDestinations.push(...destinationsFromServer);
    }
  }


}


