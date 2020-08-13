import {stub} from 'sinon';
import { swapiService } from '../../../services/swapiService.js';
import {fetchPeople} from '../people.actions.js';
import { FETCH_PEOPLE_STARTED, FETCH_PEOPLE_SUCCEEDED, FETCH_PEOPLE_FAILED } from '../people.actionConsts.js';

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

describe('people actions', () => {
  let dispatchStub;

  beforeEach(() => {
    dispatchStub = stub();
  });

  describe('fetchData', () => {
    let getPeopleStub;

    beforeEach(() => {
      getPeopleStub = stub(swapiService, 'getPeople');
    });

    afterEach(() => {
      getPeopleStub.restore();
    });

    it('should call swapiService.getPeople method with no parameters and dispatch FETCH_PEOPLE_SUCCEEDED action when succeeded', async () => {
      getPeopleStub.resolves({
        results: ITEMS,
        total: 83
      });
      await fetchPeople()(dispatchStub);

      expect(getPeopleStub.calledOnce).toBe(true);
      expect(getPeopleStub.getCall(0).args[0]).toEqual(1);
      expect(dispatchStub.calledTwice).toBe(true);
      expect(dispatchStub.getCall(0).args[0]).toEqual({type: FETCH_PEOPLE_STARTED});
      expect(dispatchStub.getCall(1).args[0]).toEqual({type: FETCH_PEOPLE_SUCCEEDED, payload: {
        results: ITEMS,
          total: 83,
          pageNumber: 1,
        }})
    });

    it('should call swapiService.getPeople method with page number parameters and dispatch FETCH_PEOPLE_SUCCEEDED action when succeeded', async () => {
      getPeopleStub.resolves({
        results: ITEMS,
        total: 75
      });
      await fetchPeople(4)(dispatchStub);

      expect(getPeopleStub.calledOnce).toBe(true);
      expect(getPeopleStub.getCall(0).args[0]).toEqual(4);
      expect(dispatchStub.calledTwice).toBe(true);
      expect(dispatchStub.getCall(0).args[0]).toEqual({type: FETCH_PEOPLE_STARTED});
      expect(dispatchStub.getCall(1).args[0]).toEqual({type: FETCH_PEOPLE_SUCCEEDED, payload: {
          results: ITEMS,
          total: 75,
          pageNumber: 4,
        }})
    });

    it('should call swapiService.getPeople method and dispatch FETCH_PEOPLE_FAILED action when failed', async () => {
      getPeopleStub.rejects();
      await fetchPeople()(dispatchStub);

      expect(getPeopleStub.calledOnce).toBe(true);
      expect(dispatchStub.calledTwice).toBe(true);
      expect(dispatchStub.getCall(0).args[0]).toEqual({type: FETCH_PEOPLE_STARTED});
      expect(dispatchStub.getCall(1).args[0]).toEqual({type: FETCH_PEOPLE_FAILED})
    });
  });
});
