import { SortOrder } from '../const';
import { getTimeDifference } from './time-date';

const Sort = {
  [SortOrder.DEFAULT]: (pointOne, pointTwo) => Date.parse(pointOne.dateFrom) - Date.parse(pointTwo.dateFrom),
  [SortOrder.DURATION_DOWN]: (pointOne, pointTwo) => getTimeDifference(pointTwo.dateTo, pointTwo.dateFrom, false) - getTimeDifference (pointOne.dateTo, pointOne.dateFrom, false),
  [SortOrder.PRICE_DOWN]: (pointOne, pointTwo) => pointTwo.basePrice - pointOne.basePrice
};

export {Sort};
