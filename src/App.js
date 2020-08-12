import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchPeople} from './state/people/people.actions.js';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // componentDidMount
    dispatch(fetchPeople());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Factris Technical Assignment
        </p>
      </header>
    </div>
  );
}

export {App};
