
import {getAllDestinations} from '../mock/destination.js';

export default class DestinationModel {
  allDestinations = getAllDestinations();

  findDestination (destinationId) {
    return this.allDestinations.find((destination) => destination.id === destinationId);
  }
}


