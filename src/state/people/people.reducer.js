import { FETCH_PEOPLE_STARTED, FETCH_PEOPLE_SUCCEEDED, FETCH_PEOPLE_FAILED } from './people.actionConsts.js';
import { peopleUtils } from './people.utils.js';

const ITEMS_PER_PAGE = 10;

const initialState = {
  value: [],
  selectedPage: -1,
  totalPages: 0,
  isLoading: false,
  isError: false,
};

/**
 * People data reducer.
 *
 * @param state
 * @param action
 * @returns {*}
 */
const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case FETCH_PEOPLE_STARTED:
      newState = {
        ...state,
        isLoading: true,
        isError: false,
      };
      break;
    case FETCH_PEOPLE_SUCCEEDED:
      newState = {
        ...state,
        isLoading: false,
        selectedPage: action.payload.pageNumber,
        totalPages: Math.ceil(action.payload.total / ITEMS_PER_PAGE),
        value: peopleUtils.stripPeople(action.payload.results),
      };
      break;
    case FETCH_PEOPLE_FAILED:
      newState = {
        ...initialState,
        isError: true,
      };
      break;
    default:
  }
  return newState;
};

export { reducer };
