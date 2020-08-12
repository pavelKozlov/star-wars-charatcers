import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../state/reducers.js';

const getStore = (storeData = {}) => createStore(
  rootReducer,
  storeData,
  compose(applyMiddleware(thunk))
);

export {
  getStore,
}
