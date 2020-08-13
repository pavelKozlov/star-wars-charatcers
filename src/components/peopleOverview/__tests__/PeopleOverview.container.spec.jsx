import React from 'react';
import { mount } from 'enzyme';
import {spy} from 'sinon';
import { Provider } from 'react-redux';
import { getStore } from '../../../utils/testingUtils.js';
import { PeopleList } from '../../peopleList/index.js';
import { Pagination} from '../../pagination/index.js';

import {swapiService} from '../../../services/swapiService.js';

import {PeopleOverviewContainer} from '../PeopleOverview.container.jsx';

describe('<PeopleOverview /> container component', () => {
  const getWrapper = ({selectedPage = 2, value = [], totalPages = 11}) => {
    const mockStore = getStore({
      people: {
        value,
        selectedPage,
        totalPages,
      }
    });
    return mount(
      <Provider store={mockStore}>
        <PeopleOverviewContainer/>
      </Provider>
    );
  };

  it('should pass people.value redux property to <PeopleList /> component', () => {
    const listItems = [{name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}];
    const wrapper = getWrapper({
      value: listItems
    });
    expect(wrapper.find(PeopleList).props()).toEqual({items: listItems});
  });

  it('should pass people.selectedPage and people.totalPages redux properties to <Pagination /> component', () => {
    const wrapper = getWrapper({
      selectedPage: 5,
      totalPages: 8,
    });
    expect(wrapper.find(Pagination).prop('totalPages')).toBe(8);
    expect(wrapper.find(Pagination).prop('selectedPage')).toBe(5);
  });

  it('should call swapiService.getPeople method eventually when clicked on button in <Pagination /> component', () => {
    const serviceSpy = spy(swapiService, 'getPeople');
    const wrapper = getWrapper({
      selectedPage: 5,
      totalPages: 8,
    });
    const button = wrapper.find(Pagination).find('.pagination__button');
    button.first().simulate('click');
    expect(serviceSpy.calledOnce).toBe(true);
    expect(serviceSpy.getCall(0).args[0]).toBe(1);
    serviceSpy.restore();
  });
});
