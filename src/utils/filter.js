import {FilterType} from '../const.js';
import {isFuturePoint, isPastPoint, isPresentPoint} from './time-date.js';

const Filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point))
};

export {Filter};
