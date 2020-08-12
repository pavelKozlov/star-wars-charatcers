import { combineReducers } from 'redux';

import { reducer as people } from './people/people.reducer.js';

const rootReducer = combineReducers({
  people,
});

export { rootReducer };
