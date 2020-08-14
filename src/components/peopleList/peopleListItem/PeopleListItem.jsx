import React from 'react';
import PropTypes from 'prop-types';
import './peopleListItem.scss';

/**
 * The component that renders person item in the list.
 *
 * @param {String} name
 * @param {String} birthYear
 * @param {String} homeWorld
 * @param {String} species
 * @param {String} firstFilmTitle
 * @returns {*}
 * @constructor
 */
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

PeopleListItem.propTypes = {
    name: PropTypes.string,
    birthYear: PropTypes.string,
    homeWorld: PropTypes.string,
    species: PropTypes.string,
    firstFilmTitle: PropTypes.string,
};

export { PeopleListItem };
