import ApiService from './framework/api-service.js';
import { HttpRequestMethod, UrlRoutes, HEADER } from './const.js';



export default class PointsApiService extends ApiService {

  get points () {
    return this._load({url: UrlRoutes.POINTS})
      .then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({url: UrlRoutes.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers () {
    return this._load({url: UrlRoutes.OFFERS})
      .then(ApiService.parseResponse);
  }

  async updatePoint (point) {
    const response = await this._load({
      url: `${UrlRoutes.POINTS}/${point.id}`,
      method: HttpRequestMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers(HEADER),
    });

    return await ApiService.parseResponse(response);
  }

  async addPoint (point) {
    const response = await this._load({
      url: UrlRoutes.POINTS,
      method: HttpRequestMethod.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers(HEADER),
    });

    return await ApiService.parseResponse(response);
  }

  async deletePoint (point) {
    return await this._load({
      url: `${UrlRoutes.POINTS}/${point.id}`,
      method: HttpRequestMethod.DELETE,
    });
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
