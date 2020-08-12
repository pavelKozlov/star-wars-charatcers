import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from '../../state/people/people.actions.js';
import {PeopleOverview} from './PeopleOverview.jsx';

/**
 * Container component that connects redux to PeopleOverview component.
 *
 * @returns {*}
 * @constructor
 */
const PeopleOverviewContainer = () => {
  const peopleItems = useSelector((state) => state.people.value);

  const dispatch = useDispatch();
  const { totalPages, selectedPage } = useSelector((state) => state.people);
  const selectPage = (pageNumber) => dispatch(fetchPeople(pageNumber));

  return (
    <PeopleOverview {...{
      totalPages,
      selectedPage,
      selectPage,
      peopleItems,
    }}/>
  )
};

export {
  PeopleOverviewContainer,
}
