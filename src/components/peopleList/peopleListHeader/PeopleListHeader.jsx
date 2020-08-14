import React from 'react';
import './peopleListHeader.scss';
import '../peopleListItem/peopleListItem.scss';

/**
 * The component that render a header for people list with column names.
 *
 * @returns {*}
 * @constructor
 */
const PeopleListHeader = () => (
  <div className="people-list-header people-list-row">
    <div className="people-list-row__column people-list-row__column-name">
      Name
    </div>
    <div className="people-list-row__column people-list-row__column-birth-year">
      Birth year
    </div>
    <div className="people-list-row__column people-list-row__column-home-world">
      Home world
    </div>
    <div className="people-list-row__column people-list-row__column-species">
      Species
    </div>
    <div className="people-list-row__column people-list-row__column-film-title">
      First film title
    </div>
  </div>
);

export { PeopleListHeader };
