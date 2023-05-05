const PointTypes = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};


const TRIP_POINTS_COUNT = 3;

const DateFormat = {
  EVENT_START_END_DATE:'DD/MM/YY HH:mm',
  EVENT_START_END_TIME: 'HH:mm',
  START_DATE: 'YYYY[-]MM[-]DD',
  EVENT_DATE: 'MMM[ ]DD',
  DURATION_DAYS: 'DD[D ]HH[H ]mm[M]',
  DURATION_MINUTES: 'mm[M ]',
  DURATION_HOURS: 'HH[H ]mm[M ]',
};

export {PointTypes, TRIP_POINTS_COUNT, DateFormat};
