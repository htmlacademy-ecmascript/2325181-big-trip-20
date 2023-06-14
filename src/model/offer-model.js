import { DownloadErrorMessage } from '../const.js';

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
    try {
      this.#allOffers.push(...await this.#offersApiService.offers);
    } catch (err) {
      throw new Error(DownloadErrorMessage.ERROR_OFFERS);
    }
  }

}


