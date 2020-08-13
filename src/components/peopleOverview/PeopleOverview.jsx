import React from 'react';
import { Pagination } from '../pagination/index.js';
import { PeopleList } from '../peopleList/index.js';
import './peopleOverview.scss';

/**
 * Component that combines pagination and people list.
 *
 * @returns {*}
 * @constructor
 */
const PeopleOverview = ({ totalPages, selectedPage, selectPage, peopleItems }) => (
  <div className="people-overview">
    <Pagination {...{
      totalPages,
      selectedPage,
      selectPage,
    }}/>
    <PeopleList items={peopleItems} />
  </div>
);

PeopleOverview.propTypes = {
  ...Pagination.propTypes,
  peopleItems: PeopleList.propTypes.items,
};

export {
  PeopleOverview,
}
