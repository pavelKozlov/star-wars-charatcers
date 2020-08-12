import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPeople} from './state/people/people.actions.js';
import './App.scss';

import {Spinner} from './components/spinner/index.js';
import { PeopleOverview } from './components/peopleOverview/index.js';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.people.isLoading);

  useEffect(() => {
    // componentDidMount
    dispatch(fetchPeople());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      {
        isLoading && (
          <div className="app__spinner-container">
            <Spinner/>
          </div>
        )
      }
      <PeopleOverview />
    </div>
  );
};

export {App};
