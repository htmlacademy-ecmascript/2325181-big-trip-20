import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class TripEventsModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor({pointsApiService}) {
    super ();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  #adaptToClient (point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateTo: point['date_to'],
      dateFrom: point['date_from'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  async init () {
    let pointsFromServer;
    try {
      pointsFromServer = await this.#pointsApiService.points;
    } catch (err) {
      pointsFromServer = [];
    } finally {
      this.#points.push(...pointsFromServer.map(this.#adaptToClient));
    }

    this._notify(UpdateType.INIT);

  }

  async updatePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points[index] = updatedPoint;
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint (updateType, update) {
    this.#points = this.points;
    this.#points.push(update);
    this._notify(updateType, update);
  }

  deletePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    this.#points.splice(index, 1);
    this._notify(updateType, update);
  }


}
