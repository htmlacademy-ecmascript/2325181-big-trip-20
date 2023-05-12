import {getRandomArrayElement, getRandomValue} from '../utils/common.js';
import {PointTypes} from '../const.js';
// import { getDestinationId } from './destination.js';

const mockPoints = [
  {
    id: '1',
    basePrice: getRandomValue(5000),
    dateFrom: '2023-07-07T22:11:56.845Z',
    dateTo: '2023-07-07T23:12:56.375Z',
    destination: '3Gen',
    isFavorite: false,
    type: getRandomArrayElement(Object.values(PointTypes)),
    offers: ['1','2'],
  },
  {
    id: '2',
    basePrice: getRandomValue(5000),
    dateFrom: '2023-05-11T11:22:13.375Z',
    dateTo: '2023-05-13T12:23:14.375Z',
    destination: '1Ams',
    isFavorite: true,
    type: getRandomArrayElement(Object.values(PointTypes)),
    offers: ['1'],
  },
  {
    id: '3',
    basePrice: getRandomValue(5000),
    dateFrom: '2023-04-04T06:33:25.375Z',
    dateTo: '2023-04-04T12:34:26.375Z',
    destination: '2Cham',
    isFavorite: false,
    type: getRandomArrayElement(Object.values(PointTypes)),
    offers: ['2'],
  },
  {
    id: '4',
    basePrice: getRandomValue(5000),
    dateFrom: '2023-06-06T09:44:15.375Z',
    dateTo: '2023-06-06T10:45:16.375Z',
    destination: '3Gen',
    isFavorite: true,
    type: getRandomArrayElement(Object.values(PointTypes)),
    offers: ['1'],
  },
];

function getRandomPoint () {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
