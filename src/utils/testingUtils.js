import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../state/reducers.js';

/**
 * Creates and returns a redux store for tests.
 *
 * @param {Object} storeData - The data that should be set to store as initial data.
 *
 * @returns {Object} - The created redux store.
 */
const getStore = (storeData = {}) => createStore(
  rootReducer,
  storeData,
  compose(applyMiddleware(thunk))
);

export {
  getStore,
}
