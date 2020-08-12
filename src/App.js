import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPeople} from './state/people/people.actions.js';
import './App.scss';

import {Spinner} from './components/spinner/index.js';
import { PeopleList } from './components/peopleList/index.js';

const App = () => {
  const dispatch = useDispatch();

  const peopleItems = useSelector((state) => state.people.value);
  const isLoading = useSelector((state) => state.people.isLoading);

  useEffect(() => {
    // componentDidMount
    dispatch(fetchPeople());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {
        isLoading ? <Spinner/> : <PeopleList items={peopleItems} />
      }
    </div>
  );
};

export {App};
