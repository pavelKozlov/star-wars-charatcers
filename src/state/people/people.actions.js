import {swapiService} from '../../services/swapiService.js';
import {
  FETCH_PEOPLE_STARTED,
  FETCH_PEOPLE_SUCCEEDED,
  FETCH_PEOPLE_FAILED,
} from './people.actionConsts.js';

/**
 * Action that fetches the people data from the service and populates the result into redux.
 *
 * @returns {function(*): Q.Promise<any> | Promise<void> | undefined}
 */
const fetchPeople = () => async (dispatch) => {
  dispatch({type: FETCH_PEOPLE_STARTED});
  try {
    const data = await swapiService.getPeople();
    await dispatch({ type: FETCH_PEOPLE_SUCCEEDED, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: FETCH_PEOPLE_FAILED });
  }
};

export { fetchPeople };
