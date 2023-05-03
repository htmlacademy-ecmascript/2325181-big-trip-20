import { TRIP_POINTS_COUNT } from '../const.js';
import { getRandomPoint } from '../mock/point.js';

export default class TripEventsModel {
  points = Array.from({length: TRIP_POINTS_COUNT}, getRandomPoint);
  getTripEvents() {
    return this.points;
  }
}
