import { TRIP_POINTS_COUNT } from '../const.js';
import { getRandomPoint } from '../mock/point.js';
import Observable from '../framework/observable.js';

export default class TripEventsModel extends Observable {
  #points = Array.from({length: TRIP_POINTS_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  updatePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points[index] = update;
    this._notify(updateType, update);
  }

  addPoint (updateType, update) {
    this.#points.push(update);
    this._notify(updateType, update);
  }

  deletePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    this.#points.splice(index, 1);
    this._notify(updateType, update);
  }

}
