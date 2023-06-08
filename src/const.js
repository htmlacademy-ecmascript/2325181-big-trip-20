
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

const UserAction = {
  UPDATE_POINT: 'updatePoint',
  ADD_POINT: 'addPoint',
  DELETE_POINT: 'deletePoint'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const ListEmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  LOADING: 'Loading...',
};

const HttpRequestMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const AUTHORIZATION_TOKEN = 'Basic F5C4D99F86C940EC9D37447078319D92';

const END_POINT = 'https://20.ecmascript.pages.academy/big-trip/';

const HEADER = {'Content-Type': 'application/json'};

const UrlRoutes = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers'
};


const SaveDeleteStatus = {
  [UserAction.UPDATE_POINT]: 'isSaving',
  [UserAction.ADD_POINT]: 'isSaving',
  [UserAction.DELETE_POINT]: 'isDeleting'
};

const BlockTimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export {PointTypes, DateFormat, FilterType, EventAddButtonStatus, PointMode, SortOrder, PickerConfiguration, UserAction, UpdateType, ListEmptyMessage, HttpRequestMethod, AUTHORIZATION_TOKEN, END_POINT, SaveDeleteStatus, BlockTimeLimit, UrlRoutes, HEADER};
