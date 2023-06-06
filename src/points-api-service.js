import ApiService from './framework/api-service.js';
import { HttpRequestMethod } from './const.js';

export default class PointsApiService extends ApiService {

  get points () {
    return this._load({url: 'big-trip/points'})
      .then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({url: 'big-trip/destinations'})
      .then(ApiService.parseResponse);
  }

  get offers () {
    return this._load({url: 'big-trip/offers'})
      .then(ApiService.parseResponse);
  }

  async updatePoint (point) {
    const response = await this._load({
      url: `big-trip/points/${point.id}`,
      method: HttpRequestMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer (point) {
    const adaptedPoint = { ...point,
      'base_price': point.basePrice,
      'date_to': point.dateTo,
      'date_from': point.dateFrom,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;

  }

}
