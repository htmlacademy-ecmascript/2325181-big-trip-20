import { getRandomPoint } from '../mock/point.js';

export default class PointEditionModel {
  editionPoint = getRandomPoint();
  getPointEdition() {
    return this.editionPoint;
  }
}
