import { API_ENDPOINT, API_PROTOCOL } from '../../constants/appConstants.js';

// The list of props that should not be resolved.
const PROPS_TO_IGNORE = ['url'];

const ENDPOINT_REGEXP = new RegExp(`^http(s)?:\\/\\/${API_ENDPOINT}/`);

/**
 * Convert person object to the shape used in application.
 *
 * @param {String} name - The person name.
 * @param {String} birth_year - The person's birth date.
 * @param {Object} homeworld
 * @param {String} homeworld.name - The home world name.
 * @param {Array} species
 * @param {Object} species[0]
 * @param {String} species[0].name - The species name.
 * @param {Array} films
 * @param {Object} films[0]
 * @param {String} films[0].name - The film title.
 * @returns {{birthYear: String, species: String, name: String, firstFilmTitle: String, homeWorld: String}}
 */
const stripPerson = ({name, birth_year, homeworld, species, films}) => ({
  name,
  birthYear: birth_year,
  homeWorld: homeworld.name,
  species: species.length > 0 ? species[0].name : '',
  firstFilmTitle: films.length > 0 ? films[0].title : ''
});

/**
 * Convert all objects in array to the shape used in application.
 *
 * @param {Array} data - The array of items to strip.
 * @returns {Array} - The array of stripped items.
 */
const stripPeople = (data) =>
  data.map((item) => stripPerson(item));

/**
 * Check if the value starts from the endpoint, thus is a resource that should be resolved.
 *
 * @param {String} value - The value to check.
 * @returns {Boolean} - true if the value matches resource pattern or false otherwise.
 */
const isResource = (value) =>
  ENDPOINT_REGEXP.test(value);

/**
 * Parse and Resolve 1-st level resources in the object.
 * By resources, considering the value that contains a url to api endpoint.
 * The rest of the field are not changing.
 *
 * @param {Object} item - The object to parse and resolve.
 * @param {Function} resolveResource - The function that is called to load resource by url.
 * @returns {Promise}
 */
const parseItem = async (item, resolveResource) =>
  new Promise((resolve, reject) => {
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
      if (typeof value === 'string' && isResource(value)) {
        promisesCount++;
        resolveResource(value)
          .then((result) => {
            item[key] = result;
            checkCompleteness(1);
          })
          .catch((e) => reject(e));
      } else if (Array.isArray(value) && value.length > 0 && isResource(value[0])) {
        promisesCount += value.length;

        Promise.all(value.map((resource) => resolveResource(resource)))
          .then((result) => {
            item[key] = result;
            checkCompleteness(value.length);
          })
          .catch((e) => reject(e));
      }
    }
  });

/**
 * Parse and Resolve 1-st level resources for every object item in the array.
 *
 * @param {Array} data - The list of object items to resolve.
 * @param {Function} resolveResource - The function that is called to load resource by url.
 * @returns {Promise}
 */
const parseResources = async (data, resolveResource) =>
  Promise.all(data.map((item) => parseItem(item, resolveResource)));

export const peopleUtils = {
  stripPeople,
  parseResources,
};
