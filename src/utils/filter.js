import {FilterType} from '../const.js';
import {isFuturePoint, isPastPoint, isPresentPoint} from './time-date.js';

const Filter = {
  [FilterType.EVERYTHING]: (points) => points.some((point) => !!point),
  [FilterType.FUTURE]: (points) => points.some((point) => isFuturePoint(point)),
  [FilterType.PRESENT]: (points) => points.some((point) => isPresentPoint(point)),
  [FilterType.PAST]: (points) => points.some((point) => isPastPoint(point))
};

export {Filter};
