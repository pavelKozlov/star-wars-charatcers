import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './pagination.scss';

/**
 * Pagination component that proved navigation across chunks of data/pages.
 *
 * @returns {*}
 * @constructor
 */
const Pagination = ({totalPages, selectedPage, selectPage}) => {
  const pages = new Array(totalPages).fill(0).map((_, index) => index + 1);

  return (
    <div className="pagination">
      <ul>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => selectPage(pageNumber)}
            className={classnames({
              'pagination__button': true,
              'pagination__button--selected': pageNumber === selectedPage,
            })}
          >
            {pageNumber}
          </button>
        ))}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  selectedPage: PropTypes.number,
  selectPage: PropTypes.func.isRequired,
};

export { Pagination };
