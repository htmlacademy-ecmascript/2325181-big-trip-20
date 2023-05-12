import {filter} from '../utils/filter.js';

function createFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterpoints]) => ({
      type: filterType,
      hasPoints: filterpoints(points),
    }),
  );
}

export {createFilter};
