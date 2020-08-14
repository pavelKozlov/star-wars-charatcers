import {stub} from 'sinon';
import { swapiService } from '../../../services/swapiService.js';
import {fetchPeople} from '../people.actions.js';
import {peopleUtils} from '../people.utils.js';
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

  describe('fetchPeople', () => {
    let getPeopleStub;
    let loadResourceStub;
    let parseResourcesStub;

    beforeEach(() => {
      getPeopleStub = stub(swapiService, 'getPeople');
      loadResourceStub = stub(swapiService, 'loadResource').callsFake((resource) => Promise.resolve(`resolved_${resource}`));
      parseResourcesStub = stub(peopleUtils, 'parseResources').callsFake((data) => Promise.resolve(data));
    });

    afterEach(() => {
      getPeopleStub.restore();
      loadResourceStub.restore();
      parseResourcesStub.restore();
    });

    it('should call swapiService.getPeople method with default parameter, then peopleUtils.parseResources with results items parameter and dispatch FETCH_PEOPLE_SUCCEEDED action when succeeded', async () => {
      const items = ITEMS.slice(1, 3);
      getPeopleStub.resolves({
        data: {
          results: items,
          count: 83
        }
      });
      await fetchPeople()(dispatchStub);

      expect(getPeopleStub.calledOnce).toBe(true);
      expect(getPeopleStub.getCall(0).args[0]).toEqual(1);
      expect(parseResourcesStub.calledOnce).toBe(true);
      expect(parseResourcesStub.getCall(0).args[0]).toEqual(items);
      expect(dispatchStub.calledTwice).toBe(true);
      expect(dispatchStub.getCall(0).args[0]).toEqual({type: FETCH_PEOPLE_STARTED});
      expect(dispatchStub.getCall(1).args[0]).toEqual({type: FETCH_PEOPLE_SUCCEEDED, payload: {
        results: items,
          total: 83,
          pageNumber: 1,
        }})
    });

    it('should call swapiService.getPeople method with page number parameter, then peopleUtils.parseResources with results items parameter and dispatch FETCH_PEOPLE_SUCCEEDED action when succeeded', async () => {
      const items = ITEMS.slice(0, 2);
      getPeopleStub.resolves({
        data: {
          results: items,
          count: 75
        }
      });
      await fetchPeople(4)(dispatchStub);

      expect(getPeopleStub.calledOnce).toBe(true);
      expect(getPeopleStub.getCall(0).args[0]).toEqual(4);
      expect(parseResourcesStub.calledOnce).toBe(true);
      expect(parseResourcesStub.getCall(0).args[0]).toEqual(items);
      expect(dispatchStub.calledTwice).toBe(true);
      expect(dispatchStub.getCall(0).args[0]).toEqual({type: FETCH_PEOPLE_STARTED});
      expect(dispatchStub.getCall(1).args[0]).toEqual({type: FETCH_PEOPLE_SUCCEEDED, payload: {
          results: items,
          total: 75,
          pageNumber: 4,
        }})
    });

    it('should call swapiService.getPeople method and dispatch FETCH_PEOPLE_FAILED action when api call failed', async () => {
      getPeopleStub.rejects();
      await fetchPeople()(dispatchStub);

      expect(getPeopleStub.calledOnce).toBe(true);
      expect(parseResourcesStub.notCalled).toBe(true);
      expect(dispatchStub.calledTwice).toBe(true);
      expect(dispatchStub.getCall(0).args[0]).toEqual({type: FETCH_PEOPLE_STARTED});
      expect(dispatchStub.getCall(1).args[0]).toEqual({type: FETCH_PEOPLE_FAILED})
    });

    it('should call swapiService.getPeople method and dispatch FETCH_PEOPLE_FAILED action when peopleUtils.parseResources call failed', async () => {
      getPeopleStub.resolves({
        data: {
          results: ITEMS,
          count: 61
        }
      });
      parseResourcesStub.rejects();

      await fetchPeople()(dispatchStub);

      expect(getPeopleStub.calledOnce).toBe(true);
      expect(parseResourcesStub.calledOnce).toBe(true);
      expect(dispatchStub.calledTwice).toBe(true);
      expect(dispatchStub.getCall(0).args[0]).toEqual({type: FETCH_PEOPLE_STARTED});
      expect(dispatchStub.getCall(1).args[0]).toEqual({type: FETCH_PEOPLE_FAILED})
    });
  });
});
