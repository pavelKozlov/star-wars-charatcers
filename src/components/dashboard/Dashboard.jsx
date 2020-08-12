import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../pagination/index.js';
import { PeopleList } from '../peopleList/index.js';
import { fetchPeople } from '../../state/people/people.actions.js';
import './dashboard.scss';

const Dashboard = () => {
  const peopleItems = useSelector((state) => state.people.value);

  const dispatch = useDispatch();
  const { totalPages, selectedPage } = useSelector((state) => state.people);
  const selectPage = (pageNumber) => dispatch(fetchPeople(pageNumber));

  return (
    <div className="dashboard">
      <Pagination {...{
        totalPages,
        selectedPage,
        selectPage,
      }}/>
      <PeopleList items={peopleItems} />
    </div>
  )
};

export {
  Dashboard,
}
