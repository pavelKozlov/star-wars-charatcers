import React from 'react';
import './spinner.scss';

/**
 * The compoennt that renders loading spinner.
 *
 * @returns {*}
 * @constructor
 */
const Spinner = () => (
  <div className="loader__container">
    <div className="loader__spinner">Loading...</div>
  </div>
);

export {
  Spinner,
}
