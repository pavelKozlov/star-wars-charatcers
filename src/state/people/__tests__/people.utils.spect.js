import { stub } from 'sinon';
import {peopleUtils} from '../people.utils.js';
import { API_ENDPOINT } from '../../../constants/appConstants.js';

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

  describe('parseResources', () => {
    let resolveResourceStub;

    const resolveImpl = (resource) => `resolved_${resource}`;

    beforeEach(() => {
      resolveResourceStub = stub().callsFake((resource) =>
        new Promise((resolve) => resolve(resolveImpl(resource)))
      );
    });

    it('should resolve all first-level string and array resources ignoring url prop that match api endpoint', async () => {
      const DATA = [{
        testProp1: 'test 1',
        testProp2: `https://${API_ENDPOINT}/param/2`,
        testProp3: [
          'test 3-1',
          'test 3-2',
          'test 3-3'
        ],
        url: `https://${API_ENDPOINT}/param/url-1`,
        testProp4: [
          `https://${API_ENDPOINT}/param/4-1`,
          `https://${API_ENDPOINT}/param/4-2`,
        ]
      }, {
        testProp1: `https://${API_ENDPOINT}/param/2_1`,
        testProp2: 'test 2_2',
        url: 'some-url',
        testProp3: [
          `https://${API_ENDPOINT}/param/2_3-1`,
          `https://${API_ENDPOINT}/param/2_3-2`,
          `https://${API_ENDPOINT}/param/2_3-3`,
        ],
        testProp4: [
          'test 2_4-1',
          'test 2_4-2'
        ]
      }];

      const expectedData = [{
        ...DATA[0],
        testProp2: resolveImpl(DATA[0].testProp2),
        testProp4: DATA[0].testProp4.map(resolveImpl)
      }, {
        ...DATA[1],
        testProp1: resolveImpl(DATA[1].testProp1),
        testProp3: DATA[1].testProp3.map(resolveImpl)
      }];

      expect(await peopleUtils.parseResources(DATA, resolveResourceStub)).toEqual(expectedData);
      expect(resolveResourceStub.callCount).toBe(7);
    });

    it('should resolve with empty array if empty array is passed to the method', async () => {
      expect(await peopleUtils.parseResources([], resolveResourceStub)).toEqual([]);
    });

    it('should reject if resolveResource rejects', async (done) => {
      const newResolveResourceStub = stub().callsFake(() => Promise.reject());

      try {
        await peopleUtils.parseResources([{testProp1: `https://${API_ENDPOINT}/param/1`}], newResolveResourceStub);
      } catch (e) {
        done();
        return;
      }
      throw new Error('should reject promise if resolveResource rejects but didnt')
    });
  });
});
