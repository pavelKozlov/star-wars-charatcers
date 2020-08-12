import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPeople} from './state/people/people.actions.js';
import './App.scss';

import { PeopleList } from './components/peopleList/index.js';

const App = () => {
  const dispatch = useDispatch();

  const peopleItems = useSelector((state) => state.people.value);

  useEffect(() => {
    // componentDidMount
    dispatch(fetchPeople());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {/*<header className="App-header">
        <p>
          Factris Technical Assignment
        </p>
      </header>*/}
      <PeopleList items={peopleItems} />
    </div>
  );
};

export {App};
