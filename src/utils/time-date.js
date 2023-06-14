import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DateFormat, TimeMeasures} from '../const.js';

dayjs.extend(duration);

function getDateTimeFormatted (dateTime, dateFormat) {
  return dateTime ? dayjs(dateTime).format(dateFormat) : '';
}

const getTimeInMinutes = (date) => Math.floor(new Date(date).getTime() / TimeMeasures.MILLISECONDS_IN_MINUTE) * TimeMeasures.MILLISECONDS_IN_MINUTE;

function getTimeDifference (dateTimeOne, dateTimeTwo, isFormat = 'true') {
  dateTimeOne = getTimeInMinutes(dateTimeOne);
  dateTimeTwo = getTimeInMinutes(dateTimeTwo);
  const timeDifference = dayjs(dateTimeOne).diff(dayjs(dateTimeTwo));
  if (isFormat === 'false') {
    return timeDifference;
  }
  if (timeDifference < TimeMeasures.MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format(DateFormat.DURATION_MINUTES);
  } else if (timeDifference < TimeMeasures.MILLISECONDS_IN_DAY) {
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
