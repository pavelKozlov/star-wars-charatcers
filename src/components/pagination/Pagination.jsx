import React from 'react';
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
    <div>
      <ul>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => selectPage(pageNumber)}
            className={classnames({
              'pagination-button': true,
              'pagination-button--selected': pageNumber === selectedPage,
            })}
          >
            {pageNumber}
          </button>
        ))}
      </ul>
    </div>
  );
};

export { Pagination };
