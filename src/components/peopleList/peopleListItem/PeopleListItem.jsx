import React from 'react';
import './peopleListItem.scss';

const PeopleListItem = ({ name, birthYear, homeWorld, species, firstFilmTitle }) => (
  <li className="people-list-row">
    <div className="people-list-row__column people-list-row__column-name">
      {name}
    </div>
    <div className="people-list-row__column people-list-row__column-birth-year">
      {birthYear}
    </div>
    <div className="people-list-row__column people-list-row__column-home-world">
      {homeWorld}
    </div>
    <div className="people-list-row__column people-list-row__column-species">
      {species}
    </div>
    <div className="people-list-row__column people-list-row__column-film-title">
      {firstFilmTitle}
    </div>
  </li>
);

export { PeopleListItem };
