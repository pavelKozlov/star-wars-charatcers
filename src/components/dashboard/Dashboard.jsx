import React from 'react';
import { Pagination } from '../pagination/index.js';
import { PeopleList } from '../peopleList/index.js';
import './dashboard.scss';

/**
 * Component that combines pagination and people list.
 *
 * @returns {*}
 * @constructor
 */
const Dashboard = ({ totalPages, selectedPage, selectPage, peopleItems}) => (
  <div className="dashboard">
    <Pagination {...{
      totalPages,
      selectedPage,
      selectPage,
    }}/>
    <PeopleList items={peopleItems} />
  </div>
);

export {
  Dashboard,
}
