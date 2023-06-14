import Observable from '../framework/observable.js';
import { UpdateType, DownloadErrorMessage, ClientServerAdaptingFields } from '../const.js';

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
    const adaptedPoint = {
      ...point,
      basePrice: point[ClientServerAdaptingFields.BASE_PRICE],
      dateTo: point[ClientServerAdaptingFields.DATE_TO],
      dateFrom: point[ClientServerAdaptingFields.DATE_FROM],
      isFavorite: point[ClientServerAdaptingFields.IS_FAVORITE],
    };

    delete adaptedPoint[ClientServerAdaptingFields.BASE_PRICE];
    delete adaptedPoint[ClientServerAdaptingFields.DATE_TO];
    delete adaptedPoint[ClientServerAdaptingFields.DATE_FROM];
    delete adaptedPoint[ClientServerAdaptingFields.IS_FAVORITE];

    return adaptedPoint;
  }

  async init () {
    try {
      const pointsFromServer = await this.#pointsApiService.points;
      this.#points.push(...pointsFromServer.map(this.#adaptToClient));
    } catch (err) {
      throw new Error(DownloadErrorMessage.ERROR_POINTS);
    }
    this._notify(UpdateType.INIT, this.#points);
  }

  async updatePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error(DownloadErrorMessage.ERROR_NOT_EXISTING_UPDATE);
    }
    try {
      const response = await this.#pointsApiService.updatePoint(update);
      this.#points[index] = this.#adaptToClient(response);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error(DownloadErrorMessage.ERROR_UPDATE);
    }
  }

  async addPoint (updateType, update) {
    try {
      const newPoint = this.#adaptToClient(await this.#pointsApiService.addPoint(update));
      this.#points = this.points;
      this.#points.push(newPoint);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error (DownloadErrorMessage.ERROR_ADD);
    }
  }

  async deletePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points.splice(index, 1);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error (DownloadErrorMessage.ERROR_DELETE);
    }
  }


}
