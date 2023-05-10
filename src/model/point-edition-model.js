import { getRandomPoint } from '../mock/point.js';

export default class PointEditionModel {
  #editionPoint = getRandomPoint();
  get editionPoint() {
    return this.#editionPoint;
  }
}
