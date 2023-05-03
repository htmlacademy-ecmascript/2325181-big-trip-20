
import {getAllOffers} from '../mock/offer.js';

export default class OfferModel {
  allOffers = getAllOffers();

  getOffersOfType (offerType) {
    return this.allOffers.find((offer) => offer.type === offerType).offers;
  }

  findOffer (offerType, offerId) {
    return this.getOffersOfType(offerType).find((offer) => offer.id === offerId);
  }
}


