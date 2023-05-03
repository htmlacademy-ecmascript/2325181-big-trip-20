import {getRandomArrayElement, getRandomValue} from '../utils.js';
import {POINT_TYPES} from '../const.js';
// import { getDestinationId } from './destination.js';

const mockPoints = [
  {
    id: '1',
    basePrice: getRandomValue(5000),
    dateFrom: '2019-07-10T22:11:56.845Z',
    dateTo: '2019-07-10T23:11:13.375Z',
    destination: '3Gen',
    isFavorite: false,
    type: getRandomArrayElement(POINT_TYPES),
    offers: ['1', '2'],
  },
  {
    id: '2',
    basePrice: getRandomValue(5000),
    dateFrom: '2019-07-11T11:22:13.375Z',
    dateTo: '2019-07-11T12:22:25.375Z',
    destination: '1Ams',
    isFavorite: true,
    type: getRandomArrayElement(POINT_TYPES),
    offers: ['1'],
  },
  {
    id: '3',
    basePrice: getRandomValue(5000),
    dateFrom: '2019-07-12T11:33:25.375Z',
    dateTo: '2019-07-12T12:33:15.375Z',
    destination: '2Cham',
    isFavorite: false,
    type: getRandomArrayElement(POINT_TYPES),
    offers: ['2'],
  },
  {
    id: '4',
    basePrice: getRandomValue(5000),
    dateFrom: '2019-07-13T09:44:15.375Z',
    dateTo: '2019-07-13T10:44:13.375Z',
    destination: '3Gen',
    isFavorite: true,
    type: getRandomArrayElement(POINT_TYPES),
    offers: ['1'],
  },
];

function getRandomPoint () {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
