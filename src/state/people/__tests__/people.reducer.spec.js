import {reducer } from '../people.reducer.js';
import { FETCH_PEOPLE_STARTED, FETCH_PEOPLE_SUCCEEDED, FETCH_PEOPLE_FAILED } from '../people.actionConsts.js';
import { peopleUtils } from '../people.utils.js';

const ITEMS = [
  {
    name: 'Some name 1',
    birth_year: 'some year 1',
    homeworld: {
      name: 'homeworld name 1'
    },
    species: {
      name: 'species name 1'
    },
    films: [{
      title: 'films title 1'
    }]
  }, {
    name: 'Some name 2',
    birth_year: 'some year 2',
    homeworld: {
      name: 'homeworld name 2'
    },
    species: [{
      name: 'species name 2'
    }],
    films: []
  }, {
    name: 'Some name 3',
    birth_year: 'some year 3',
    homeworld: {
      name: 'homeworld name 3'
    },
    species: [],
    films: [{
      title: 'films title 3'
    }]
  },
];

const STATE_DATA = {
  value: ITEMS,
  selectedPage: 3,
  totalPages: 5,
  isLoading: false,
  isError: false,
};

describe('people reducer', () => {
  it('should set isLoading to true for FETCH_PEOPLE_STARTED action type', () => {
    const result = reducer({
      ...STATE_DATA,
      isError: true,
    }, {type: FETCH_PEOPLE_STARTED});
    expect(result).toEqual({
      ...STATE_DATA,
      isLoading: true,
      isError: false,
    });
  });

  it('should set new state for FETCH_PEOPLE_SUCCEEDED action type with total and results in a payload', () => {
    const results = [
      {
        name: 'Some name 5',
        birth_year: 'some year 5',
        homeworld: {
          name: 'homeworld name 5'
        },
        species: {
          name: 'species name 5'
        },
        films: [{
          title: 'films title 5'
        }]
      }, {
        name: 'Some name 6',
        birth_year: 'some year 6',
        homeworld: {
          name: 'homeworld name 6'
        },
        species: [{
          name: 'species name 6'
        }],
        films: []
      }, {
        name: 'Some name 7',
        birth_year: 'some year 7',
        homeworld: {
          name: 'homeworld name 7'
        },
        species: [],
        films: [{
          title: 'films title 7'
        }]
      },
    ];
    const result = reducer({
      ...STATE_DATA,
      isLoading: true,
    }, {type: FETCH_PEOPLE_SUCCEEDED, payload: {
        total: 78,
        results,
        pageNumber: 4,
      }});
    expect(result).toEqual({
      ...STATE_DATA,
      isLoading: false,
      totalPages: 8,
      selectedPage: 4,
      value: peopleUtils.stripPeople(results)
    })
  });

  it('should set isError to true and reset state for FETCH_PEOPLE_FAILED action type', () => {
    const result = reducer({
      ...STATE_DATA,
      isLoading: true
    }, {type: FETCH_PEOPLE_FAILED});
    expect(result).toEqual({
      value: [],
      selectedPage: -1,
      totalPages: 0,
      isLoading: false,
      isError: true,
    })
  });
});
