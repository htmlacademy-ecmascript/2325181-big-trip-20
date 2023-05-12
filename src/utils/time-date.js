import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import {DateFormat} from '../const.js';

dayjs.extend(utc);
dayjs.extend(duration);

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

function isFuturePoint (point) {
  return dayjs().isBefore(dayjs(point.dateFrom));
}

function isPresentPoint (point) {
  return dayjs().isAfter(dayjs(point.dateFrom)) && dayjs().isBefore(dayjs(point.dateTo));
}

function isPastPoint (point) {
  return dayjs().isAfter(dayjs(point.dateTo));
}

export {getDateTimeFormatted, getTimeDifference, isFuturePoint, isPastPoint, isPresentPoint};
