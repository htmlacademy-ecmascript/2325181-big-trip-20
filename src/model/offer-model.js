export default class OfferModel {
  #allOffers = [];
  #offersApiService = null;

  constructor({offersApiService}) {
    this.#offersApiService = offersApiService;
  }

  get allOffers () {
    return this.#allOffers;
  }

  async init () {
    let offersFromServer;
    try {
      offersFromServer = await this.#offersApiService.offers;
    } catch (err) {
      offersFromServer = [];
    } finally {
      this.#allOffers.push(...offersFromServer);
    }
  }

}


