import {peopleUtils} from '../people.utils.js';

const PEOPLE = [{
  name: 'test name',
  extraProp1: 'should be stripped 1',
  birth_year: 'test birth year',
  homeworld: {
    name: 'test home world name'
  },
  extraProp2: 'should be stripped 2',
  species: [{
    name: 'test species name 1'
  }, {
    name: 'test species name 2'
  }],
  extraProp3: [{
    name: 'test 11'
  }],
  films: [{
    title: 'test film title 1'
  }, {
    title: 'test film title 2'
  }]
}, {
  name: '1 test name',
  extraProp1: '1 should be stripped 1',
  birth_year: '1 test birth year',
  homeworld: {
    name: '1 test home world name'
  },
  extraProp2: '1 should be stripped 2',
  species: [{
    name: '1 test species name 1'
  }, {
    name: '1 test species name 2'
  }],
  extraProp3: [{
    name: '1 test 11'
  }],
  films: [{
    title: '1 test film title 1'
  }, {
    title: '1 test film title 2'
  }]
}];

const EXPECTED_PEOPLE = [{
  name: PEOPLE[0].name,
  birthYear: PEOPLE[0].birth_year,
  homeWorld: PEOPLE[0].homeworld.name,
  species: PEOPLE[0].species[0].name,
  firstFilmTitle: PEOPLE[0].films[0].title,
}, {
  name: PEOPLE[1].name,
  birthYear: PEOPLE[1].birth_year,
  homeWorld: PEOPLE[1].homeworld.name,
  species: PEOPLE[1].species[0].name,
  firstFilmTitle: PEOPLE[1].films[0].title,
}];

describe('peopleUtils', () => {
  describe('stripPeople', () => {
    it('should return object with limited number of props', () => {
      const results = peopleUtils.stripPeople(PEOPLE);
      expect(results).toEqual(EXPECTED_PEOPLE);
    });

    it('should handle when species is empty array', () => {
      const OTHER_PEOPLE = PEOPLE.map((person) => ({...person}));
      OTHER_PEOPLE[0].species = [];
      const results = peopleUtils.stripPeople(OTHER_PEOPLE);

      const expectedResult = EXPECTED_PEOPLE.map((person) => ({...person}));
      expectedResult[0].species = '';
      expect(results).toEqual(expectedResult);
    });

    it('should handle when films is empty array', () => {
      const OTHER_PEOPLE = PEOPLE.map((person) => ({...person}));
      OTHER_PEOPLE[1].films = [];
      const results = peopleUtils.stripPeople(OTHER_PEOPLE);

      const expectedResult = EXPECTED_PEOPLE.map((person) => ({...person}));
      expectedResult[1].firstFilmTitle = '';
      expect(results).toEqual(expectedResult);
    });
  });
});
