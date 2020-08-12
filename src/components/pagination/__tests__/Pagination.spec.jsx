import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

import {Pagination} from '../Pagination.jsx';

describe('<Pagination/>', () => {
  let selectPage;

  beforeEach(() => {
    selectPage = stub();
  });

  const getWrapper = (props = {totalPages: 10, selectedPage: 3}) => shallow(
    <Pagination {...{
      selectPage,
      ...props
    }}
    />
  );

  it('should render <Pagination/> component', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.pagination__button').length).toBe(10);
  });

  it('should render <Pagination/> component with selected page', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.pagination__button.pagination__button--selected').length).toBe(1);
    expect(wrapper.find('.pagination__button').get(2).props.className.includes('pagination__button--selected'));
  });

  it('should render <Pagination/> component with no selected page if selectedPage parameter == -1', () => {
    const wrapper = getWrapper({totalPages: 10, selectedPage: -1});
    expect(wrapper.find('.pagination__button.pagination__button--selected').length).toBe(0);
  });

  it('should call selectPage callback with page number parameter when non-selected page button clicked', () => {
    const button = getWrapper().find('.pagination__button');
    button.first().simulate('click');

    expect(selectPage.calledOnce).toBe(true);
    expect(selectPage.getCall(0).args[0]).toEqual(1);
  });
});
