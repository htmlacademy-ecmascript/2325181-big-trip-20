import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import {DateFormat} from './const.js';

dayjs.extend(utc);
dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomValue(max) {
  return Math.floor(Math.random() * max);
}

function getDateTimeFormatted (dateTime, dateFormat) {
  return dateTime ? dayjs.utc(dateTime).format(dateFormat) : '';
}

function getTimeDifference (dateTimeOne, dateTimeTwo) {
  const timeDifference = dayjs(dateTimeOne).diff(dayjs(dateTimeTwo));
  if (timeDifference < 3600000) {
    return dayjs.duration(timeDifference).format(DateFormat.DURATION_MINUTES);
  } else if (timeDifference < 86400000) {
    return dayjs.duration(timeDifference).format(DateFormat.DURATION_HOURS);
  }
  return dayjs.duration(timeDifference).format(DateFormat.DURATION_DAYS);
}

export {getRandomArrayElement, getRandomValue, getDateTimeFormatted, getTimeDifference};
