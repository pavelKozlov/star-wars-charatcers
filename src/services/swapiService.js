// import axios from 'axios';
import axios from '../mock-client/MockAxios.js';
import {API_ENDPOINT, API_PROTOCOL} from '../constants/appConstants.js';

const PROPS_TO_IGNORE = ['url'];
const cache = new Map();

const loadResource = async (resource) => {
  if (!cache.has(resource)) {
    cache.set(resource, axios.get(resource));
  }
  return cache.get(resource);
};

const resolveResource = async (resource) => {
  const { data } = await loadResource(resource);
  return data;
};

const parseItem = async (item) =>
  new Promise((resolve) => {
    let promisesCount = 0;

    const checkCompleteness = (completedCount) => {
      promisesCount -= completedCount;
      if (promisesCount === 0) {
        resolve(item);
      }
    };
    for (let [key, value] of Object.entries(item)) {
      if (PROPS_TO_IGNORE.includes(key)) {
        continue;
      }
      if (typeof value === 'string' && value.includes(API_ENDPOINT)) {
        promisesCount++;
        resolveResource(value)
          .then((result) => {
            item[key] = result;
            checkCompleteness(1);
          });
      } else if (Array.isArray(value) && value.length > 0 && value[0].includes(API_ENDPOINT)) {
        promisesCount += value.length;

        Promise.all(value.map((resource) => resolveResource(resource)))
          .then((result) => {
            item[key] = result;
            checkCompleteness(value.length);
          })
      }
    }
  });

const parseResources = async (data) =>
  Promise.all(data.map((item) => parseItem(item)));


/**
 * Get all available resources.
 *
 * @returns {Promise<void>}
 */
/* const getAvailableResources = async () => {
  const {data} = await axios.get(`${API_PROTOCOL}://${API_ENDPOINT}/`);
  console.log({data});
}; */

/**
 * Get people the list of people from the endpoint.
 *
 * @returns {Promise}
 */
const getPeople = async () => {
  const {data} = await axios.get(`${API_PROTOCOL}://${API_ENDPOINT}/people`);
  return parseResources(data.results);
};

export const swapiService = {
  getPeople,
};
