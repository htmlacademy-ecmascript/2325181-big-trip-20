
import {getAllOffers} from '../mock/offer.js';

export default class OfferModel {
  #allOffers = getAllOffers();

  getOffersByType (offerType) {
    const offersByTypeObj = this.#allOffers.find((offer) => offer.type === offerType);
    return offersByTypeObj ? offersByTypeObj.offers : [];
  }

  findOffer (offerType, offerId) {
    const offersArray = this.getOffersByType(offerType);
    return offersArray.length ? offersArray.find((offer) => offer.id === offerId) : '';
  }
}


