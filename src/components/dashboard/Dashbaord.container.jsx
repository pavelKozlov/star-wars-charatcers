import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from '../../state/people/people.actions.js';
import {Dashboard} from './Dashboard.jsx';

/**
 * Container component that connects Dashboard component with redux.
 *
 * @returns {*}
 * @constructor
 */
const DashboardContainer = () => {
  const peopleItems = useSelector((state) => state.people.value);

  const dispatch = useDispatch();
  const { totalPages, selectedPage } = useSelector((state) => state.people);
  const selectPage = (pageNumber) => dispatch(fetchPeople(pageNumber));

  return (
    <Dashboard {...{
      totalPages,
      selectedPage,
      selectPage,
      peopleItems,
    }}/>
  )
};

export {
  DashboardContainer,
}
