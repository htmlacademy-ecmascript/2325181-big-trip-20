import dayjs from 'dayjs';
import {DATE_FORMAT} from './const.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomValue(max) {
  return Math.floor(Math.random() * max);
}

function getDateTimeFormatted (dateTime, format) {
  return dateTime ? dayjs(dateTime).format(DATE_FORMAT[format]) : '';
}

function getTimeDifference (dateTimeOne, DateTimeTwo) {
  return dayjs(dayjs(dateTimeOne).diff(DateTimeTwo)).format(DATE_FORMAT.durationFormat);
}

export {getRandomArrayElement, getRandomValue, getDateTimeFormatted, getTimeDifference};
