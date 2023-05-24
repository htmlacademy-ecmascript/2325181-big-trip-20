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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
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
  INFO_DAY:'MMM DD'
};

const EventAddButtonStatus = {
  DISABLED: 'disabled',
  ENABLED: ''
};

const PointMode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT'
};

const SortOrder = {
  DEFAULT: 'default',
  DURATION_DOWN: 'duration-down',
  PRICE_DOWN: 'price-down'
};

const PickerConfiguration = {
  DATE_FORMAT: 'd/m/y H:i',
  START_DATE_PROPERTY: 'newStartDateTime',
  END_DATE_PROPERTY: 'newEndDateTime',
  START_DATE_ELEMENT_ID: 'event-start-time-1',
  END_DATE_ELEMENT_ID: 'event-end-time-1'
};

export {PointTypes, TRIP_POINTS_COUNT, DateFormat, FilterType, EventAddButtonStatus, PointMode, SortOrder, PickerConfiguration};
