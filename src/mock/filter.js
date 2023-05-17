import {Filter} from '../utils/filter.js';

function createFilter(points) {
  return Object.entries(Filter).map(
    ([filterType, filterpoints]) => ({
      type: filterType,
      hasPoints: filterpoints(points),
    }),
  );
}

export {createFilter};
