import { FETCH_PEOPLE_STARTED, FETCH_PEOPLE_SUCCEEDED, FETCH_PEOPLE_FAILED } from './people.actionConsts.js';
import { stripPeople } from './people.utils.js';

const initialState = {
  value: [],
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
        value: [],
        isLoading: true,
        isError: false,
      };
      break;
    case FETCH_PEOPLE_SUCCEEDED:
      newState = {
        ...state,
        isLoading: false,
        value: stripPeople(action.payload),
      };
      break;
    case FETCH_PEOPLE_FAILED:
      newState = {
        ...state,
        value: [],
        isLoading: false,
        isError: true
      };
      break;
    default:
  }
  return newState;
};

export { reducer };
