import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

import { PeopleOverview } from '../PeopleOverview.jsx';
import { Pagination } from '../../pagination/index.js';
import { PeopleList } from '../../peopleList/index.js';

describe('<PeopleOverview/>', () => {
  let selectPage;

  beforeEach(() => {
    selectPage = stub();
  });

  const getWrapper = (props = {}) => shallow(
    <PeopleOverview {...{
      totalPages: 10,
      selectedPage: 3,
      peopleItems: [],
      selectPage,
      ...props
    }}
    />
  );

  it('should render <PeopleOverview/> component', () => {
    const wrapper = getWrapper();
    expect(wrapper.hasClass('people-overview')).toBe(true);
  });

  it('should render <PeopleOverview/> component with <Pagination /> child', () => {
    const paginationProps = {
      totalPages: 8,
      selectedPage: 2,
      selectPage
    };
    const wrapper = getWrapper({
      ...paginationProps,
      peopleItems: [1, 2, 3],
    });
    expect(wrapper.exists(Pagination)).toBe(true);
    const paginationComponent = wrapper.find(Pagination).first();
    expect(paginationComponent.props()).toEqual(paginationProps);
  });

  it('should render <PeopleOverview/> component with <PeopleList /> child', () => {
    const items = [1, 2, 3, 4, 5];
    const wrapper = getWrapper({
      peopleItems: items,
    });
    expect(wrapper.exists(PeopleList)).toBe(true);
    const peopleListComponent = wrapper.find(PeopleList).first();
    expect(peopleListComponent.props()).toEqual({items});
  });
});
