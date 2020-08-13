import {swapiService} from '../../services/swapiService.js';
import {
  FETCH_PEOPLE_STARTED,
  FETCH_PEOPLE_SUCCEEDED,
  FETCH_PEOPLE_FAILED,
} from './people.actionConsts.js';

/**
 * Action that fetches the people data from the service and populates the result into redux.
 *
 * @param {Number} [pageNumber] - The number of the page to fetch
 * @returns {function(*): Q.Promise<any> | Promise<void> | undefined}
 */
const fetchPeople = (pageNumber = 1) => async (dispatch) => {
  dispatch({type: FETCH_PEOPLE_STARTED});
  try {
    const data = await swapiService.getPeople(pageNumber);
    await dispatch({ type: FETCH_PEOPLE_SUCCEEDED, payload: {
      ...data,
      pageNumber,
    }});
  } catch (e) {
    dispatch({ type: FETCH_PEOPLE_FAILED });
  }
};

export { fetchPeople };
