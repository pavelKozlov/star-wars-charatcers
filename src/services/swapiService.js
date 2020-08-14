import { fetcher } from './fetcher.js';
import {API_ENDPOINT} from '../constants/appConstants.js';

// const cache = new Map();

const loadResource = async (resource) => {
  const regexp = new RegExp(`^http(s)?://${API_ENDPOINT}/`);
  if (!regexp.test(resource)) {
    return Promise.reject();
  }
  const nakedResource = resource.replace(regexp, '');
  return fetcher.get(nakedResource)
    .then(({data}) => data);
  // TODO: use caching
  /* if (!cache.has(nakedResource)) {
    cache.set(nakedResource, fetcher.get(nakedResource));
  }
  return cache.get(nakedResource); */
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
