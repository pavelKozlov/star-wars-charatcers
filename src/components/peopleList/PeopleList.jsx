import React from 'react';
import { PeopleListItem } from './peopleListItem/index.js';
import './peopleList.scss';
import { PeopleListHeader } from './peopleListHeader/PeopleListHeader.jsx';

const PeopleList = ({ items }) => (
  <div className="people-list">
    <PeopleListHeader />
    <div className="people-list__list-container">
      <ul className="people-list__list-content">
        {items.map((item) => (
          <PeopleListItem
            {...{
              key: item.name,
              ...item,
            }}
          />
        ))}
      </ul>
    </div>
  </div>
);

export { PeopleList };
