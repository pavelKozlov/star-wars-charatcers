import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { fetchPeople } from '../../state/people/people.actions.js';
import './pagination.scss';

const Pagination = () => {
  const dispatch = useDispatch();
  const { totalPages, selectedPage } = useSelector((state) => state.people);

  const pages = new Array(totalPages).fill(0).map((_, index) => index + 1);

  const onPageClick = (pageNumber) => dispatch(fetchPeople(pageNumber));

  return (
    <div>
      <ul>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageClick(pageNumber)}
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
