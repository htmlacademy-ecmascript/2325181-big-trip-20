
import {getAllDestinations} from '../mock/destination.js';

export default class DestinationModel {
  #allDestinations = getAllDestinations();

  get allDestinations () {
    return this.#allDestinations;
  }


  findDestination (destinationId) {
    return this.#allDestinations.find((destination) => destination.id === destinationId);
  }

}


