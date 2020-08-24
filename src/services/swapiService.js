import { fetcher } from './fetcher.js';
import { ENDPOINT_REGEXP } from '../constants/appConstants.js';
import { cache } from '../cache.js';

/**
 * Loads resource by url.
 * If input value doesn't have the same domain as api endpoint, then the promise rejects.
 *
 * @param {String} value - The resource url to load.
 * @returns {Promise}
 */
const loadResource = async (value) => {
  if (!ENDPOINT_REGEXP.test(value)) {
    return Promise.reject();
  }
  const nakedResource = value.replace(ENDPOINT_REGEXP, '');
  if (!cache.has(nakedResource)) {
    const resourcePromise = fetcher.get(nakedResource).then(({data}) => data);
    cache.set(nakedResource, resourcePromise);
  }
  return cache.get(nakedResource);
};

/**
 * Get people the list of people from the endpoint.
 *
 * @param {Number} pageNumber - The number of the page to fetch
 * @returns {Promise}
 */
const getPeople = async (pageNumber) =>
  fetcher.get(`people/?page=${pageNumber}`);

export const swapiService = {
  getPeople,
  loadResource,
};
