import { TRIP_POINTS_COUNT, SortOrder } from '../const.js';
import { getRandomPoint } from '../mock/point.js';
import { Sort } from '../utils/sort.js';

export default class TripEventsModel {
  #points = Array.from({length: TRIP_POINTS_COUNT}, getRandomPoint).sort(Sort[SortOrder.DEFAULT]);
  get points() {
    return this.#points;
  }
}
